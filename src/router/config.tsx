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
  role?: string[];
  title: string;
}
export interface MyRouteObject extends RouteObject {
  meta?: MetaObj;
  children?: MyRouteObject[];
}
/* 
  配置说明
  菜单路由：siderRoutes：根据用户角色生成对应的菜单
  meta.role配置角色，没有这个属性的路由，表明全部都有这个菜单
  role是super-admin的拥有全部路由的访问权限
  meta.role = ["admin","editor"]：表明admin editor super-admin拥有这三个菜单的访问权限
*/
export const siderRoutes: MyRouteObject[] = [
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
        element: <RouteComponent path="Dashboard" />,
        meta: {
          title: "首页"
        }
      }
    ]
  },
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
        element: <RouteComponent path="SalesManage/CustomerManage" />,
        meta: {
          title: "顾客管理",
          role: ["admin"]
        }
      },
      {
        path: "productManage",
        element: <RouteComponent path="SalesManage/ProductManage" />,
        meta: {
          title: "产品管理"
        }
      }
    ]
  }
];
export const myRoutes: MyRouteObject[] = [
  {
    element: <Login />,
    path: "/login",
    meta: {
      title: "登录界面",
      hidden: true
    }
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
  ...siderRoutes
];
