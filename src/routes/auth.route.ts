import { Router } from "express";
import { Routes } from "../interfaces/route.interface";
import AuthController from "../controllers/auth.controller";
import validationMiddleware from "../middlewares/validation.middleware";

class AuthRoute implements Routes {
	public path = "/auth";
	public router = Router();
	private authController = new AuthController();

	constructor() {
		this.initializeRoutes();
	}

	private initializeRoutes() {
		this.router.post(`${this.path}/signup`, this.authController.signup);
		this.router.post(`${this.path}/login`, this.authController.login);
		this.router.get(`${this.path}/logout`, this.authController.logOut);
	}
}

export default AuthRoute;
