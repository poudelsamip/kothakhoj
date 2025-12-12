import express from "express";
import { requireAuth } from "../middleware/authMiddleware.js";
import { photosMiddleware } from "../middleware/multerMiddleware.js";
import * as placeController from "../controller/placeControllers.js";

const router = express.Router();

router.post("/upload-by-link", placeController.uploadByLink);
router.post(
  "/upload",
  requireAuth,
  photosMiddleware.array("photos", 20),
  placeController.uploadedFiles
);
router.post("/places", requireAuth, placeController.createPlace);
router.get("/user-places", requireAuth, placeController.getUserPlaces);
router.get("/places/:id", placeController.getPlace);
router.put("/places", requireAuth, placeController.updatePlace);
router.get("/places", placeController.getAllPlaces);
router.delete("/delete/:id", requireAuth, placeController.deletePlace);
router.get("/search", placeController.searchPlaces);

export default router;
