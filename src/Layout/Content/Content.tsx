import { Layout } from "antd";
import { Outlet } from "react-router-dom";
import { ReLoginModal } from "../../components/ReLoginModal";
import { MyTabs } from "./components/tabs";
import style from "./Content.module.scss";
export function MyContent() {
  const { Content } = Layout;
  return (
    <Content className={style.container}>
      <MyTabs></MyTabs>
      <ReLoginModal></ReLoginModal>
      <Outlet></Outlet>
    </Content>
  );
}
