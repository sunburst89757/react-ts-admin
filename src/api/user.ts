import { myRequest } from "../service";

export interface requestParams {
  username: string;
  password: string;
}
export interface Res {
  token: string;
  username: string;
  userId: number;
}
export function login(params: requestParams) {
  return myRequest<requestParams, Res>({
    url: "/user/login",
    params,
    method: "post"
  });
}
export function logout() {
  return myRequest({
    url: "/user/logout",
    method: "get"
  });
}

export function getAreaList() {
  return myRequest({
    url: "/area/list",
    method: "get"
  });
}
