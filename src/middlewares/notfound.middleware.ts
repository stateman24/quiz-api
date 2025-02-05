import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";

export const notFoundError = (
	error: Error,
	req: Request,
	res: Response,
	next: NextFunction
) => {
	res.status(StatusCodes.NOT_FOUND).send(`Route ${req.path} not found`);
};
