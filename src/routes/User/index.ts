import UserController from "../../controllers/User.Ctrl";


const userRoute: string = "/user";

export default [
  {
    path: userRoute + "/save/:id",
    method: "post",
    action: UserController.userDataFunc,
  }



]
