import express from "express";
import cors from "cors";
import path from "path";

import authRouter from "./routes/auth";
import searchRouter from "./routes/search";
import collectionsRouter from "./routes/collections"
import itmesRouter from "./routes/items"
import usersRouter from "./routes/users"

class Server {
  app: express.Express;
  port: number;

  constructor() {
    this.app = express();
    this.port = Number(process.env.PORT) || 8080;

    this.middlewares();
    this.routes();
  }

  middlewares() {
    this.app.use(
      express.static(path.join(__dirname, "../client/build"))
    );
    this.app.use(cors());
    this.app.use(express.json());
  }

  routes() {
    this.app.use("/api/auth", authRouter);
    this.app.use("/api/search", searchRouter);
    this.app.use("/api/collections", collectionsRouter)
    this.app.use("/api/items", itmesRouter);
    this.app.use("/api/users", usersRouter);
    this.app.get("*", (req, res) => {
      res.sendFile(
        path.join(__dirname, "../client/build/index.html")
      );
    });
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log("Server running on port: ", this.port);
    });
  }
}

export default Server;
