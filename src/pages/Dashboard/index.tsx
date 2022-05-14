import { Button } from "antd";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const navigate = useNavigate();
  const handleNavigate = () => {
    navigate("/salesManage/productManage");
    console.log("点击/salesManage/productManage");
  };
  return (
    <div>
      <Button onClick={handleNavigate}>测试路由权限</Button>
    </div>
  );
}
