import { Router } from "express";
const router = Router();

router.post("/api/convert", function(req, res, next) {
  const { code, message } = req.body;
  res.json({ code, message });
});

export default router;
