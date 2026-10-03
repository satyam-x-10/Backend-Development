 Backend Development

Coursework and lab experiments for **Backend Development** at UPES, Dehradun (2026).

**Author:** Satyam Koranga ([@satyam-x-10](https://github.com/satyam-x-10))

---

 Repository Structure

### 1. [`lab/`](lab/) — Backend Development Course Experiments
Complete laboratory assignments with code, live outputs, and documentation:
- **Exp 01:** [All HTML5 Elements](lab/#-exp-01--all-html5-elements)
- **Exp 02:** [Cascading Style Sheets (CSS)](lab/#-exp-02--cascading-style-sheets)
- **Exp 03:** [Responsive Web Design](lab/#-exp-03--responsive-web-page)
- **Exp 12:** [Node.js, Express & EJS](lab/#-exp-12--nodejs-npm-express-nodemon--ejs)
- **Exp 13A:** [MongoDB & Express Auth System](lab/#-exp-13a--mongodb-mongoose--express-auth)
- **Exp 14:** [PostgreSQL Relational DB CRUD](lab/#-exp-14--postgresql-optional)

See [**`lab/README.md`**](lab/README.md) for full experiment details and screenshots.

---

### 2. [`cms/`](cms/) — Blog Content Management System (Flask + MongoDB)
Full-featured server-side rendered Blog CMS web app built with Python Flask, PyMongo, and Jinja2 templates:
- **`GET /posts`:** Dynamic list of all blog posts with title, author, and date.
- **`GET /posts/new` & `POST /posts`:** Create post form with server-side validation and MongoDB persistence.
- **`GET /posts/<id>`:** View single post details queried via MongoDB `ObjectId`.
- **Database:** MongoDB database `cms_lab` and collection `posts`.

See [**`cms/README.md`**](cms/README.md) for screenshots, route documentation, and setup instructions.
