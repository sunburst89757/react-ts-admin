import { useRequest } from "ahooks";
import { Button } from "antd";
import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { getAreaList } from "../../api/user";

export default function Dashboard() {
  const navigate = useNavigate();
  const handleNavigate = useCallback(() => {
    navigate("/salesManage/productManage");
    console.log("点击/salesManage/productManage");
  }, [navigate]);
  const { run: handle } = useRequest(() => getAreaList(), {
    manual: true,
    onSuccess: (res) => {
      console.log("成功数据", res);
    },
    onError: (err) => {
      console.log(err);
    },
    onBefore: () => {
      console.log("hhhhh");
    },
    onFinally: () => {
      console.log(111);
    }
  });

  return (
    <div>
      <Button onClick={handleNavigate}>测试路由权限</Button>
      <Button onClick={handle}>测试接口</Button>
    </div>
  );
}
