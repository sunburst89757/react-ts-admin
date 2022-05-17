import { Layout, Button } from "antd";
import { MenuUnfoldOutlined, MenuFoldOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { logout } from "../../api/user";
import { useResetState } from "../../hooks/useResettState";
import { cache } from "../../utils/localStorage";
import style from "./Header.module.scss";
type propType = {
  isCollapse: Boolean;
  onClick: () => void;
};
export function MyHeader({ isCollapse, onClick }: propType) {
  const { Header } = Layout;
  const navigate = useNavigate();
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
  return (
    <Header className={style.container}>
      {isCollapse ? (
        <MenuFoldOutlined onClick={onClick}></MenuFoldOutlined>
      ) : (
        <MenuUnfoldOutlined onClick={onClick}></MenuUnfoldOutlined>
      )}
      <Button type="primary" onClick={handleLogout}>
        退出登录
      </Button>
    </Header>
  );
}
