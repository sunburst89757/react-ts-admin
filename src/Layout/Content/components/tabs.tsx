import { Tabs } from "antd";
import { useNavigate } from "react-router-dom";
import { changeTabActive } from "../../../store/module/tabs";
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
  return (
    <Tabs
      type="editable-card"
      activeKey={tabActive}
      defaultActiveKey={"/dashboard"}
      hideAdd
      onTabClick={onTabClick}
    >
      {tabs.map((pane) => (
        <TabPane tab={pane.title} key={pane.key}></TabPane>
      ))}
    </Tabs>
  );
}
