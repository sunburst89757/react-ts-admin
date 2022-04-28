import { Button, Checkbox, Form, Input } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import style from "./Login.module.scss";
import { userType } from "./types";
export function Login() {
  const onFinish = () => {};
  const onFinishFailed = () => {};
  const [form] = Form.useForm<userType>();
  const handleClick = () => {
    console.log(form.getFieldValue("username"));
  };
  const changeValue = (val: string, val2: userType) => {
    console.log(val);
    console.log(val2);
  };
  return (
    <div className={style.loginContainer}>
      <div className={style.title}></div>
      <div className={style.middleBlock}>
        <div className={style.leftBlock}></div>
        <div className={style.rightBlock}>
          <div className={style.formTitle}>用户登录</div>
          <Form
            className={style.form}
            form={form}
            name="basic"
            labelCol={{ span: 4 }}
            wrapperCol={{ span: 20 }}
            initialValues={{ remember: true }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
            onValuesChange={changeValue}
          >
            <Form.Item
              label="用户名"
              name="username"
              rules={[{ required: true, message: "请输入用户名" }]}
            >
              <Input
                prefix={<UserOutlined className="site-form-item-icon" />}
                placeholder="Username"
              />
            </Form.Item>

            <Form.Item
              label="密码"
              name="password"
              rules={[{ required: true, message: "请输入密码" }]}
            >
              <Input
                prefix={<LockOutlined className="site-form-item-icon" />}
                type="password"
                placeholder="Password"
              />
            </Form.Item>

            <Form.Item
              name="remember"
              valuePropName="checked"
              wrapperCol={{ offset: 6, span: 16 }}
            >
              <Checkbox>记住密码</Checkbox>
            </Form.Item>

            <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
              <Button type="primary" htmlType="submit" onClick={handleClick}>
                登录
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
      <div className={style.copyright}>
        Copyright @ 2022 汉谷云智（武汉）科技有限公司
      </div>
    </div>
  );
}
