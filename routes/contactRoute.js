import express from "express";
import contactController from "../controllers/contactController";

const router = express.Router();

router.post("/create", contactController.createContact);
router.delete("/delete/:contactId", contactController.removeContact);

export default router;
