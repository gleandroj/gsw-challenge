import { Router } from "express";
const router = Router();

router.post("/convert", function(req, res, next) {
  const { code, message } = req.body;
  res.json({ code: "passou aqui code", message: "passou aqui message" });
});

export default router;
