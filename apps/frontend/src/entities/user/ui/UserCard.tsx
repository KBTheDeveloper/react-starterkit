// entities/user/ui/UserCard.tsx

import { Card, Typography, Space } from 'antd';
import { UserOutlined, MailOutlined } from '@ant-design/icons';
import type { User } from '../model/userTypes';

const { Text, Title } = Typography;

interface UserCardProps {
    user: User;
    actions?: React.ReactNode[];
    size?: 'small' | 'default';
}

export const UserCard = ({ user, actions, size = 'default' }: UserCardProps) => {
    return (
        <Card size={size} actions={actions}>
            <Space direction="vertical" size="small" style={{ width: '100%' }}>
                <Title level={size === 'small' ? 5 : 4}>
                    <UserOutlined /> {user.name}
                </Title>
                <Text type="secondary">
                    <MailOutlined /> {user.email}
                </Text>
            </Space>
        </Card>
    );
};
