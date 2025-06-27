require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();

const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const port = process.env.PORT || 3000;
app.use(cors());
app.use(
  cors({
    origin: ["https://giglance-f9386.web.app"],
    credentials: true,
  })
);
app.use(express.json());
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.zst2sy0.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    // await client.connect();

    const taskCollection = client.db("taskDB").collection("tasks");

    app.get("/tasks", async (req, res) => {
      // console.log(req.query.category)
      if (req.query) {
        const result = await taskCollection.find({
          category: req.query.category,
        }).toArray();
        res.send(result);
      } else {
        const cursor = taskCollection.find({}).sort({ deadline: 1 });
        const result = await cursor.toArray();
        res.send(result);
      }
    });

    app.get("/tasks/:id", async (req, res) => {
      const id = req.params.id;
      const query = {
        _id: new ObjectId(id),
      };
      const result = await taskCollection.findOne(query);
      res.send(result);
    });

    app.get("/sortedTasks", async (req, res) => {
      const tasks = await taskCollection
        .find({})
        .sort({ deadline: 1 })
        .limit(6)
        .toArray();
      res.send(tasks);
    });

    app.post("/tasks", async (req, res) => {
      const newTask = req.body;
      const result = await taskCollection.insertOne(newTask);
      res.send(result);
    });

    app.put("/tasks/:id", async (req, res) => {
      const id = req.params.id;
      const filter = { _id: new ObjectId(id) };
      const option = { upsert: true };
      const updatedTask = req.body;
      const updatedDoc = {
        $set: updatedTask,
      };
      const result = await taskCollection.updateOne(filter, updatedDoc, option);
      res.send(result);
    });

    app.patch("/tasks/:id", async (req, res) => {
      const id = req.params.id;
      const newBids = req.body;
      const filter = {
        _id: new ObjectId(id),
      };
      const option = { upsert: true };
      const updatedDoc = {
        $set: newBids,
      };
      const result = await taskCollection.updateOne(filter, updatedDoc, option);
      res.send(result);
    });

    app.delete("/tasks/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await taskCollection.deleteOne(query);
      res.send(result);
    });

    // Send a ping to confirm a successful connection
    // await client.db("admin").command({ ping: 1 });
    // console.log(
    //   "Pinged your deployment. You successfully connected to MongoDB!"
    // );
  } finally {
  }
}
run().catch(console.dir);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
