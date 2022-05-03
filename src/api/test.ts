import { myRequest } from "../service";

export interface requestParams {
  username: string;
  password: string;
}
interface Res {
  token: string;
  nickName: string;
  userId: number;
}
export function login(params: requestParams) {
  return myRequest<requestParams, Res>({
    url: "/login/login",
    params,
    method: "post"
  });
}
