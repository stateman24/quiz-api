import { NextFunction, Response } from "express";
import HTTPException from "../exceptions/http.exception";
import { StatusCodes } from "http-status-codes";
import jwt from "jsonwebtoken";
import UserModel from "../models/user.model";
import { DataStoreInJWT, RequestWithUser } from "../interfaces/auth.interface";
import { IUser } from "../interfaces/user.interface";
import { JWT_SECRET } from "../config";

export const authMiddleware = async (
	req: RequestWithUser,
	res: Response,
	next: NextFunction
) => {
	try {
		const authorization =
			req.cookies["Authorization"] ||
			(req.headers.authorization
				? req.headers.authorization?.split(" ")[1]
				: null);

		if (!authorization) {
			throw new HTTPException(
				StatusCodes.UNAUTHORIZED,
				"Authentication missing"
			);
		}
		const payload = (await jwt.verify(
			authorization,
			JWT_SECRET!
		)) as DataStoreInJWT;

		const user: IUser | null = await UserModel.findById(payload?._id);

		if (!user) {
			next(
				new HTTPException(
					StatusCodes.UNAUTHORIZED,
					"Wrong Authentication token"
				)
			);
		}
		req.user = user as IUser;
		next();
	} catch (error) {
		throw new HTTPException(
			StatusCodes.UNAUTHORIZED,
			"Wrong Authentication token"
		);
	}
};
