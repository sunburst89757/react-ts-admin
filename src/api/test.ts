import service from "../service";
interface requestParams {
  username: string;
  password: string;
}
export function login(params: requestParams) {
  return service.request({
    url: "/login/login",
    params,
    method: "post"
  });
}
