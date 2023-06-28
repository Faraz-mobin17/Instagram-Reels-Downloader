const express = require("express");
const axios = require("axios");
const cors = require("cors");

const app = express();
const PORT = 3000;

app.use(cors());

app.get("/download", async (req, res) => {
  const { url } = req.query;

  try {
    const response = await axios({
      method: "GET",
      url: url,
      responseType: "stream",
    });

    res.setHeader(
      "Content-Disposition",
      "attachment; filename=instagram_reel.mp4"
    );
    res.setHeader("Content-Type", "text/html");
    response.data.pipe(res);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).send("Internal Server Error");
  }
});

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
