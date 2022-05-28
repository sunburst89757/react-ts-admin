import { useRoutes } from "react-router-dom";
import { myRouter } from "./config";

export function MyRoutes() {
  const routes = useRoutes(myRouter);

  return <div style={{ height: "100vh" }}>{routes}</div>;
}
