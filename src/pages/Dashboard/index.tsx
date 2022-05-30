import { Button } from "antd";
import { useCallback } from "react";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const navigate = useNavigate();
  const handleNavigate = useCallback(() => {
    navigate("/salesManage/productManage");
    console.log("点击/salesManage/productManage");
  }, [navigate]);
  return (
    <div>
      <Button onClick={handleNavigate}>测试路由权限</Button>
    </div>
  );
}
