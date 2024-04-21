import crypto from "crypto";
import express, { NextFunction, Request, Response, Router } from "express";
import multer from "multer";
import {
  cancelBookingController,
  deleteHotelController,
  getAllHotelsController,
  getHotelController,
  giveHotelReviewController,
  insertHotelController,
  readLimitedOfferHotelsController,
  readWithRatingController,
} from "../Controllers/Hotel.controller";
import {
  createHotelSchema,
  deleteHotelSchema,
  getHotelSchema,
} from "../Schema/Hotel.schema";
import { addReviewBodySchema } from "../Schema/Review.schema";
import {
  authenticateToken,
  authenticateadmin,
} from "../middlewares/Authentication";
import { validate } from "../middlewares/SchemaParser";
const router = Router();

const storage = multer.diskStorage({
  destination(req: Request, file: Express.Multer.File, callback) {
    callback(null, "Assets/Hotel");
  },
  filename(req: Request, file: Express.Multer.File, callback: any) {
    const photoName = crypto.randomBytes(15).toString("hex");
    const imageName =
      file.fieldname +
      photoName +
      "." +
      file.originalname.split(".")[file.originalname.split(".").length - 1];

    callback(null, imageName);
  },
});

export const upload = multer({
  storage: storage,
});
router.get("/all", getAllHotelsController);
router.get(
  "/read/:hotel_id",
  validate({ schema: getHotelSchema.body, typeOfReq: "Params" }),
  getHotelController
);

router.get("/readwithrating", readWithRatingController);
router.post(
  "/givereview",
  authenticateToken,
  validate({ schema: addReviewBodySchema.body, typeOfReq: "Body" }),
  giveHotelReviewController
);
router.post(
  "/admin",

  upload.array("hotelImage", 5),
  validate({ schema: createHotelSchema.body, typeOfReq: "Body" }),
  insertHotelController
);

router.get("/readlimitedofferhotels", readLimitedOfferHotelsController);
router.put("/cancelbooking", cancelBookingController);
router.delete(
  "/:hotel_id",
  validate({ schema: deleteHotelSchema.body, typeOfReq: "Params" }),
  deleteHotelController
);

export default router;
