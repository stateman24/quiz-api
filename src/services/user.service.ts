import { StatusCodes } from "http-status-codes";
import HTTPException from "../exceptions/http.exception";
import { IUser } from "../interfaces/user.interface";
import UserModel from "../models/user.model";
import { isEmpty } from "../utils/util";


class UserService {
  private userModel = UserModel;
  public updateUser = async(userData: IUser, id:string) =>{
    if(isEmpty(userData)){
      throw new HTTPException(StatusCodes.BAD_REQUEST, "Provide a field");
    }
    const user = await UserModel.findByIdAndUpdate(id, userData)
    if(!user){
      throw new HTTPException(StatusCodes.NOT_FOUND, "User does not exist")
    }
    return user
  }
}

export default UserService
