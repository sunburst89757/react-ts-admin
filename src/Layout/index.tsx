import { Outlet } from "react-router-dom";
import { ReLoginModal } from "../components/ReLoginModal";
import { logout } from "../api/user";

export default function Layout() {
  const logout1 = () => {
    console.log("dianji");
    logout().then(
      (res) => {
        console.log("tuichu");
      },
      (err) => {
        console.log(err);
      }
    );
  };
  return (
    <>
      Layout
      <button onClick={logout1}>退出登录</button>
      <ReLoginModal></ReLoginModal>
      <hr />
      <Outlet></Outlet>
    </>
  );
}
