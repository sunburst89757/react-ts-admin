import "./App.scss";
import { Loading } from "./components/Loading";
import { MyRoutes } from "./router";

function App() {
  return (
    <Loading tip={"Loading"} loading={false} size={"large"}>
      <MyRoutes></MyRoutes>
    </Loading>
  );
}

export default App;
