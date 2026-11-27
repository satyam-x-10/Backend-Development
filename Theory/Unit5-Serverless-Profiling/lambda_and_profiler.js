// Unit 5: Serverless Function (AWS Lambda Pattern) and Performance Profiling
// Covers Lectures L55 and L58

const { performance } = require('perf_hooks');

let isWarm = false;
let invocations = 0;

// 1. AWS Lambda-compatible FaaS Event Handler
exports.handler = async (event, context = {}) => {
  const start = performance.now();
  const coldStart = !isWarm;
  isWarm = true;
  invocations += 1;

  const action = event.action || 'process-order';
  const payload = event.payload || {};

  // Simulate initialization penalty only on cold starts
  if (coldStart) {
    await new Promise((r) => setTimeout(r, 120));
  }

  return {
    statusCode: 200,
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      requestId: context.awsRequestId || `req-${Date.now()}`,
      coldStart,
      invocations,
      action,
      processedData: payload,
      durationMs: Number((performance.now() - start).toFixed(3))
    })
  };
};

// 2. Performance Profiling Comparison: O(n^2) Linear Search vs O(n) Map Lookup
function runBenchmark(size = 8000) {
  const dataset = Array.from({ length: size }, (_, i) => ({ id: i, score: (i * 7) % 100 }));
  const queries = Array.from({ length: 1500 }, (_, i) => (i * 5) % size);

  const t1 = performance.now();
  let sumSlow = 0;
  for (const q of queries) {
    const match = dataset.find((item) => item.id === q);
    if (match) sumSlow += match.score;
  }
  const slowMs = Number((performance.now() - t1).toFixed(3));

  const t2 = performance.now();
  const indexMap = new Map(dataset.map((item) => [item.id, item.score]));
  let sumFast = 0;
  for (const q of queries) {
    sumFast += indexMap.get(q) || 0;
  }
  const fastMs = Number((performance.now() - t2).toFixed(3));

  const mem = process.memoryUsage();
  return {
    datasetSize: size,
    queryCount: queries.length,
    nestedFindMs: slowMs,
    mapLookupMs: fastMs,
    speedupFactor: Number((slowMs / Math.max(fastMs, 0.001)).toFixed(1)),
    heapUsedMB: Number((mem.heapUsed / 1024 / 1024).toFixed(2)),
    checksumMatch: sumSlow === sumFast
  };
}

if (require.main === module) {
  (async () => {
    console.log('--- Invocation 1 (Cold Start) ---');
    console.log(await exports.handler({ action: 'resize-image', payload: { file: 'avatar.png' } }));
    console.log('--- Invocation 2 (Warm Start) ---');
    console.log(await exports.handler({ action: 'resize-image', payload: { file: 'banner.png' } }));
    console.log('--- Performance Profiler Output ---');
    console.log(runBenchmark());
  })();
}
