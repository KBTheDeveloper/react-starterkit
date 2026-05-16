import { Form, Input, Button, Card, message } from 'antd';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { useUnit } from 'effector-react';
import { loginFx } from '@shared/lib/effector/auth';

const LoginPage = () => {
    const login = useUnit(loginFx);
    const navigate = useNavigate();
    const { t } = useTranslation();

    const onFinish = async (values: { email: string; password: string }) => {
        try {
            await login(values);
            message.success(t('login_success'));
            navigate('/');
        } catch (error: any) {
            message.error(error.response?.data?.error || t('login_failed'));
        }
    };

    return (
        <Card title={t('login')} style={{ width: 400, margin: '100px auto' }}>
            <Form onFinish={onFinish} layout="vertical">
                <Form.Item name="email" label={t('email')} rules={[{ required: true, type: 'email' }]}>
                    <Input />
                </Form.Item>
                <Form.Item name="password" label={t('password')} rules={[{ required: true, min: 6 }]}>
                    <Input.Password />
                </Form.Item>
                <Form.Item>
                    <Button type="primary" htmlType="submit" block>{t('login')}</Button>
                </Form.Item>
                <Button type="link" onClick={() => navigate('/register')} block>
                    {t('no_account')}
                </Button>
            </Form>
        </Card>
    );
};


export default LoginPage;