import { Layout } from "antd";
import { MySider } from "./Sider/Sider";
import { MyHeader } from "./Header/Header";
import { MyContent } from "./Content/Content";
export default function MyLayout() {
  return (
    <>
      <Layout style={{ height: "100vh" }}>
        <MySider></MySider>
        <Layout>
          <MyHeader></MyHeader>
          <MyContent></MyContent>
        </Layout>
      </Layout>
    </>
  );
}
