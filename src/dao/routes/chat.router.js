import { Router } from "express";

const router = Router();

// Chat
router.get("/", async (req, res) => {
const data = req.query;
res.render("chat");
});

export default router;

