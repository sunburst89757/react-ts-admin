import { Layout, Button, Dropdown, Space, Menu } from "antd";
import { MenuUnfoldOutlined, MenuFoldOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { logout } from "../../api/user";
import { useResetState } from "../../hooks/useResettState";
import { cache } from "../../utils/localStorage";
import style from "./Header.module.scss";
import { useAppSelector } from "../../store/types";
type propType = {
  isCollapse: Boolean;
  onClick: () => void;
};
export function MyHeader({ isCollapse, onClick }: propType) {
  const { Header } = Layout;
  const navigate = useNavigate();
  const username = useAppSelector((state) => state.user.userInfo.username);
  const reset = useResetState();
  const handleLogout = () => {
    logout().then(
      (res) => {
        cache.clear();
        navigate("/login");
        // 重置redux状态
        reset();
      },
      (err) => {
        console.log(err);
      }
    );
  };
  const onClickDrop = (menuInfo: any) => {
    const { key } = menuInfo;
    if (key === "0") {
      console.log(0);
    } else {
      handleLogout();
    }
  };

  const menu = (
    <Menu
      onClick={onClickDrop}
      items={[
        {
          label: "修改密码",
          key: "0"
        },
        {
          label: "退出登录",
          key: "1"
        }
      ]}
    />
  );
  return (
    <Header className={style.container}>
      <div className={style.leftBlock}>
        {isCollapse ? (
          <MenuUnfoldOutlined
            onClick={onClick}
            className={style.icon}
          ></MenuUnfoldOutlined>
        ) : (
          <MenuFoldOutlined
            onClick={onClick}
            className={style.icon}
          ></MenuFoldOutlined>
        )}
        <h2>XXX管理平台</h2>
      </div>
      <div className={style.rightBlock}>
        <div className={style.informBox}>
          <Button type="primary" block>
            通知详情
          </Button>
        </div>
        <Dropdown overlay={menu} trigger={["click"]} arrow>
          <a onClick={(e) => e.preventDefault()}>
            <Space className={style.userInfo}>{username}</Space>
          </a>
        </Dropdown>
      </div>
    </Header>
  );
}
