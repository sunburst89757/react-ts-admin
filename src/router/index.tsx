import { useRoutes } from "react-router-dom";
import { myRoutes } from "./config";

export function MyRoutes() {
  const routes = useRoutes(myRoutes);

  return <div style={{ height: "100vh" }}>{routes}</div>;
}
