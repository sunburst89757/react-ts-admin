import { Layout } from "antd";
import { MySider } from "./Sider/Sider";
import { MyHeader } from "./Header/Header";
import { MyContent } from "./Content/Content";
import { useState } from "react";
export default function MyLayout() {
  const [isCollapse, setisCollapse] = useState(false);
  const toggle = () => {
    setisCollapse(!isCollapse);
  };
  return (
    <>
      <Layout style={{ height: "100vh" }}>
        <MySider isCollapse={isCollapse}></MySider>
        <Layout>
          <MyHeader isCollapse={isCollapse} onClick={toggle}></MyHeader>
          <MyContent></MyContent>
        </Layout>
      </Layout>
    </>
  );
}
