import { Form, Input, Button, Card, message } from 'antd';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { useUnit } from 'effector-react';
import { registerFx } from '@shared/lib/effector/auth';
import { RegisterFormValues } from '../model/types';
import { useState } from 'react';
import { Captcha } from '@shared/ui/Captcha';
import { LockOutlined, MailOutlined, UserOutlined } from '@ant-design/icons';



const RegisterPage = () => {
    const register = useUnit(registerFx);
    const navigate = useNavigate();
    const { t } = useTranslation();
    const [form] = Form.useForm();
    const [captchaToken, setCaptchaToken] = useState<string | null>(null);

    const onFinish = async (values: RegisterFormValues) => {
        if (!captchaToken) {
            message.error(t('captcha_required'));
            return;
        }
        try {
            await register({
                name: values.name,
                email: values.email,
                password: values.password,
                captchaToken, // send token to backend
            });
            message.success(t('register_success'));
            navigate('/');
        } catch (error: any) {
            message.error(error.response?.data?.error || t('register_failed'));
            // reset captcha on failure
            setCaptchaToken(null);
            form.resetFields(['captcha']);
        }
    };

    const handleCaptchaChange = (token: string | null) => {
        setCaptchaToken(token);
    };


    return (
        <Card title={t('register')} style={{ maxWidth: 500, width: '100%', margin: '100px auto' }}>
            <Form
                form={form}
                onFinish={onFinish}
                layout="vertical"
                autoComplete="off"
            >
                <Form.Item
                    name="name"
                    rules={[{ required: true, message: t('name_required') }]}

                >
                    <Input size='large' placeholder={t('name')} prefix={<UserOutlined />} />
                </Form.Item>

                <Form.Item
                    name="email"
                    rules={[
                        { required: true, message: t('email_invalid') },
                        { type: 'email', message: t('email_invalid') },
                    ]}
                >
                    <Input size='large' placeholder={t('email')} prefix={<MailOutlined />} />
                </Form.Item>

                <Form.Item
                    name="password"
                    rules={[
                        { required: true, message: t('password_min') },
                        { min: 6, message: t('password_min') },
                    ]}
                >
                    <Input.Password size='large' prefix={<LockOutlined />} placeholder={t('password')} />
                </Form.Item>

                <Form.Item
                    name="confirmPassword"
                    dependencies={['password']}
                    rules={[
                        { required: true, message: t('passwords_match') },
                        ({ getFieldValue }) => ({
                            validator(_, value) {
                                if (!value || getFieldValue('password') === value) {
                                    return Promise.resolve();
                                }
                                return Promise.reject(new Error(t('passwords_match')));
                            },
                        }),
                    ]}
                >
                    <Input.Password size='large' placeholder={t('confirm_password')} prefix={<LockOutlined />} />
                </Form.Item>
                <Form.Item name="captcha">
                    <Captcha onChange={handleCaptchaChange} />
                </Form.Item>
                <Form.Item>
                    <Button type="primary" size='large' htmlType="submit" block>
                        {t('register')}
                    </Button>
                </Form.Item>

                <Button type="link" onClick={() => navigate('/login')} block>
                    {t('have_account')}
                </Button>
            </Form>
        </Card>
    );
};

export default RegisterPage;
