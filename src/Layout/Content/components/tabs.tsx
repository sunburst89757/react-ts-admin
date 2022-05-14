import { Tabs } from "antd";
import { useLocation, useNavigate, matchRoutes } from "react-router-dom";
import { useUpdateEffect } from "ahooks";
import { siderRoutes } from "../../../router/config";
import {
  addTab,
  changeTabActive,
  removeTab,
  tabObject
} from "../../../store/module/tabs";
import { useAppDispatch, useAppSelector } from "../../../store/types";
const { TabPane } = Tabs;
// 判断新生成的tab是否在已有的tabs内部
const IsNewTabInTabs = (tabs: tabObject[], newTab: tabObject) => {
  return tabs.some((tab) => tab.key === newTab.key);
};
export function MyTabs() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const location = useLocation();
  console.log("组件渲染77777", location);
  const tabs = useAppSelector((state) => state.tabs.tabs);
  const tabActive = useAppSelector((state) => state.tabs.activeTab);
  const onTabClick = (activeKey: string) => {
    dispatch(changeTabActive(activeKey));
    navigate(activeKey);
  };
  const onDelete = (targetKey: any, action: any) => {
    console.log(targetKey);
    dispatch(removeTab(targetKey));
    // tabActive有问题，dispatch更新后的最新的tabActive并不能在这里使用navigate跳转
  };
  // 监视删除的时候使用
  useUpdateEffect(() => {
    navigate(tabActive);
  }, [tabActive]);
  useUpdateEffect(() => {
    console.log("路由变化");
    const matchRoute = matchRoutes(siderRoutes, location.pathname)!;
    const newTab: tabObject = {
      key: matchRoute[matchRoute.length - 1].pathname,
      title: matchRoute[matchRoute.length - 1].route.meta!.title
    };
    if (IsNewTabInTabs(tabs, newTab)) {
      dispatch(changeTabActive(newTab.key));
    } else {
      console.log("zhixing", tabs);
      dispatch(addTab(newTab));
    }
  }, [location.pathname]);
  return (
    <Tabs
      type="editable-card"
      activeKey={tabActive}
      defaultActiveKey={"/dashboard"}
      hideAdd
      onTabClick={onTabClick}
      onEdit={onDelete}
    >
      {tabs.map((pane) => (
        <TabPane tab={pane.title} key={pane.key}></TabPane>
      ))}
    </Tabs>
  );
}
