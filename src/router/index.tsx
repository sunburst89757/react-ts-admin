import { useRoutes } from "react-router-dom";
import { ContanceRoutes } from "./config";

export function MyRoutes() {
  const routes = useRoutes(ContanceRoutes);

  return <div style={{ height: "100vh" }}>{routes}</div>;
}
