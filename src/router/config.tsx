import { RouteObject } from "react-router-dom";
import MyLayout from "../Layout";
import { Login } from "../pages/Login";
import {
  AuthComponent,
  LazyLoad,
  Redirect,
  RouteComponent
} from "./components/lazyLoad";
interface MetaObj {
  hidden?: boolean;
  role?: string;
  title: string;
}
export interface MyRouteObject extends RouteObject {
  meta?: MetaObj;
  children?: MyRouteObject[];
}
export const asyncRoutes: MyRouteObject[] = [
  {
    path: "/salesManage",
    element: <MyLayout></MyLayout>,
    meta: {
      title: "销售管理"
    },
    children: [
      {
        index: true,
        path: "customerManage",
        element: (
          <RouteComponent path="SalesManage/CustomerManage"></RouteComponent>
        ),
        meta: {
          title: "顾客管理"
        }
      },
      {
        path: "productManage",
        element: (
          <RouteComponent path="SalesManage/ProductManage"></RouteComponent>
        ),
        meta: {
          title: "销售管理"
        }
      }
    ]
  }
];
export const ContanceRoutes: MyRouteObject[] = [
  {
    element: <Login />,
    path: "/login",
    meta: {
      title: "登录界面",
      hidden: true
    }
  },
  {
    path: "/",
    element: (
      <AuthComponent>
        <MyLayout></MyLayout>
      </AuthComponent>
    ),
    children: [
      {
        index: true,
        path: "dashboard",
        element: <RouteComponent path="Dashboard"></RouteComponent>,
        meta: {
          title: "首页"
        }
      }
    ]
  },
  {
    path: "/404",
    element: <LazyLoad path="NotFound"></LazyLoad>,
    meta: {
      title: "404",
      hidden: true
    }
  },
  {
    path: "*",
    element: <Redirect to="/404"></Redirect>,
    meta: {
      title: "404",
      hidden: true
    }
  },
  ...asyncRoutes
];
