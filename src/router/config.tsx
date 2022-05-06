import { RouteObject } from "react-router-dom";
import Child from "../pages/Child";
import Layout from "../Layout";
import { Login } from "../pages/Login";
import { AuthComponent, LazyLoad } from "./components/lazyLoad";
interface MetaObj {
  hidden?: boolean;
  role?: string;
  title: string;
}
export interface MyRouteObject extends RouteObject {
  meta?: MetaObj;
  children?: MyRouteObject[];
}
export const testRoutes: MyRouteObject[] = [
  {
    element: <Login />,
    path: "/login",
    meta: {
      title: "登录界面"
    }
  },
  {
    path: "/",
    element: (
      <AuthComponent>
        <Layout></Layout>
      </AuthComponent>
    ),
    meta: {
      title: "测试页面"
    },
    children: [
      {
        index: true,
        path: "/dashboard",
        element: (
          <AuthComponent>
            <LazyLoad path="Dashboard"></LazyLoad>
          </AuthComponent>
        ),
        meta: {
          title: "首页"
        }
      },
      {
        element: <Child></Child>,
        path: "/child",
        meta: {
          title: "孩子页面"
        }
      }
    ]
  }
];
