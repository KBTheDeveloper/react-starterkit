import { Card } from 'antd';
import { FileManager } from '@features/profile/upload/ui/FileManager';

export const ProfilePage = () => {
    return (
        <Card title="My Files">
            <FileManager />
        </Card>
    );
};
