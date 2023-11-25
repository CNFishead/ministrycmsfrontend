import React from "react";
import styles from "./MinistryDetails.module.scss";
import { Button, Card, Form, Input, InputNumber, Result, Select, Skeleton } from "antd";
import User from "@/types/User";
import { FaSave } from "react-icons/fa";
import PhotoUpload from "@/components/photoUpload/PhotoUpload.component";
import Ministry from "@/types/Ministry";
import UserItem from "@/components/userItem/UserItem.component";
import Error from "@/components/error/Error.component";
import { MdError } from "react-icons/md";
import selectableMinistryTypes from "@/data/selectableMinistryTypes";

const MinistryDetails = () => {
  const selectableOptions = selectableMinistryTypes();
  const [form] = Form.useForm();
  // const dispatch = useDispatch();

  // const {
  //   mainMinistry: { ministry, loading, error },
  // } = useSelector((state: RootState) => state.ministry);

  // const { user: loggedInUser } = useSelector((state: RootState) => state.auth);

  React.useEffect(
    () => {
      // if (!loggedInUser) return;
      // if (!ministry) dispatch(getMinistry(loggedInUser.ministry._id) as any);
      // otherwise set form values
      // form.setFieldsValue({ ...ministry });
    },
    [
      // ministry
    ]
  );

  const onFinish = (values: any) => {
    // dispatch(updateMinistry(ministry._id, values, true) as any);
  };

  // if (loading)
  //   return (
  //     <Card title="Main Ministry Details" className={styles.container}>
  //       <Skeleton active />
  //     </Card>
  //   );
  // if (error)
  //   return (
  //     <Card title="Main Ministry Details" className={styles.container}>
  //       <Error error={error} />
  //     </Card>
  //   );
  return (
    <Card title="Main Ministry Details" className={styles.container}>
      <div className={styles.leaderInformation}>
        <h3>Ministry Leader</h3>
        {/* <UserItem user={ministry?.leader} /> */}
      </div>
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
              name="ministryImageUrl"
              form={form}
              action={`${process.env.API_URL}/upload`}
              // default={ministry?.ministryImageUrl}
            />
          </div>
        </div>
        {/* firstName and lastName should be on the same line */}
        <Form.Item name="name" className={styles.inputParent}>
          <Input type="text" placeholder="Ministry Name" addonBefore="Ministry Name" className={styles.input} />
        </Form.Item>
        <Form.Item name="description" className={styles.inputParent}>
          <Input.TextArea rows={4} className={styles.input} />
        </Form.Item>
        <Form.Item name="ministryType" className={styles.inputParent} label="Ministry Type">
          <Select
            placeholder="Select Ministry Type"
            className={styles.input}
            // defaultValue={ministry?.ministryType}
          >
            {selectableOptions.map((option) => (
              <Select.Option key={option.value} value={option.value}>
                {option.label}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
        <div className={styles.buttonContainer}>
          <Form.Item>
            <Button
              htmlType="submit"
              type="primary"
              className={styles.button}
              // loading={loading}
              icon={<FaSave />}
            >
              Save
            </Button>
          </Form.Item>
        </div>
      </Form>
    </Card>
  );
};

export default MinistryDetails;
