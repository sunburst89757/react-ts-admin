import { Tabs } from "antd";
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { changeTabActive, removeTab } from "../../../store/module/tabs";
import { useAppDispatch, useAppSelector } from "../../../store/types";
const { TabPane } = Tabs;
export function MyTabs() {
  console.log("组件渲染");
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const location = useLocation();
  const tabs = useAppSelector((state) => state.tabs.tabs);
  const tabActive = useAppSelector((state) => state.tabs.activeTab);
  const onTabClick = (activeKey: string) => {
    dispatch(changeTabActive(activeKey));
    navigate(activeKey);
  };
  const onDelete = (targetKey: any, action: any) => {
    console.log(targetKey);
    dispatch(removeTab(targetKey));
    // tabActive有问题，dispatch更新后的最新的tabActive并不能在这里使用
  };
  // 只用于删除tab的时候使用，相当于监视tabActive，迂回的解决但是会造成组件无用的多次渲染
  useEffect(() => {
    if (location.pathname !== tabActive) {
      console.log("zhixing");
      navigate(tabActive);
    }
  }, [tabActive, location.pathname, navigate]);
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
