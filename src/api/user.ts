import { myRequest } from "../service";

export interface requestParams {
  username: string;
  password: string;
}
export interface Res {
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
// 当前项目后端没有这个接口这里随便做一个，满足流程
export function getUserInfo(roleId: number) {
  return myRequest<number>({
    url: "/system/role/getMenuVosByRoleId",
    params: { roleId },
    method: "get"
  });
}
