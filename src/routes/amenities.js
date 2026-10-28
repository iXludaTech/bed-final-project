import { Router } from "express";
import getAmenities from "../services/amenities/getAmenities.js";
import createAmenity from "../services/amenities/createAmenity.js";
import getAmenityById from "../services/amenities/getAmenityById.js";
import deleteAmenityById from "../services/amenities/deleteAmenity.js";
import updateAmenityById from "../services/amenities/updateAmenity.js";
import auth from "../../middleware/auth.js";

const router = Router();

// GET all amenities
router.get("/", async (req, res, next) => {
    try {
        const amenities = await getAmenities();

        res.status(200).json(amenities);
    } catch (error) {
        next(error);
    }
});

// GET an amenity by ID
router.get("/:id", async (req, res, next) => {
    try {
        const { id } = req.params;

        const amenity = await getAmenityById(id);

        res.status(200).json(amenity);
    } catch (error) {
        next(error);
    }
});

// CREATE a new amenity
router.post("/", auth, async (req, res, next) => {
    try {
        const { name } = req.body;

        const newAmenity = await createAmenity(name);

        res.status(201).json(newAmenity);
    } catch (error) {
        next(error);
    }
});

// DELETE an amenity by ID
router.delete("/:id", auth, async (req, res, next) => {
    try {
        const { id } = req.params;

        const amenity = await deleteAmenityById(id);

        res.status(200).json({
            message: `Amenity with id ${id} successfully deleted`,
            amenity,
        });
    } catch (error) {
        next(error);
    }
});

// UPDATE an amenity by ID
router.put("/:id", auth, async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name } = req.body;

    const amenity = await updateAmenityById(id, { name });

    res.status(200).json({
      message: `Amenity with id ${id} successfully updated`,
      amenity,
    });
  } catch (error) {
    next(error);
  }
});

export default router;
