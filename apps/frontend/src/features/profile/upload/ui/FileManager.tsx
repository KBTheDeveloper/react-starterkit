
import { Upload, Button, List, Spin, Popconfirm } from 'antd';
import { UploadOutlined, DeleteOutlined, FileOutlined } from '@ant-design/icons';
import useFileManager from '../model/useFileManager';



export const FileManager = () => {
    const { isLoading, files, handleUpload, uploadMutation, deleteMutation } = useFileManager()


    if (isLoading) return <Spin />;

    return (
        <div>
            <Upload beforeUpload={handleUpload} showUploadList={false}>
                <Button icon={<UploadOutlined />} loading={uploadMutation.isPending}>
                    Upload File
                </Button>
            </Upload>
            <List
                style={{ marginTop: 16 }}
                dataSource={files}
                renderItem={(file) => (
                    <List.Item
                        actions={[
                            <Popconfirm title="Delete this file?" onConfirm={() => deleteMutation.mutate(file.id)}>
                                <Button icon={<DeleteOutlined />} danger loading={deleteMutation.isPending} />
                            </Popconfirm>,
                        ]}
                    >
                        <List.Item.Meta
                            avatar={<FileOutlined />}
                            title={<a href={file.url} target="_blank" rel="noopener noreferrer">{file.originalName}</a>}
                            description={`${(file.size / 1024).toFixed(2)} KB`}
                        />
                    </List.Item>
                )}
            />
        </div>
    );
};
