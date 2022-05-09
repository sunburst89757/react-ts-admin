import { Tabs } from "antd";
import { useNavigate } from "react-router-dom";
import { changeTabActive, removeTab } from "../../../store/module/tabs";
import { useAppDispatch, useAppSelector } from "../../../store/types";
const { TabPane } = Tabs;
export function MyTabs() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
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
    navigate(tabActive);
  };
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
