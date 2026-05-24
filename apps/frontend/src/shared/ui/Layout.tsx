import {
  Layout as AntLayout,
  Typography,
  Button,
  Space,
  Avatar,
  Menu,
  Flex,
} from "antd";
import { useUnit } from "effector-react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

import LanguageSwitcher from "@app/LanguageSwitcher";
import { NotificationBell } from "@features/notifications/ui/notificationBell";
import { $user, logoutFx } from "@shared/lib/effector/auth";
import items from "@shared/model/sidebar";

const { Header, Content } = AntLayout;
const { Title } = Typography;

const Layout = ({ children }: { children: React.ReactNode }) => {
  const user = useUnit($user);
  const logout = useUnit(logoutFx);
  const navigate = useNavigate();
  const { t } = useTranslation();

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  return (
    <AntLayout style={{ minHeight: "100vh" }}>
      <Header
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Title level={2} style={{ color: "white", margin: 0 }}>
          {t("app_title")}
        </Title>
        <Space size="large">
          <LanguageSwitcher />
          {user ? (
            <>
              <NotificationBell />
              <Avatar size="large">
                <span style={{ color: "white" }}>{user.name}</span>{" "}
              </Avatar>
              <Button type="primary" onClick={handleLogout}>
                {t("logout")}
              </Button>
            </>
          ) : (
            <Button
              type="primary"
              onClick={() => navigate("/login")}
              style={{ color: "white" }}
            >
              {t("login")}
            </Button>
          )}
        </Space>
      </Header>
      <Content style={{ padding: 24 }}>
        <Flex wrap gap={20} className="h-full">
          {user && (
            <Menu
              // onClick={onClick}
              style={{ width: 256 }}
              defaultSelectedKeys={["1"]}
              defaultOpenKeys={["sub1"]}
              mode="inline"
              items={items}
            />
          )}
          <Flex vertical flex="auto">
            {children}
          </Flex>
        </Flex>
      </Content>
    </AntLayout>
  );
};

export default Layout;
