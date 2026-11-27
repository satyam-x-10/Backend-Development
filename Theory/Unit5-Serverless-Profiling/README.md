# Unit 5: Serverless Architecture and Performance Profiling

This module implements Unit 5 serverless and optimization topics (Lectures L55 and L58), combining an AWS Lambda-compatible FaaS event handler with a Node.js `perf_hooks` benchmark comparing linear lookups against indexed hash maps.

- [Open Live FaaS & Profiler Demo](demo.html)
- [View Source Code on Webpage](demo.html#source)
- [Back to Theory Index](../)

---

## Key Highlights

1. **Cold vs Warm Container Reuse:** Measures the runtime initialization delay incurred during the first serverless invocation compared to subsequent warm calls.
2. **Algorithmic Profiling:** Quantifies CPU time and memory overhead when replacing nested `Array.find` scans with O(1) `Map` lookups.

---

## Running Locally

```bash
cd Theory/Unit5-Serverless-Profiling
node lambda_and_profiler.js
```
