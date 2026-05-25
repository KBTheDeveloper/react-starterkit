import { BellOutlined } from "@ant-design/icons";
import { Badge, Dropdown, Button } from "antd";
import { useUnit } from "effector-react";

import { $notifications } from "../model/notificationModel";

const NotificationBell = () => {
  const notifications = useUnit($notifications);
  const menuItems = notifications.map((msg, idx) => ({ key: idx, label: msg }));

  return (
    <Dropdown
      menu={{ items: menuItems }}
      trigger={["click"]}
      placement="bottomRight"
    >
      <Badge count={notifications.length} size="small">
        <Button icon={<BellOutlined />} />
      </Badge>
    </Dropdown>
  );
};

export default NotificationBell;
