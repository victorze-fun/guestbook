import http from "http";
import path from "path";
import express from "express";
import logger from "morgan";

const app = express();

app.set("views", path.resolve("views"));
app.set("view engine", "ejs");

const entries = [];
app.locals.entries = entries;

app.use(logger("dev"));

app.use(express.urlencoded({ extended: false }));

app.get("/", function (request, response) {
  response.render("index", {entries});
});

app.get("/new-entry", function (request, response) {
  response.render("new-entry");
});

app.post("/new-entry", function (request, response) {
  if (!request.body.title || !request.body.body) {
    response.status(400).send("Entries must have a title and a body.");
    return;
  }

  entries.push({
    title: request.body.title,
    content: request.body.body,
    published: new Date(),
  });

  response.redirect("/");
});

app.use(function (request, response) {
  response.status(404).render("404");
});

http.createServer(app).listen(3000, function () {
  console.log("Guestbook app started on port 3000.");
});
