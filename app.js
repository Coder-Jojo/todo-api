const express = require("express");
const app = express();
const { open } = require("sqlite");
const sqlite3 = require("sqlite3");
const path = require("path");

const dbpath = path.join(__dirname, "todoApplication.db");

app.use(express.json());

let db = null;

const createServer = async () => {
  try {
    db = await open({
      filename: dbpath,
      driver: sqlite3.Database,
    });
    app.listen(3000);
  } catch (e) {
    console.log(e);
  }
};

createServer();

const validate = async (req, res, next) => {
  const { priority = "", status = "", category = "" } = req.body;
  console.log(priority, status, category);
  if (priority != "") {
    if (priority != "HIGH" && priority != "MEDIUM" && priority != "LOW") {
      res.status(400);
      res.send("Invalid Todo Priority");
      return;
    }
  }
  if (status != "") {
    if (status != "TO DO" && status != "IN PROGRESS" && status != "DONE") {
      res.status(400);
      res.send("Invalid Todo Status");
      return;
    }
  }
  if (category != "") {
    if (category != "WORK" && category != "HOME" && category != "LEARNING") {
      res.status(400);
      res.send("Invalid Todo Category");
      return;
    }
  }

  console.log("pass1");
  next();
};
const validate2 = async (req, res, next) => {
  const { priority = "", status = "", category = "" } = req.query;
  if (priority != "") {
    if (priority != "HIGH" && priority != "MEDIUM" && priority != "LOW") {
      res.status(400);
      res.send("Invalid Todo Priority");
      return;
    }
  }
  if (status != "") {
    if (status != "TO DO" && status != "IN PROGRESS" && status != "DONE") {
      res.status(400);
      res.send("Invalid Todo Status");
      return;
    }
  }
  if (category != "") {
    if (category != "WORK" && category != "HOME" && category != "LEARNING") {
      res.status(400);
      res.send("Invalid Todo Category");
      return;
    }
  }

  console.log("pass2");
  next();
};

app.use(validate);
app.use(validate2);

app.get("/todos/", async (req, res) => {
  const {
    category = "",
    priority = "",
    status = "",
    search_q = "",
  } = req.query;
  console.log(req.query);
  const query = `
        select id, todo, priority, status, category,
        status, due_date as dueDate 
        from todo
        where category like '%${category}%'
        and priority like '%${priority}%'
        and status like '%${status}%'
        and todo like '%${search_q}%'
    `;

  console.log(query);

  const resp = await db.all(query);
  console.log(resp);
  res.send(resp);
});

app.get("/todos/:todoId", async (req, res) => {
  const { todoId } = req.params;
  const query = `
        select id, todo, priority, status, category,
        status, due_date as dueDate  from todo
        where id = ${todoId}
    `;
  const resp = await db.get(query);
  console.log(resp);
  res.send(resp);
});

app.get("/agenda/", async (req, res) => {
  const { date = "" } = req.query;
  const query = `
        select * from todo
        where due_date = '${date}'
    `;
  const resp = await db.all(query);
  console.log(resp);
  res.send(resp);
});

app.post("/todos", async (req, res) => {
  const { id, todo, priority, category, status, dueDate } = req.body;
  const query = `
        insert into todo
        (id, todo, priority, category, status, due_date)
        values
        (${id}, '${todo}', '${priority}', '${category}', 
        '${status}', '${dueDate}')
    `;
  const resp = await db.run(query);
  console.log(resp);
  res.send("Todo Successfully Added");
});

app.put("/todos/:todoId", async (req, res) => {
  const { todoId } = req.params;
  const query = `
        select * from todo
        where id = ${todoId}
    `;
  const prevResp = await db.get(query);
  console.log(prevResp);

  const {
    todo = prevResp.todo,
    category = prevResp.category,
    priority = prevResp.priority,
    status = prevResp.status,
    dueDate = prevResp.due_date,
  } = req.body;

  const query2 = `
        update todo
        set
        category = '${category}',
        priority = '${priority}',
        status = '${status}',
        due_date = '${dueDate}',
        todo = '${todo}'
        where id = ${todoId}
    `;
  const resp2 = await db.run(query2);
  console.log(resp2);
  const body = req.body;
  let msg;

  if (body.category !== undefined) msg = "Category";
  else if (body.status !== undefined) msg = "Status";
  else if (body.todo !== undefined) msg = "Todo";
  else if (body.dueDate !== undefined) msg = "Due Date";
  else if (body.priority !== undefined) msg = "Priority";

  res.send(`${msg} Updated`);
});

app.delete("/todos/:todoId", async (req, res) => {
  const { todoId } = req.params;
  const query = `
        delete from todo
        where id = ${todoId}
    `;
  const resp = await db.run(query);
  console.log(resp);
  res.send("Todo Deleted");
});

module.exports = app;
