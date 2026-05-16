import { Button, FormInstance } from "antd";
import { t } from 'i18next'
import useAddUser from "../model/useAddUser";
import { FC } from "react";
import { message } from "antd/lib";

const AddUser: FC<{ form: FormInstance<any> }> = ({ form }) => {
    const { isCreating, createUser } = useAddUser();
    const onSubmit = (values: { name: string; email: string }) => {
        console.log(values)
        createUser(values, {
            onSuccess: () => {
                message.success(t('user_added'));
                form.resetFields();
            },
            onError: (err: any) => {
                message.error(err.response?.data?.error || t('error'));
            },
        });
    };

    return <Button type="primary" htmlType="button" onClick={() => onSubmit(form.getFieldsValue())} loading={isCreating}>
        {t('add_user')}
    </Button>

}

export default AddUser;
