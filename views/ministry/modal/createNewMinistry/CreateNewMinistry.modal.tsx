import React from "react";
import styles from "./CreateNewMinistry.module.scss";
import { Button, Card, Form, Input, Modal, Select } from "antd";
import selectableMinistryTypes from "@/data/selectableMinistryTypes";
import UserItem from "@/components/userItem/UserItem.component";
import PhotoUpload from "@/components/photoUpload/PhotoUpload.component";
import { FaSave } from "react-icons/fa";
import Ministry from "@/types/Ministry";
import User from "@/types/User";
import useFetchData from "@/state/useFetchData";

interface Props {
  open: boolean;
}
const CreateNewMinistry = ({ open }: Props) => {
  const [form] = Form.useForm();
  const selectableOptions = selectableMinistryTypes();
  const onFinish = (values: any) => {
    console.log(values);
  };

  const { data: userData } = useFetchData({ url: "/users", key: "users" });

  return (
    <Modal className={styles.container} open={open} closeIcon={true}>
      <Card title="Create New Ministry" className={styles.container}>
        {form.getFieldsValue().leader && (
          <div className={styles.leaderInformation}>
            <h3>Ministry Leader</h3>
            <UserItem user={form.getFieldsValue().leader as any} />
          </div>
        )}
        <Form
          form={form}
          layout="vertical"
          className={styles.contentContainer}
          onFinish={() => onFinish(form.getFieldsValue())}
        >
          <div className={styles.imageUploadContainer}>
            <div className={styles.imageContainer}>
              <PhotoUpload
                listType="picture-card"
                isAvatar={false}
                label="Ministry Banner Image"
                name="ministryImageUrl"
                form={form}
                action={`${process.env.API_URL}/upload`}
                default={form.getFieldsValue().ministryImageUrl}
              />
            </div>
          </div>
          {/* firstName and lastName should be on the same line */}
          <Form.Item name="name" className={styles.inputParent}>
            <Input type="text" addonBefore="Ministry Name" className={styles.input} />
          </Form.Item>
          <Form.Item name="description" className={styles.inputParent}>
            <Input.TextArea rows={4} className={styles.input} placeholder="Ministry Bio/Mission" />
          </Form.Item>
          <Form.Item name="ministryType" className={styles.inputParent} label="Ministry Type">
            <Select
              placeholder="Select Ministry Type"
              className={styles.input}
              defaultValue={form.getFieldsValue().ministryType}
            >
              {selectableOptions.map((option) => (
                <Select.Option key={option.value} value={option.value}>
                  {option.label}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item name="leader" className={styles.inputParent} label="Ministry Leader">
            <Select
              onChange={() => console.log("changed")}
              onSearch={() => console.log("searched")}
              showSearch
              placeholder="Select Ministry Leader"
              className={styles.input}
              defaultValue={form.getFieldsValue().leader}
              options={userData?.users?.map((user: User) => ({
                label: `${user.firstName} ${user.lastName}`,
                value: user._id,
              }))}
            ></Select>
          </Form.Item>
        </Form>
      </Card>
    </Modal>
  );
};

export default CreateNewMinistry;
