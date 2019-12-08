import createError from "http-errors";
import express from "express";
import path from "path";
import cookieParser from "cookie-parser";
import logger from "morgan";
import cors from "cors";
import indexRouter from "./routes/api";
import { connectDb } from "./models";
import { normalizePort } from "./helpers";
import docsRouter from "./docs";

export default class Application {
  constructor() {
    this.port = normalizePort(process.env.PORT || "8000");
    this.public_dir = "public";
    this.app = express();
    this.isDev = this.app.get("env") === "development";
    this.configure();
  }

  configure() {
    this.app.use(logger("dev"));
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: false }));
    this.app.use(cookieParser());
    this.app.use(cors());
    this.app.use(express.static(path.join(__dirname, this.public_dir)));
    docsRouter(this.app);
    this.apiRoutes();
    this.app.use(this.catch404.bind(this));
    this.app.use(this.errorHandler.bind(this));
    this.app.on("error", this.onError.bind(this));
  }

  apiRoutes() {
    this.app.use("/api", indexRouter);
    this.app.get("/api/ping", (req, res) => res.send("pong"));
  }

  catch404(req, res, next) {
    next(createError(404));
  }

  errorHandler(err, req, res, next) {
    const error = this.isDev ? err : {};
    res.status(err.status || 500);
    res.json(error);
  }

  onError(error) {
    if (error.syscall !== "listen") {
      throw error;
    }

    const bind = typeof port === "string" ? "Pipe " + port : "Port " + port;

    switch (error.code) {
      case "EACCES":
        console.error(bind + " requires elevated privileges");
        process.exit(1);
        break;
      case "EADDRINUSE":
        console.error(bind + " is already in use");
        process.exit(1);
        break;
      default:
        throw error;
    }
  }

  listen() {
    this.app.listen(
      this.port,
      console.log.apply(`App listening on port: ${this.port}`)
    );
  }

  async boostrap() {
    await connectDb();
  }
}
