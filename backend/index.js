import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import User from "./models/User.js";
import Place from "./models/Place.js";
import Booking from "./models/Booking.js";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import imageDownloader from "image-downloader";
import path from "path";
import { fileURLToPath } from "url";
import multer from "multer";
import fs from "fs";
dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const port = process.env.PORT || 3000;

const app = express();

const jwtsecret = process.env.JWT_SECRET;

app.use(express.json());
app.use(cookieParser());
app.use("/uploads", express.static(__dirname + "/uploads/"));
// app.use(cors());

const frontendUrl = process.env.FRONTEND_URL;
const allowedOrigins = [frontendUrl, "http://localhost:5173"];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin) return callback(null, true); //for postman

      if (allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);

// made this fucntion later so its not used everywhere
function getUserDataFromCookies(token) {
  return new Promise((resolve, reject) => {
    jwt.verify(token, jwtsecret, {}, (error, userData) => {
      if (error) throw error;
      resolve(userData);
    });
  });
}

app.get("/test", (req, res) => {
  res.json("Hello World!");
});

app.post("/register", async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const salt = await bcrypt.genSalt(12);
    const hashedPass = await bcrypt.hash(password, salt);

    const userDoc = await User.create({
      name,
      email,
      password: hashedPass,
    });

    res.json(userDoc);
  } catch (error) {
    res.status(500).json(error);
  }
});

app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const userDoc = await User.findOne({ email });
    if (userDoc) {
      const passOK = await bcrypt.compare(password, userDoc.password);
      if (passOK) {
        jwt.sign(
          { email: userDoc.email, id: userDoc._id },
          jwtsecret,
          {},
          (error, token) => {
            if (error) throw error;
            res
              .cookie("token", token, {
                httpOnly: true,
                secure: true,
                sameSite: "none",
              })
              .json(userDoc);
          }
        );
      } else {
        res.status(422).json("password does not match");
      }
    } else {
      res.json("user not found");
    }
  } catch (error) {
    res.json(`Error while logging :\n${error}`);
  }
});

app.get("/profile", async (req, res) => {
  const { token } = req.cookies;
  if (token) {
    jwt.verify(token, jwtsecret, {}, async (error, userData) => {
      if (error) throw error;
      const { name, email, _id } = await User.findById(userData.id);
      res.json({ name, email, _id });
    });
  } else {
    res.json(null);
  }
});

app.post("/logout", (req, res) => {
  res
    .cookie("token", "", { httpOnly: true, secure: true, sameSite: "none" })
    .json(true);
});

app.post("/upload-by-link", async (req, res) => {
  try {
    const { link } = req.body;
    const newName = "photo" + Date.now() + ".jpg";
    await imageDownloader.image({
      url: link,
      dest: __dirname + "/uploads/" + newName,
    });
    res.json(newName);
  } catch (error) {
    console.log("upload failed : ", error);
  }
});

const photosMiddleware = multer({ dest: "uploads" });
app.post("/upload", photosMiddleware.array("photos", 20), (req, res) => {
  const uploadedFiles = [];
  for (let i = 0; i < req.files.length; i++) {
    const { path, originalname } = req.files[i];
    const parts = originalname.split(".");
    const ext = parts[parts.length - 1];
    const newPath = path + "." + ext;
    fs.renameSync(path, newPath);
    uploadedFiles.push(newPath.replace("uploads", ""));
  }
  res.json(uploadedFiles);
});

app.post("/places", async (req, res) => {
  const { token } = req.cookies;
  const {
    title,
    address,
    addedPhotos,
    description,
    perks,
    extraInfo,
    checkIn,
    checkOut,
    maxGuests,
    price,
  } = req.body;
  jwt.verify(token, jwtsecret, {}, async (error, userData) => {
    if (error) throw error;
    const { name, email, id } = userData;
    const placeDoc = await Place.create({
      owner: id,
      title,
      address,
      photos: addedPhotos,
      description,
      perks,
      extraInfo,
      checkIn,
      checkOut,
      maxGuests,
      price,
    });
    res.json(placeDoc);
  });
});

app.get("/user-places", (req, res) => {
  const { token } = req.cookies;
  jwt.verify(token, jwtsecret, {}, async (error, userData) => {
    if (error) throw error;
    const { id } = userData;
    const allPlaces = await Place.find({ owner: id });
    res.json(allPlaces);
  });
});

app.get("/places/:id", async (req, res) => {
  const { id } = req.params;
  const data = await Place.findById(id);
  res.json(data);
});

app.put("/places", async (req, res) => {
  const { token } = req.cookies;
  const {
    id,
    title,
    address,
    addedPhotos,
    description,
    perks,
    extraInfo,
    checkIn,
    checkOut,
    maxGuests,
    price,
  } = req.body;
  jwt.verify(token, jwtsecret, {}, async (error, userData) => {
    if (error) throw error;
    const placeDoc = await Place.findById(id);
    if (userData.id === placeDoc.owner.toString()) {
      const updatedPlace = await Place.findByIdAndUpdate(id, {
        title,
        address,
        photos: addedPhotos,
        description,
        perks,
        extraInfo,
        checkIn,
        checkOut,
        maxGuests,
        price,
      });
      res.json("OK UPDATED");
    }
  });
});

app.get("/places", async (req, res) => {
  res.json(await Place.find());
});

app.post("/bookings", async (req, res) => {
  const { token } = req.cookies;
  const userData = await getUserDataFromCookies(token);
  const { place, checkIn, checkOut, numberOfGuests, name, phone, price } =
    req.body;
  const bookingDoc = await Booking.create({
    user: userData.id,
    place,
    checkIn,
    checkOut,
    numberOfGuests,
    name,
    phone,
    price,
  });
  res.json(bookingDoc);
});

app.get("/bookings", async (req, res) => {
  const { token } = req.cookies;
  const userData = await getUserDataFromCookies(token);
  res.json(await Booking.find({ user: userData.id }).populate("place"));
});

app.get("/bookings/:id", async (req, res) => {
  const { token } = req.cookies;
  const { id } = req.params;
  const userData = await getUserDataFromCookies(token);
  const placeData = await Booking.findOne({
    user: userData.id,
    _id: id,
  }).populate("place");
  res.json(placeData);
});

app.get("/search", async (req, res) => {
  const address = req.query.q;
  const regex = new RegExp(address, "i");
  const data = await Place.find({ address: { $regex: regex } });
  res.json(data);
});

app.delete("/delete/:id", async (req, res) => {
  const { token } = req.cookies;
  const { id } = req.params;
  const userData = await getUserDataFromCookies(token);
  const placeDoc = await Place.findById(id);
  if (userData.id === placeDoc.owner.toString()) {
    await Place.findByIdAndDelete(id);
  }
  res.json("Deleted");
});

app.get("/bookedlistings", async (req, res) => {
  const { token } = req.cookies;
  const userData = await getUserDataFromCookies(token);
  const userPlaces = await Place.find({ owner: userData.id });
  const userPlacesIds = userPlaces.map((place) => place._id);
  const bookings = await Booking.find({
    place: { $in: userPlacesIds },
  })
    .populate("place")
    .populate("user")
    .sort({ checkIn: 1 });
  res.json(bookings);
});

await mongoose.connect(process.env.MONGO_URL);
console.log("MongoDB Conneccted");

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
