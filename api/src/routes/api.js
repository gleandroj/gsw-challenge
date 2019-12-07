import { Router } from "express";
import converService from "../services/convertService";
const router = Router();

router.post("/convert", async (req, res, next) => {
  const { code, message } = req.body;

  if (!code && !message) {
    res.status(400);
    res.json({
      error: "O campo mensagem é obrigatório quando o código não está presente."
    });
  } else {
    res.json(await converService.convert({ message, code }));
  }
});

export default router;
