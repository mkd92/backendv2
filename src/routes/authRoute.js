import express from "express";
import passport from "passport";
import User from "../models/User";
import authController from "../controllers/authController";

const router = express.Router();

router.post("/login", passport.authenticate("local"), authController.login);
router.post("/register", authController.register);

export default router;
