import { lazy, Suspense, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { useAppSelector } from "../../store/types";
import { cache } from "../../utils/localStorage";
interface PropType {
  children?: JSX.Element;
  to?: string;
  path?: string;
}
// path是文件夹的路径
export function LazyLoad({ path }: PropType) {
  const Component = lazy(() => import(`../../pages/${path}`));
  return (
    <Suspense fallback={<>加载中……</>}>
      <Component></Component>
    </Suspense>
  );
}
export function Redirect({ to }: PropType) {
  return <Navigate to={to!}></Navigate>;
}
export function AuthComponent({
  children,
  role
}: {
  children: JSX.Element;
  role?: string[];
}) {
  const userInfo = useAppSelector((state) => state.user.userInfo);
  // 验证是否登录（刷新）
  const authLogin = () => {
    const token = cache.getItem("token");
    if (!token) {
      return false;
      // } else {
      //   if (!userInfo.role) {
      //     // 说明没有获取用户的角色，第一次登录需要获取用户信息
      //     dispatch(getUserInfoAction());
      //   }
    }
    // 不用考虑刷新，因为role已经数据持久化了刷新不会丢失
    return true;
  };
  // 验证权限路由
  const authRoute = () => {
    if (!role || userInfo.role === "super-admin") {
      return true;
    } else {
      return role.includes(userInfo.role);
    }
  };
  return (
    <div>
      {authLogin() ? (
        authRoute() ? (
          children
        ) : (
          <Redirect to="/404"></Redirect>
        )
      ) : (
        <Redirect to="/login"></Redirect>
      )}
    </div>
  );
}
// path是文件夹的路径
export function RouteComponent({
  path,
  role,
  title
}: {
  path: string;
  role?: string[];
  title: string;
}) {
  useEffect(() => {
    document.title = title;
  });
  return (
    <>
      <AuthComponent role={role}>
        <LazyLoad path={path}></LazyLoad>
      </AuthComponent>
    </>
  );
}
