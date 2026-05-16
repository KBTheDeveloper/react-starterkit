import { Table, Button, Form, Input, Spin } from 'antd';
import { useTranslation } from 'react-i18next';
import { useUsers } from '@features/user/api/userApi';
import { columns } from '@entities/user/model/const';
// import AddUser from '@features/user/addUser/ui/addUser';

const UsersPage = () => {
    const { t } = useTranslation();
    const { data: users = [], isLoading, error } = useUsers();

    // const [form] = Form.useForm();

    if (isLoading) return <Spin size="large" />;
    if (error) return <div>Error: {error.message}</div>;


    return (
        <>
            <h2 className="mb-[20px]">{t('user_management')}</h2>
            {/* <Form form={form} layout="inline" style={{ marginBottom: 16 }}>
                <Form.Item name="name" rules={[{ required: true, message: t('name_required') }]}>
                    <Input placeholder={t('name')} />
                </Form.Item>
                <Form.Item name="email" rules={[{ required: true, type: 'email', message: t('email_invalid') }]}>
                    <Input placeholder={t('email')} />
                </Form.Item>
                <Form.Item name="email" rules={[{ required: true, type: 'string', message: t('password_invalid') }]}>
                    <Input placeholder={t('password')} />
                </Form.Item>
                <Form.Item>
                    <AddUser form={form} />
                </Form.Item>
            </Form> */}
            <Table dataSource={users} columns={columns} rowKey="id" />
        </>


    );
};

export default UsersPage;
