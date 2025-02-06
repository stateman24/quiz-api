import { StatusCodes } from "http-status-codes";
import UserService from "../services/user.service";
import { Response, NextFunction } from "express";
import { RequestWithUser } from "../interfaces/auth.interface";

class UserController{
    private userService = new UserService()

    public updateUser = async(
      req: RequestWithUser,
      res: Response,
      next: NextFunction
    )=>{
      try {
       const id: string = req.params.id;
       const user = await this.userService.updateUser(req.body, id)
       res.status(StatusCodes.CREATED).json({"data": user})
      } catch (error) {
        next(error)    
      }
      
    }

}


export default UserController

