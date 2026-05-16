
import { Button, Form, Input, Card } from 'antd';
import useSendEmail from '../model/useSendEmail';

export const EmailSender = () => {
    const { loading, onFinish } = useSendEmail();

    return (
        <Card title="Send Test Email">
            <Form onFinish={onFinish} layout="vertical">
                <Form.Item name="to" label="To" rules={[{ required: true, type: 'email' }]}>
                    <Input placeholder="recipient@example.com" />
                </Form.Item>
                <Form.Item name="subject" label="Subject" rules={[{ required: true }]}>
                    <Input />
                </Form.Item>
                <Form.Item name="message" label="Message" rules={[{ required: true }]}>
                    <Input.TextArea rows={4} />
                </Form.Item>
                <Button type="primary" htmlType="submit" loading={loading}>
                    Send Email
                </Button>
            </Form>
        </Card>
    );
};
