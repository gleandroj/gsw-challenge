import { Router } from "express";
const router = Router();

router.post("/convert", function (req, res, next) {
  const { code, message } = req.body;

  if (!code && !message) {
    res.status(400);
    res.json({
      error: "O campo mensagem é obrigatório quando o código não está presente."
    });
  } else {
    res.json({ code: "passou aqui code", message: "passou aqui message" });
  }
});

export default router;
