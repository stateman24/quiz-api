import { StatusCodes } from "http-status-codes";
import AuthService from "../services/auth.service";
import { Request, Response, NextFunction } from "express";

class AuthController {
	private authService = new AuthService();

	public signup = async (req: Request, res: Response, next: NextFunction) => {
		try {
			const user = await this.authService.signup(req.body);
			res
				.status(StatusCodes.CREATED)
				.json({ data: user, message: "User registered" });
		} catch (error) {
			next(error);
		}
	};

	public login = async (req: Request, res: Response, next: NextFunction) => {
		try {
			const data = await this.authService.login(req.body);
			res.status(StatusCodes.CREATED).json({ data, message: "User logged in" });
		} catch (error) {
			next(error);
		}
	};

	public logOut = async (req: Request, res: Response, next: NextFunction) => {
		try {
			await this.authService.logout();
			res.status(StatusCodes.OK).json({ message: "User logged out" });
		} catch (error) {
			next(error);
		}
	};
}

export default AuthController;
