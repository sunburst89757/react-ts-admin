import { Layout, Menu, MenuProps } from "antd";
import _ from "lodash";
import { AppstoreOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../store/types";
import { MyRouteObject, myRoutes, siderRoutes } from "../../router/config";
import { addTab, changeTabActive, tabObject } from "../../store/module/tabs";
type MenuItem = Required<MenuProps>["items"][number];
// antd根据配置生成的菜单项
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
// 根据路由生成菜单
const generateMenuItem = (routes: MyRouteObject[]) => {
  return routeCallBack(routes);
};
// 根据角色生成可以访问的路由
function generateAccessRoutes(role: string, routes: MyRouteObject[]): void {
  if (role === "super-admin") {
    return;
  } else {
    const delIndexs: number[] = [];
    routes.forEach((route) => {
      if (!route?.meta?.role || route.meta?.role.includes(role)) {
        if (route.children && route.children.length > 0) {
          generateAccessRoutes(role, route.children);
        } else {
          return;
        }
      } else {
        const index = routes.findIndex((item) => item === route);
        delIndexs.push(index);
      }
    });
    delIndexs.forEach((val, index) => {
      // 只有第一个删除的元素位置是正确的，后面由于数组长度减少，因此对应的序号也要减一才可以
      index === 0 ? routes.splice(val, 1) : routes.splice(val - 1, 1);
    });
  }
}
//根据菜单的key找到对应的title
const findTitle = (path: string): void => {
  siderRoutes.forEach((route) => {
    if (route.children && route.children.length > 0) {
      route.children.forEach((childRoute) => {
        if (childRoute.path === path) {
          throw new Error(childRoute.meta?.title);
        }
      });
    } else {
      if (route.path === path) {
        throw new Error(route.meta?.title);
      }
    }
  });
};
// 点击菜单生成相应的tab
const generateTab = (path: string, key: string): tabObject => {
  const newTab: tabObject = {
    key: path,
    title: ""
  };
  try {
    findTitle(key);
  } catch (e: any) {
    newTab.title = e.message;
  }
  console.log(newTab, "生成的tab");

  return newTab;
};
// 判断新生成的tab是否在已有的tabs内部
const IsNewTabInTabs = (tabs: tabObject[], newTab: tabObject) => {
  return tabs.some((tab) => tab.key === newTab.key);
};
export function MySider() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const role = useAppSelector((state) => state.user.userInfo.role);
  const tabs = useAppSelector((state) => state.tabs.tabs);
  const menuActive = useAppSelector((state) => state.tabs.menuActive);
  const routes: MyRouteObject[] = _.cloneDeep(myRoutes);
  generateAccessRoutes(role, routes);
  const { Sider } = Layout;
  const onClick: MenuProps["onClick"] = (e) => {
    // keypath数组控制菜单选中谁
    console.log(e, "candan");
    let path = e.keyPath.reverse().join("/");
    path === "dashboard" ? (path = "/dashboard") : (path = path);
    const newTab = generateTab(path, e.key);
    if (IsNewTabInTabs(tabs, newTab)) {
      dispatch(changeTabActive(newTab.key));
    } else {
      dispatch(addTab(newTab));
    }
    navigate(path);
  };
  return (
    <Sider>
      <Menu
        onClick={onClick}
        style={{ width: "100%", height: "100%" }}
        defaultSelectedKeys={["dashboard"]}
        selectedKeys={menuActive}
        mode="inline"
        items={generateMenuItem(routes)}
        theme="dark"
      />
    </Sider>
  );
}
