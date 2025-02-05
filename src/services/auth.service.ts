import { StatusCodes } from "http-status-codes";
import HTTPException from "../exceptions/http.exception";
import { IUser } from "../interfaces/user.interface";
import UserModel from "../models/user.model";
import { isEmpty } from "../utils/util";
import {
	SignUpDataType,
	TokenDataType,
	loginDataType,
} from "../interfaces/auth.interface";

class AuthService {
	private authModel = UserModel;

	public signup = async (userData: SignUpDataType): Promise<IUser> => {
		if (isEmpty(userData))
			throw new HTTPException(StatusCodes.BAD_REQUEST, "Empty user data");
		const { password, passwordRepeat, email } = userData;

		const existingUser = await this.authModel.findOne({ email });
		if (existingUser)
			throw new HTTPException(
				StatusCodes.BAD_REQUEST,
				"Email already registered"
			);

		if (password !== passwordRepeat)
			throw new HTTPException(StatusCodes.BAD_REQUEST, "Passwords dont match");

		const user = await this.authModel.create(userData);

		return user;
	};

	public login = async (
		loginData: loginDataType
	): Promise<{ user: IUser; cookie: string; token: TokenDataType }> => {
		if (isEmpty(loginData))
			throw new HTTPException(StatusCodes.BAD_REQUEST, "Empty login data");

		const user = await this.authModel.findOne({ email: loginData.email });
		if (!user) {
			throw new HTTPException(StatusCodes.NOT_FOUND, "Email not registered");
		}

		const isMatch = await user.comparePassword(loginData.password);
		if (!isMatch) {
			throw new HTTPException(
				StatusCodes.BAD_REQUEST,
				"Wrong login credentials"
			);
		}
		const tokenData = user.getJWTToken();
		const cookie = this.createCookie(tokenData);
		return { user, cookie, token: tokenData };
	};

	public logout = async () => {};

	public createCookie(tokenData: TokenDataType): string {
		return `Authorization=${tokenData.token}; HttpOnly; Max-Age=${tokenData.expiresIn};`;
	}
}

export default AuthService;
