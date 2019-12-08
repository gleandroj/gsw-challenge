import { Router } from "express";
import converService from "../services/convertService";
const router = Router();

const codeReg = /(([2-9]|[0])(\_)*)+/;

/**
 * @swagger
 * definitions:
 *  Conversion:
 *   type: "object"
 *   properties:
 *     code:
 *       type: "string"
 *       pattern: "((([2-9]|[0])(\_))*)+"
 *       nullable: true
 *       example: "833777783303_33063377772"
 *       description: "message code that wants to decode. Required without message"
 *     message:
 *       type: "string"
 *       maxLength: 255
 *       nullable: true
 *       example: "TESTE DE MESA"
 *  ConversionResponse:
 *   type: "object"
 *   properties:
 *     code:
 *       type: "string"
 *       example: "833777783303_33063377772"
 *     message:
 *       type: "string"
 *       example: "TESTE DE MESA"
 *     _id:
 *       type: "string"
 *       example: "5dec76f92140e16e661f2176"
 *  PaginateResponse:
 *   type: "object"
 *   properties:
 *     page:
 *       type: "integer"
 *       example: 0
 *     perPage:
 *       type: "integer"
 *       example: 5
 *     total:
 *       type: "integer"
 *       example: 1
 *     data:
 *       type: "array"
 *       items:
 *         $ref: "#/definitions/ConversionResponse"
 *         
 */

/**
 * @swagger
 * /conversions:
 *  post:
 *    description: Create a new conversion
 *    parameters:
 *       - name: body
 *         in: body
 *         type: object
 *         schema:
 *          $ref: "#/definitions/Conversion"
 *    responses:
 *      200:
 *        description: "successful operation"
 *        schema:
 *          $ref: "#/definitions/ConversionResponse"
 *      400:
 *        description: "Invalid parameters"
 */
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

/**
 * @swagger
 * /conversions:
 *  get:
 *    description: paginate conversions
 *    parameters:
 *       - name: page
 *         description: page index starting at 0
 *         type: integer
 *         required: false
 *         in: query
 *         example: 0
 *       - name: perPage
 *         description: quantity of itens per page
 *         type: integer
 *         nullable: true
 *         in: query
 *         example: 5
 *    responses:
 *      200:
 *        description: "successful operation"
 *        schema:
 *          $ref: "#/definitions/PaginateResponse"
 */
router.get("/conversions", async (req, res) => {
  const { page = 0, perPage = 5 } = req.query;
  const conversions = await converService.paginate({
    page: parseInt(page),
    perPage: parseInt(perPage)
  });
  res.send(conversions);
});

export default router;
