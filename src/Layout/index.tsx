import { Layout } from "antd";
import { MySider } from "./Sider/Sider";
import { MyHeader } from "./Header/Header";
import { MyContent } from "./Content/Content";
import { useState } from "react";
import { Loading } from "../components/Loading";
import { useAppSelector } from "../store/types";
export default function MyLayout() {
  const [isCollapse, setisCollapse] = useState(false);
  const isLoading = useAppSelector((state) => state.user.loading);
  const toggle = () => {
    setisCollapse(!isCollapse);
  };
  return (
    <Loading tip={"Loading"} loading={isLoading}>
      <Layout style={{ height: "100vh" }}>
        <MyHeader isCollapse={isCollapse} onClick={toggle}></MyHeader>
        <Layout>
          <MySider isCollapse={isCollapse}></MySider>
          <MyContent></MyContent>
        </Layout>
      </Layout>
    </Loading>
  );
}
