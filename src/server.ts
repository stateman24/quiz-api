import App from "./app";
import AuthRoute from "./routes/auth.route";

const application = new App([new AuthRoute()]);

application.startServer();
