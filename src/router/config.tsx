import { RouteObject } from "react-router-dom";
import Child from "../pages/Child";
import Layout from "../pages/Layout";
import { Login } from "../pages/Login";
import { AuthComponent, LazyLoad } from "./components/lazyLoad";

export const testRoutes: RouteObject[] = [
  {
    element: <Login />,
    path: "/login"
  },
  {
    path: "/",
    element: (
      <AuthComponent>
        <Layout></Layout>
      </AuthComponent>
    ),
    children: [
      {
        index: true,
        path: "/dashboard",
        element: (
          <AuthComponent>
            <LazyLoad path="Dashboard"></LazyLoad>
          </AuthComponent>
        )
      },
      {
        element: <Child></Child>,
        path: "/child"
      }
    ]
  }
];
