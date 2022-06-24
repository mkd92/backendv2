import express from "express";
import postController from "../controllers/postController";
import auth from "../middleware/auth";
const router = express.Router();
router.get("/mypost", auth().authenticate(), postController.get_post);
export default router;
