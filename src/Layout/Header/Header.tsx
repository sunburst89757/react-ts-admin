import { Layout, Button } from "antd";
import { useNavigate } from "react-router-dom";
import { logout } from "../../api/user";
import { cache } from "../../utils/localStorage";
export function MyHeader() {
  const { Header } = Layout;
  const navigate = useNavigate();
  const handleLogout = () => {
    logout().then(
      (res) => {
        cache.clear();
        navigate("/login");
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
