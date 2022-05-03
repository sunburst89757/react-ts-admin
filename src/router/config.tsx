import { RouteObject } from "react-router-dom";
import { Child } from "../pages/Child";
import { Layout } from "../pages/Layout";
import { Login } from "../pages/Login";

export const testRoutes: RouteObject[] = [
  {
    element: <Login />,
    path: "/login"
  },
  {
    element: <Layout></Layout>,

    path: "/",
    children: [
      {
        element: <Child></Child>,
        path: "/child"
      }
    ]
  }
];
