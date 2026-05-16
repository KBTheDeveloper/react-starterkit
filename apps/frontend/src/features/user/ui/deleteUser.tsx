import { Button } from "antd";
import { t } from 'i18next'
import useDeleteUser from "../model/useDeleteUser";
import { DeleteOutlined } from '@ant-design/icons'

import { FC } from "react";
import { Tooltip } from "antd/lib";

const DeleteUser: FC<{ id: number }> = ({ id }) => {
    const { handleDeleteAccount } = useDeleteUser(id)

    return <Tooltip title={
        t('delete_user')
    }>
        <Button icon={<DeleteOutlined />} shape="round" onClick={() => handleDeleteAccount()} />
    </Tooltip>
}

export default DeleteUser;