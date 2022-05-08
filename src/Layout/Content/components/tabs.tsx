import { Tabs } from "antd";
import { useLocation } from "react-router-dom";
import { useAppSelector } from "../../../store/types";
const { TabPane } = Tabs;
export function MyTabs() {
  const location = useLocation();
  console.log(location);
  const tabs = useAppSelector((state) => state.tabs.tabs);
  const tabActive = useAppSelector((state) => state.tabs.activeTab);
  const onChange = (activeKey: string) => {
    console.log(activeKey);
  };
  const onTabClick = (activeKey: string) => {
    console.log(activeKey);
  };
  return (
    <Tabs
      type="editable-card"
      onChange={onChange}
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
