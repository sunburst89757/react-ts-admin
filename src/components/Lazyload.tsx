import React from "react";
import { Navigate } from "react-router-dom";
interface PropType {
  children: JSX.Element;
}
// 懒加载组件
export const Lazyload = (path: string) => {
  const Comp = React.lazy(() => import("../pages/Test"));
  const namedImport = async () => {
    let { Child } = await import("../pages/Child");
    return Child;
  };
  return (
    <React.Suspense fallback={<>加载中……</>}>
      <Comp></Comp>
    </React.Suspense>
  );
};
// 路由拦截组件
export const AuthComponet = ({ children }: PropType) => {
  const isLogin = localStorage.getItem("token");
  return isLogin ? { children } : <Navigate to="/children"></Navigate>;
};
