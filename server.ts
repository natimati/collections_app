import express from "express";
import cors from "cors";
import path from "path";

class Server {
  app: express.Express;
  port: number;
  paths: Record<string, string>

  constructor() {
    this.app = express();
    this.port = Number(process.env.PORT) || 8080;
    this.paths = {
      auth: "/api/auth",
      // homepage: "/api/homepage",
    };

    this.middlewares();
    this.routes();
  }

  middlewares() {
    this.app.use(
      express.static(path.join(__dirname, "./client/build"))
    );
    this.app.use(cors());
    this.app.use(express.json());
  }

  routes() {
    this.app.use(this.paths.auth, require("./routes/auth"));
    // this.app.use(this.paths.homepage, require("./routes/homepage"));
    this.app.get("*", (req, res) => {
      res.sendFile(
        path.join(__dirname, "./client/build/index.html")
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
