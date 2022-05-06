import { useRoutes } from "react-router-dom";
import { testRoutes } from "./config";

export function MyRoutes() {
  const routes = useRoutes(testRoutes);

  return <div style={{ height: "100vh" }}>{routes}</div>;
}
