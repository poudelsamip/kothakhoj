import Place from "../models/Place.js";
import fs from "fs";
import imageDownloader from "image-downloader";

export const uploadByLink = async (req, res) => {
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
};

export const uploadedFiles = (req, res) => {
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
};

export const createPlace = async (req, res) => {
  try {
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
    const { ownerId } = req.user;
    const placeDoc = await Place.create({
      owner: ownerId,
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
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

export const getUserPlaces = async (req, res) => {
  const { id } = req.user;
  const allPlaces = await Place.find({ owner: id });
  res.json(allPlaces);
};

export const getPlace = async (req, res) => {
  const { id } = req.user;
  const data = await Place.findById(id);
  res.json(data);
};

export const updatePlace = async (req, res) => {
  try {
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
  } catch (error) {
    res.status(500).json({ message: "Update Failed" });
  }
};

export const getAllPlaces = async (req, res) => {
  res.json(await Place.find());
};

export const deletePlace = async (req, res) => {
  try {
    const { id } = req.params;
    const { userId } = req.user;
    const placeDoc = await Place.findById(id);
    if (userId === placeDoc.owner.toString()) {
      await Place.findByIdAndDelete(id);
      res.json("Deleted");
    } else {
      res.status(403).json("Not Authorized");
    }
  } catch (error) {
    res.status(500).json({ message: "Delete failed" });
  }
};

export const searchPlaces = async (req, res) => {
  const address = req.query.q;
  const regex = new RegExp(address, "i");
  const data = await Place.find({ address: { $regex: regex } });
  res.json(data);
};
