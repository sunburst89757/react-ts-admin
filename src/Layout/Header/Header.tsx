import { Layout, Button } from "antd";
import { useNavigate } from "react-router-dom";
import { logout } from "../../api/user";
import { useResetState } from "../../hooks/useResettState";
import { cache } from "../../utils/localStorage";
export function MyHeader() {
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
    <Header>
      <Button type="primary" onClick={handleLogout}>
        退出登录
      </Button>
    </Header>
  );
}
