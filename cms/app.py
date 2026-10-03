from flask import Flask, render_template, request, redirect
from pymongo import MongoClient
from bson.objectid import ObjectId
from datetime import datetime

app = Flask(__name__)

# Try connecting to MongoDB
use_mongo = False
try:
    client = MongoClient('mongodb://127.0.0.1:27017/', serverSelectionTimeoutMS=2000)
    # Check connection
    client.admin.command('ping')
    db = client['cms_lab']
    posts_collection = db['posts']
    use_mongo = True
    print("✅ Connected to local MongoDB successfully!")
except Exception as e:
    print("⚠️ Local MongoDB is not running! Falling back to in-memory storage so the app works without crashing.")
    print("💡 To use MongoDB, open CMD as Administrator and run: net start MongoDB")

# In-memory storage fallback if MongoDB is not running
memory_posts = []

# 1. Display All Posts (Home)
@app.route('/')
@app.route('/posts')
def get_posts():
    if use_mongo:
        posts = list(posts_collection.find({}, {'title': 1, 'author': 1, 'createdAt': 1}))
    else:
        # Send posts without content field for list view
        posts = [{'_id': p['_id'], 'title': p['title'], 'author': p['author'], 'createdAt': p['createdAt']} for p in memory_posts]
    return render_template('posts.html', posts=posts)

# 2. Display Create Post Form
@app.route('/posts/new')
def new_post():
    return render_template('new-post.html')

# 3. Handle Create Post Form Submission
@app.route('/posts', methods=['POST'])
def create_post():
    title = request.form.get('title')
    author = request.form.get('author')
    content = request.form.get('content')

    if title and author and content:
        date_str = datetime.now().strftime('%d %B %Y')
        if use_mongo:
            posts_collection.insert_one({
                'title': title,
                'author': author,
                'content': content,
                'createdAt': date_str
            })
        else:
            memory_posts.append({
                '_id': str(len(memory_posts) + 1),
                'title': title,
                'author': author,
                'content': content,
                'createdAt': date_str
            })
    
    return redirect('/posts')

# 4. View Individual Post by ID
@app.route('/posts/<id>')
def get_post(id):
    if use_mongo:
        try:
            post = posts_collection.find_one({'_id': ObjectId(id)})
        except:
            post = posts_collection.find_one({'_id': id})
    else:
        post = next((p for p in memory_posts if str(p['_id']) == str(id)), None)

    return render_template('post.html', post=post)

if __name__ == '__main__':
    app.run(debug=True)