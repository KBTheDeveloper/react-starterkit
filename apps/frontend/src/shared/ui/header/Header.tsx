import { FC } from "react";

import { Avatar, Button, Space } from "antd";
import { Header } from "antd/es/layout/layout";
import Title from "antd/lib/typography/Title";
import { t } from "i18next";

import LanguageSwitcher from "@app/LanguageSwitcher";
import NotificationBell from "@features/notifications/ui/notificationBell";

import useHeader from "./model/useHeader";

const HeaderComponent: FC = () => {
  const { navigate, handleLogout, user } = useHeader();

  return (
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
  );
};

export default HeaderComponent;
