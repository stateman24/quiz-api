import { StatusCodes } from "http-status-codes";
import HTTPException from "../exceptions/http.exception";
import { IUser } from "../interfaces/user.interface";
import UserModel from "../models/user.model";
import { isEmpty } from "../utils/util";
import { idText } from "typescript";


class UserService {
 private userModel = UserModel;
 public updateUser = async(userData: IUser, id:string) =>{
   const user = await UserModel.findByIdAndUpdate(id, userData)
   if(!user){
     throw new HTTPException(StatusCodes.NOT_FOUND, "User does not exist")
   }
   return user
 }
}

export default UserService
