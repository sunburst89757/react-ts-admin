import { Layout, Menu, MenuProps } from "antd";
import { AppstoreOutlined } from "@ant-design/icons";
import { MyRouteObject, ContanceRoutes } from "../../router/config";
import { useNavigate } from "react-router-dom";
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
    // 不是菜单栏直接隐藏
    if (route.meta?.hidden) {
      return null;
    } else {
      if (route.children && route.children.length > 0) {
        // 首页的特殊处理
        if (route.path === "/") {
          return getItem(
            route.children[0].meta?.title,
            route.children[0].path!,
            <AppstoreOutlined></AppstoreOutlined>
          );
        }
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
    }
  });
};
const generateMenuItem = (routes: MyRouteObject[]) => {
  return routeCallBack(routes);
};
export function MySider() {
  const navigate = useNavigate();
  const { Sider } = Layout;
  const onClick: MenuProps["onClick"] = (e) => {
    let path = e.keyPath.reverse().join("/");
    path === "dashboard" ? (path = "/dashboard") : (path = path);
    navigate(path);
  };
  return (
    <Sider>
      <Menu
        onClick={onClick}
        style={{ width: "100%", height: "100%" }}
        defaultSelectedKeys={["1"]}
        defaultOpenKeys={["sub1"]}
        mode="inline"
        items={generateMenuItem(ContanceRoutes)}
      />
    </Sider>
  );
}
