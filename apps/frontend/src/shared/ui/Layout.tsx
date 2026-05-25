import { Layout as AntLayout, Flex, Menu } from "antd";
import { useUnit } from "effector-react";

import { $user } from "@shared/lib/effector/auth";
import items from "@shared/model/sidebar";

import Header from "./header";

const { Content } = AntLayout;

const Layout = ({ children }: { children: React.ReactNode }) => {
  const user = useUnit($user);

  return (
    <AntLayout style={{ minHeight: "100vh" }}>
      <Header />
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
