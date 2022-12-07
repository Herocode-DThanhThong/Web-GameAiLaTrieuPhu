const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const app = express();
const cloudinary = require("cloudinary");
const port = process.env.PORT || 5000;
dotenv.config();

const corsConfig = {
  credentials: true,
  origin: true,
};

// config cloud
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

// Config
app.use(cors(corsConfig));
app.use(express.json());
app.get("/", (req, res) => {
  return res.json({
    success: true,
    mess: "Hello",
  });
});
app.post("/", async (req, res) => {
  const { public_id } = req.body;
  try {
    const response = await cloudinary.v2.uploader.destroy(public_id, {
      invalidate: true,
      resource_type: "raw",
    });

    if (response.result !== "ok") {
      throw {
        error: new Error(response.result),
      };
    }
    return res.status(200).json({
      success: true,
      message: "Xóa audio thành công",
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      success: false,
      message: "Server error",
    });
  }
});

app.listen(port, () => {
  console.log(`>>>>>>>>>>>>>>>> App listening on port ${port} <<<<<<<<<<<<`);
});
