import { Request, Response } from "express";
import { UserList } from "../constants/user.constant"




class UserController {
  public async userDataFunc(request: Request, response: Response) {
    try {
      console.log(request.params)
      const id: any = request.params.id
      if (isNaN(id)) {
        return response
          .status(400)
          .json({ message: "Id Must be Number" });
      }
      console.log(UserList)
      const userData = UserList.filter(uItem => uItem.id === Number(id))
      return response.status(200).json({ data: userData });
    } catch (error) {
      return response
        .status(400)
        .json({ message: "There is some error. Please try again." });
    }
  }

}

export default new UserController();
