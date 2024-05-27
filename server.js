const express = require("express");
const fetchMetaData = require("./crawler");

const app = express();
const port = process.env.PORT || 3000;

app.get("/metadata", async (req, res) => {
  const { url } = req.query;
  if (!url) {
    return res.status(400).send("URL is required");
  }

  const data = await fetchMetaData(url);
  if (data) {
    res.json(data);
  } else {
    res.status(500).send("Failed to fetch metadata");
  }
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
