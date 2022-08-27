const express = require("express");
const app = express();

const port = 3001;

app.get("/api", (req, res) => {
  res.json({ user: "test" });
});

app.listen(port, () => console.log("server started on port " + port));
