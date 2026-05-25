import { Form, Input, Button, Card, message } from "antd";
import { useUnit } from "effector-react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

import { loginFx } from "@shared/lib/effector/auth";
import { extractApiErrorMessage } from "@shared/types/error";

const LoginPage = () => {
  const login = useUnit(loginFx);
  const navigate = useNavigate();
  const { t } = useTranslation();

  const onFinish = async (values: { email: string; password: string }) => {
    try {
      await login(values);
      message.success(t("login_success"));
      navigate("/");
    } catch (error: unknown) {
      message.error(extractApiErrorMessage(error, t("login_failed")));
    }
  };

  return (
    <Card title={t("login")} style={{ width: 400, margin: "100px auto" }}>
      <Form onFinish={onFinish} layout="vertical">
        <Form.Item
          name="email"
          label={t("email")}
          rules={[{ required: true, type: "email" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="password"
          label={t("password")}
          rules={[{ required: true, min: 6 }]}
        >
          <Input.Password />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" block>
            {t("login")}
          </Button>
        </Form.Item>
        <Button type="link" onClick={() => navigate("/register")} block>
          {t("no_account")}
        </Button>
      </Form>
    </Card>
  );
};

export default LoginPage;
