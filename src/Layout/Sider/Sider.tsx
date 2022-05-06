import { Layout, Menu, MenuProps } from "antd";
import { AppstoreOutlined } from "@ant-design/icons";
import { MyRouteObject, testRoutes } from "../../router/config";
type MenuItem = Required<MenuProps>["items"][number];
function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[],
  type?: "group"
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
    type
  } as MenuItem;
}
const routeCallBack = (routes: MyRouteObject[]): MenuProps["items"] => {
  return routes.map((route) => {
    if (route.children && route.children.length > 0) {
      return getItem(
        route.meta?.title,
        route.path!,
        <AppstoreOutlined></AppstoreOutlined>,
        routeCallBack(route.children)
      );
    } else {
      return getItem(
        route.meta?.title,
        route.path!,
        <AppstoreOutlined></AppstoreOutlined>
      );
    }
  });
};
const generateMenuItem = (routes: MyRouteObject[]) => {
  return routeCallBack(routes);
};
export function MySider() {
  const { Sider } = Layout;
  const onClick: MenuProps["onClick"] = (e) => {
    console.log(e.keyPath.reverse().join(""));
  };
  return (
    <Sider>
      <Menu
        onClick={onClick}
        style={{ width: "100%", height: "100%" }}
        defaultSelectedKeys={["1"]}
        defaultOpenKeys={["sub1"]}
        mode="inline"
        items={generateMenuItem(testRoutes)}
      />
    </Sider>
  );
}
