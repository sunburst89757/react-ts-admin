import { RouteObject } from "react-router-dom";
import MyLayout from "../Layout";
import { Login } from "../pages/Login";
import {
  AuthComponent,
  LazyLoad,
  Redirect,
  RouteComponent
} from "./components/RouteComponents";

/* 
  配置说明
  菜单路由：siderRoutes：根据用户角色生成对应的菜单
  meta.role配置角色，没有这个属性的路由，表明全部都有这个菜单
  用户的role是super-admin的拥有全部路由的访问权限
  meta.role = ["admin","editor"]：表明admin editor super-admin拥有这三个菜单的访问权限
  meta.role配置的是菜单显示的路由，系统的权限路由依靠是element属性组件上传递的role来控制
  */
export const siderRoutes: RouteObject[] = [
  {
    path: "/",
    element: (
      <AuthComponent>
        <MyLayout></MyLayout>
      </AuthComponent>
    ),
    children: [
      {
        index: true,
        path: "dashboard",
        element: <RouteComponent path="Dashboard" title="首页" />,
        meta: {
          title: "首页"
        }
      }
    ]
  },
  {
    path: "/salesManage",
    element: <MyLayout></MyLayout>,
    meta: {
      title: "销售管理"
    },
    children: [
      {
        index: true,
        path: "customerManage",
        element: (
          // 只有admin和super-admin才可以访问这个页面
          <RouteComponent
            path="SalesManage/CustomerManage"
            role={["admin"]}
            title="顾客管理"
          />
        ),
        meta: {
          title: "顾客管理",
          role: ["admin"]
        }
      },
      {
        path: "productManage",
        element: (
          <RouteComponent path="SalesManage/ProductManage" title="产品管理" />
        ),
        meta: {
          title: "产品管理"
        }
      }
    ]
  },
  {
    path: "/purchaseManage",
    element: <MyLayout></MyLayout>,
    meta: {
      title: "采购管理"
    },
    children: [
      {
        index: true,
        path: "areaManage",
        element: (
          <RouteComponent
            path="PurchaseManage/AreaManage"
            title="区域管理"
          ></RouteComponent>
        ),
        meta: {
          title: " 区域管理"
        }
      },
      {
        path: "supplierManage",
        element: (
          <RouteComponent
            path="PurchaseManage/SupplierManage"
            title="供应商管理"
          ></RouteComponent>
        ),
        meta: {
          title: "供应商管理"
        }
      }
    ]
  },
  // 外部链接跳转github，这里的配置没什么意义
  {
    path: "/abc",
    element: <Redirect to="/404"></Redirect>,
    meta: {
      title: "Github"
    }
  }
];
export const myRoutes: RouteObject[] = [
  {
    element: <Login />,
    path: "/login",
    meta: {
      title: "登录界面",
      hidden: true
    }
  },
  {
    path: "/404",
    element: <LazyLoad path="NotFound"></LazyLoad>,
    meta: {
      title: "404",
      hidden: true
    }
  },
  {
    path: "*",
    element: <Redirect to="/404"></Redirect>,
    meta: {
      title: "404",
      hidden: true
    }
  },
  ...siderRoutes
];
