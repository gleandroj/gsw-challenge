import { Router } from "express";
import converService from "../services/convertService";
const router = Router();

const codeReg = /(([2-9]|[0])(\_)*)+/;

router.post("/conversions", async (req, res) => {
  const { code, message } = req.body;

  if (!code && !message) {
    res.status(400);
    res.json({
      error: "O campo mensagem é obrigatório quando o código não está presente."
    });
  } else if (code && !codeReg.test(code)) {
    res.status(400);
    res.json({
      error: "O campo código é inválido."
    });
  } else {
    res.json(await converService.convert({ message, code }));
  }
});

router.get("/conversions", async (req, res) => {
  const { page = 0, perPage = 5 } = req.query;
  const conversions = await converService.paginate({
    page: parseInt(page),
    perPage: parseInt(perPage)
  });
  res.send(conversions);
});

export default router;
