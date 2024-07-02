const express = require("express");
const app = express();
const path = require("path");
const fs = require("fs");
const pathToFile = path.join(__dirname, "count.json");
const count = JSON.parse(fs.readFileSync(pathToFile, "utf-8"));

app.get("/", (req, res) => {
  count.count_1++;
  res.send(
    `<h1>Корневая страница</h1><p>Просмотров ${count.count_1}</p><a href="/about">Ссылка на страницу /about</a>`
  );
  console.log("запрос 1 выолнен");
  fs.writeFileSync(pathToFile, JSON.stringify(count, null, 2), (error) => {
    if (error) {
      console.error(error);
    }
  });
});
app.get("/about", (req, res) => {
  count.count_2++;
  res.send(
    `<h1>Страница about</h1><p>Просмотров ${count.count_2}</p><a href="/">Ссылка на страницу /</a>`
  );
  console.log("запрос 2 выолнен");
  fs.writeFileSync(pathToFile, JSON.stringify(count, null, 2), (error) => {
    if (error) {
      console.error(error);
    }
    console.log("Файл успешно сохранен");
  });
});
const port = 3000;
app.listen(port, () => {
  console.log(`Сервер запущен на порту ${port}`);
});
