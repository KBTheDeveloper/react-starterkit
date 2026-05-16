import { Modal, message } from "antd";
import { t } from "i18next";
import { useDeleteUser as useDelete } from "../api/userApi";
import { $user as user } from "@shared/lib/effector/auth";
import { useNavigate } from "react-router-dom";
import { logoutFx as logout } from "@shared/lib/effector/auth";

const useDeleteUser = (id: number) => {
    const { mutate: deleteUser } = useDelete();
    const navigate = useNavigate();

    const handleDeleteAccount = () => {
        Modal.confirm({
            title: t('delete_account_title'),
            content: t('delete_account_confirm'),
            okText: t('delete'),
            okType: 'danger',
            cancelText: t('cancel'),
            onOk: async () => {
                if (!user) return;
                deleteUser(id, {
                    onSuccess: async () => {
                        message.success(t('account_deleted'));
                        await logout();
                        navigate('/login');
                    },
                    onError: (error: any) => {
                        message.error(error.response?.data?.error || t('delete_failed'));
                    },
                });
            },
        });
    };
    return {
        handleDeleteAccount
    }

}

export default useDeleteUser;
