import { Layout } from "antd";
import { Outlet } from "react-router-dom";
import { ReLoginModal } from "../../components/ReLoginModal";

export function MyContent() {
  const { Content } = Layout;

  return (
    <Content>
      <ReLoginModal></ReLoginModal>
      <Outlet></Outlet>Content
    </Content>
  );
}
