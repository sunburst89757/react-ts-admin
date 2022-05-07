import { Layout } from "antd";
import { Outlet } from "react-router-dom";
import { ReLoginModal } from "../../components/ReLoginModal";
import { MyTabs } from "./components/tabs";
export function MyContent() {
  const { Content } = Layout;

  return (
    <Content>
      <MyTabs></MyTabs>
      <ReLoginModal></ReLoginModal>
      <Outlet></Outlet>
    </Content>
  );
}
