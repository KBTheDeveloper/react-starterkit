import { ColumnProps } from "antd/lib/table";

import DeleteUser from "@features/user/ui/deleteUser";

import { User } from "..";

export const columns: ColumnProps[] = [
  { title: "id", dataIndex: "id", key: "id" },
  { title: "name", dataIndex: "name", key: "name" },
  { title: "email", dataIndex: "email", key: "email" },
  {
    title: "actions",
    dataIndex: "actions",
    align: "right",
    key: "actions",
    render: (_, record: User) => <DeleteUser id={record.id} />,
  },
];
