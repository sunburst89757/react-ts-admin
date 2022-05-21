import "./App.scss";
import { AliveScope } from "react-activation";
import { MyRoutes } from "./router";

function App() {
  return (
    <AliveScope>
      <MyRoutes></MyRoutes>
    </AliveScope>
  );
}

export default App;
