import json
import os
import uuid
from datetime import datetime

from flask import Flask, render_template, request, redirect

app = Flask(__name__)

# Data directory — overridden by DATA_DIR env var when running in Docker
DATA_DIR = os.environ.get('DATA_DIR', os.path.join(os.path.dirname(__file__), 'data'))
POSTS_FILE = os.path.join(DATA_DIR, 'posts.json')

# Try connecting to MongoDB; fall back to JSON file storage if unavailable
use_mongo = False
try:
    from pymongo import MongoClient
    from bson.objectid import ObjectId
    client = MongoClient('mongodb://127.0.0.1:27017/', serverSelectionTimeoutMS=2000)
    client.admin.command('ping')
    db = client['cms_lab']
    posts_collection = db['posts']
    use_mongo = True
    print("Connected to local MongoDB.")
except Exception:
    print("MongoDB not available. Using JSON file storage at:", POSTS_FILE)
    os.makedirs(DATA_DIR, exist_ok=True)


# JSON file helpers
def load_posts():
    if os.path.exists(POSTS_FILE):
        with open(POSTS_FILE, 'r') as f:
            return json.load(f)
    return []


def save_posts(posts):
    with open(POSTS_FILE, 'w') as f:
        json.dump(posts, f, indent=2)


# 1. List all posts
@app.route('/')
@app.route('/posts')
def get_posts():
    if use_mongo:
        posts = list(posts_collection.find({}, {'title': 1, 'author': 1, 'createdAt': 1}))
    else:
        posts = load_posts()
    return render_template('posts.html', posts=posts)


# 2. Show create form
@app.route('/posts/new')
def new_post():
    return render_template('new-post.html')


# 3. Create post
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
            posts = load_posts()
            posts.append({
                '_id': str(uuid.uuid4()),
                'title': title,
                'author': author,
                'content': content,
                'createdAt': date_str
            })
            save_posts(posts)

    return redirect('/posts')


# 4. View a single post
@app.route('/posts/<id>')
def get_post(id):
    if use_mongo:
        try:
            post = posts_collection.find_one({'_id': ObjectId(id)})
        except Exception:
            post = posts_collection.find_one({'_id': id})
    else:
        post = next((p for p in load_posts() if p['_id'] == id), None)
    return render_template('post.html', post=post)


# 5. Show edit form
@app.route('/posts/<id>/edit', methods=['GET'])
def edit_post_form(id):
    if use_mongo:
        try:
            post = posts_collection.find_one({'_id': ObjectId(id)})
        except Exception:
            post = posts_collection.find_one({'_id': id})
    else:
        post = next((p for p in load_posts() if p['_id'] == id), None)
    return render_template('edit-post.html', post=post)


# 6. Handle edit submission
@app.route('/posts/<id>/edit', methods=['POST'])
def edit_post(id):
    title = request.form.get('title')
    author = request.form.get('author')
    content = request.form.get('content')

    if title and author and content:
        if use_mongo:
            try:
                posts_collection.update_one(
                    {'_id': ObjectId(id)},
                    {'$set': {'title': title, 'author': author, 'content': content}}
                )
            except Exception:
                posts_collection.update_one(
                    {'_id': id},
                    {'$set': {'title': title, 'author': author, 'content': content}}
                )
        else:
            posts = load_posts()
            for post in posts:
                if post['_id'] == id:
                    post['title'] = title
                    post['author'] = author
                    post['content'] = content
                    break
            save_posts(posts)

    return redirect('/posts')


# 7. Delete a post
@app.route('/posts/<id>/delete', methods=['POST'])
def delete_post(id):
    if use_mongo:
        try:
            posts_collection.delete_one({'_id': ObjectId(id)})
        except Exception:
            posts_collection.delete_one({'_id': id})
    else:
        posts = load_posts()
        posts = [p for p in posts if p['_id'] != id]
        save_posts(posts)

    return redirect('/posts')


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=False)