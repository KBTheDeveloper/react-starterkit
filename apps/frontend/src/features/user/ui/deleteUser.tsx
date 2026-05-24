import { FC } from "react";

import { DeleteOutlined } from "@ant-design/icons";
import { Button } from "antd";
import { Tooltip } from "antd/lib";
import { t } from "i18next";

import useDeleteUser from "../model/useDeleteUser";

const DeleteUser: FC<{ id: number }> = ({ id }) => {
  const { handleDeleteAccount } = useDeleteUser(id);

  return (
    <Tooltip title={t("delete_user")}>
      <Button
        icon={<DeleteOutlined />}
        shape="round"
        onClick={() => handleDeleteAccount()}
      />
    </Tooltip>
  );
};

export default DeleteUser;
