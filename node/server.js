const express = require("express");
const MongoClient = require("mongodb").MongoClient;
const db_name = "todo_list_app";
const table_name = "todo_list";
const bodyParser = require("body-parser");
const cors = require("cors");

(async function () {
  const app = express();
  app.use(cors());
  app.use(bodyParser());

  try {
    const mongo = new MongoClient("mongodb://db:27017");
    const client = await mongo.connect();
    const db = client.db(db_name);
    const table = db.collection(table_name);

    app.use(bodyParser.urlencoded({ extended: true }));

    app.listen(3000, function () {
      console.log("listening on 3000");
    });

    app.get("/", function (req, res) {
      res.send("hello");
    });

    app.post("/todo", (req, res) => {
      console.log(req.body);
      table
        .insertOne(req.body)
        .then((result) => {
          res.send({ status: 201 });
        })
        .catch((error) => res.send({ error, status: 500 }));
    });

    app.get("/todo", (req, res) => {
      table
        .find()
        .toArray()
        .then((todos) => {
          res.send(todos);
        })
        .catch((err) => res.send({ status: 500 }));
    });

    app.delete("/drop", (req, res) => {
      table
        .remove({})
        .then((todos) => {
          res.send({ status: 200 });
        })
        .catch((err) => res.send({ status: 500 }));
    });
  } catch (e) {
    console.error(e.stack);
    throw e.stack;
  }
})();
