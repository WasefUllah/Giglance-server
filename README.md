# 🛠️ Giglance Server

This is the backend server for the **Giglance** freelancing platform. It is built using **Node.js**, **Express.js**, and **MongoDB**, and it provides RESTful APIs for managing freelance tasks.

## 🌐 Live Server

Currently hosted at:  
`https://giglance-server.vercel.app/`

## Client side repo:

`https://github.com/WasefUllah/Giglance-client`

## 📁 Features

- Add a new freelance task
- View all tasks or tasks by category
- Sort and get top 6 tasks by upcoming deadlines
- View single task by ID
- Update or delete a task
- Submit bids using PATCH

## 🧪 Tech Stack

- **Node.js**
- **Express.js**
- **MongoDB**
- **dotenv**
- **cors**

## 📦 API Endpoints

| Method | Endpoint       | Description                                             |
| ------ | -------------- | ------------------------------------------------------- |
| GET    | `/tasks`       | Get all tasks (or filter by category with `?category=`) |
| GET    | `/tasks/:id`   | Get a specific task by ID                               |
| GET    | `/sortedTasks` | Get top 6 tasks with earliest deadlines                 |
| POST   | `/tasks`       | Add a new task                                          |
| PUT    | `/tasks/:id`   | Update a task                                           |
| PATCH  | `/tasks/:id`   | Add or update bid info on a task                        |
| DELETE | `/tasks/:id`   | Delete a task                                           |

## 🔐 Environment Variables

Create a `.env` file in the root directory:

```env
DB_USER=your_db_username
DB_PASS=your_db_password
PORT=3000
```

## 🧪 Local Development

1. Clone the repository
2. Install dependencies:

   ```bash
   npm install
   ```

3. Create `.env` file with your MongoDB credentials
4. Start the server:

   ```bash
   nodemon index.js
   ```

## 🛡️ CORS Configuration

Allowed origin for frontend:

```js
origin: ["https://giglance-f9386.web.app"];
```

Ensure that your frontend domain is allowed for cross-origin requests.

---

## 👨‍💻 Author

Developed by [Wasef](https://github.com/WasefUllah)

---

## 📄 License

MIT
