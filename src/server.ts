import App from "./app";
import AuthRoute from "./routes/auth.route";
import UserRoute from "./routes/user.routes";

const application = new App([
              new AuthRoute(), 
              new UserRoute() 
]);

application.startServer();
