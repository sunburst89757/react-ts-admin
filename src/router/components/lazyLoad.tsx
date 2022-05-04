import React from "react";
import { Navigate } from "react-router-dom";
import { getUserInfoAction } from "../../store/module/user";
import { useAppDispatch, useAppSelector } from "../../store/types";
import { cache } from "../../utils/localStorage";
interface PropType {
  children?: JSX.Element;
  to?: string;
  path?: string;
}
export function LazyLoad({ path }: PropType) {
  const Component = React.lazy(() => import(`../../pages/${path}`));
  return (
    <React.Suspense fallback={<>加载中……</>}>
      <Component></Component>
    </React.Suspense>
  );
}
function Redirect({ to }: PropType) {
  return <Navigate to={to!}></Navigate>;
}
export function AuthComponent({ children }: PropType) {
  const userInfo = useAppSelector((state) => state.user.userInfo);
  const dispatch = useAppDispatch();
  const auth = () => {
    const token = cache.getItem("token");
    if (!token) {
      return false;
    } else {
      if (!userInfo.role) {
        // 说明没有获取用户的角色，第一次登录需要获取用户信息
        console.log(":@@@@@@@@");
        dispatch(getUserInfoAction(userInfo.userId));
      }
      return true;
    }
  };
  return <div>{auth() ? children : <Redirect to="/login"></Redirect>}</div>;
}
