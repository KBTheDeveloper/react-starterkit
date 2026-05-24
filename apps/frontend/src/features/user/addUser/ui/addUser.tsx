import { FC } from "react";

import { Button, FormInstance } from "antd";
import { message } from "antd/lib";
import { t } from "i18next";

import useAddUser from "../model/useAddUser.ts";

const AddUser: FC<{ form: FormInstance<never> }> = ({ form }) => {
  const { isCreating, createUser } = useAddUser();
  const onSubmit = (values: { name: string; email: string }) => {
    console.log(values);
    createUser(values, {
      onSuccess: () => {
        message.success(t("user_added"));
        form.resetFields();
      },
      onError: (err: unknown) => {
        message.error(err.response?.data?.error || t("error"));
      },
    });
  };

  return (
    <Button
      type="primary"
      htmlType="button"
      onClick={() => onSubmit(form.getFieldsValue())}
      loading={isCreating}
    >
      {t("add_user")}
    </Button>
  );
};

export default AddUser;
