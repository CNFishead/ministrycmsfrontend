import React from "react";
import styles from "./CreateNewMember.module.scss";
import { Button, Card, DatePicker, Divider, Form, Input, InputNumber, Modal, Radio, Select, Switch, Tooltip } from "antd";
import PhotoUpload from "@/components/photoUpload/PhotoUpload.component";
import { states } from "@/data/states";
import { countries } from "@/data/countries";
import { BiUserPlus } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import createMember from "@/redux/actions/member/createMember";

interface Props {
  open: boolean;
  loading: boolean;
  onClose: () => void;
}

const CreateNewMember = (props: Props) => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const {
    selectedMinistry: { ministry },
    mainMinistry: { ministry: mainMinistry },
  } = useSelector((state: RootState) => state.ministry);

  const onFinish = (values: any) => {
    // ministry, if their isnt a selectedMinistry, then use the mainMinistry
    const ministryId = ministry ? ministry._id : mainMinistry._id;
    dispatch(createMember({ ...values, ministry: ministryId }) as any);
    // close the modal
    props.onClose();
  };

  return (
    <Modal
      className={styles.container}
      open={props.open}
      closeIcon={true}
      onCancel={() => {
        form.resetFields();
        // close the modal
        props.onClose();
      }}
      // make the modal large
      width="50%"
      // remove the default ok and cancel buttons
      footer={
        <div className={styles.footer}>
          <div className={styles.buttonContainer}>
            <Button
              type="primary"
              icon={<BiUserPlus />}
              onClick={() => {
                form.submit();
              }}
              className={styles.button}
              loading={props.loading}
            >
              Create Member
            </Button>
          </div>
        </div>
      }
    >
      <Card title="Create New Member" headStyle={{ textAlign: "center" }}>
        <Form
          form={form}
          layout="vertical"
          className={styles.contentContainer}
          onFinish={() => onFinish(form.getFieldsValue())}
          initialValues={{
            // set the default values for the form
            sex: "male",
            maritalStatus: "single",
            country: "United States",
            state: "TN",
            role: "member",
            isActive: true,
          }}
        >
          <Divider orientation="center">
            <Tooltip title={`Easily identify Members from their profile photo!`}>Profile Photo</Tooltip>
          </Divider>
          <div className={styles.imageUploadContainer}>
            <div className={styles.imageContainer}>
              <PhotoUpload
                name="profileImageUrl"
                listType="picture-card"
                isAvatar={true}
                form={form}
                action={`${process.env.API_URL}/upload`}
                default={form.getFieldsValue().profileImageUrl}
                placeholder="Upload a profile photo"
              />
            </div>
          </div>
          <Divider orientation="center">Profile Information</Divider>
          {/* firstName and lastName should be on the same line */}
          <div className={styles.nameContainer}>
            <Form.Item name="firstName" className={styles.inputParent} rules={[{ required: true, message: "Please enter a first name" }]}>
              <Input type="text" placeholder="First Name" addonBefore="First Name" className={styles.input} />
            </Form.Item>
            <Form.Item name="lastName" className={styles.inputParent}>
              <Input type="text" placeholder="Last Name" addonBefore="Last Name" className={styles.input} />
            </Form.Item>
          </div>
          <div className={styles.nameContainer}>
            <Form.Item name="username" className={styles.inputParent}>
              <Input type="text" placeholder="Username" addonBefore="username" className={styles.input} />
            </Form.Item>
            <Form.Item name="birthday" className={styles.inputParent}>
              <DatePicker placeholder="Birthday" className={styles.input} />
            </Form.Item>
          </div>
          <div className={styles.nameContainer}>
            <Form.Item name="email" className={styles.inputParent}>
              <Input type="text" addonBefore="Email" className={styles.input} />
            </Form.Item>
            <Form.Item name="sex" className={styles.inputParent}>
              <Select placeholder="Sex/Gender" className={styles.input}>
                <Select.Option value="male">Male</Select.Option>
                <Select.Option value="female">Female</Select.Option>
              </Select>
            </Form.Item>
            <Form.Item name="phoneNumber" className={styles.inputParent}>
              <InputNumber
                style={{ width: "100%" }}
                className={styles.input}
                controls={false}
                formatter={(value: any) => {
                  const phoneNumber = value.replace(/[^\d]/g, "");
                  const phoneNumberLength = phoneNumber.length;
                  if (phoneNumberLength < 4) {
                    return phoneNumber;
                  } else if (phoneNumberLength < 7) {
                    return `${phoneNumber.slice(0, 3)}-${phoneNumber.slice(3)}`;
                  }
                  return `${phoneNumber.slice(0, 3)}-${phoneNumber.slice(3, 6)}-${phoneNumber.slice(6, 10)}`;
                }}
                parser={(value: any) => value.replace(/[^\d]/g, "")}
                placeholder="Enter Phone Number"
                addonBefore="Phone Number"
              />
            </Form.Item>
            <Form.Item name="maritalStatus" className={styles.inputParent}>
              <Select placeholder="Marital Status" className={styles.input}>
                <Select.Option value="single">Single</Select.Option>
                <Select.Option value="married">Married</Select.Option>
                <Select.Option value="divorced">Divorced</Select.Option>
                <Select.Option value="widowed">Widowed</Select.Option>
              </Select>
            </Form.Item>
          </div>
          <div className={styles.addressContainer}>
            {/* address information */}
            <Divider orientation="center">Address Information</Divider>
            <Form.Item name={["location", "address"]} className={styles.inputParent}>
              <Input type="text" placeholder="Address" addonBefore="Address" className={styles.input} />
            </Form.Item>
            <Form.Item name={["location", "city"]} className={styles.inputParent}>
              <Input type="text" placeholder="City" addonBefore="City" className={styles.input} />
            </Form.Item>
            <Form.Item name={["location", "state"]} className={styles.inputParent}>
              <Select
                placeholder="State"
                showSearch
                className={styles.input}
                filterOption={(input, option) => (option?.label ?? "").toLowerCase().includes(input.toLowerCase())}
                options={states.map((state) => ({ label: `${state.name} (${state.abbreviation})`, value: state.abbreviation }))}
                optionFilterProp="children"
              ></Select>
            </Form.Item>
            <Form.Item name={["location", "zipCode"]} className={styles.inputParent}>
              <Input type="text" placeholder="Zip Code" addonBefore="Zip Code" className={styles.input} />
            </Form.Item>
            <Form.Item name={["location", "country"]} className={styles.inputParent}>
              <Select
                placeholder="Country"
                showSearch
                className={styles.input}
                filterOption={(input, option) => (option?.label ?? "").toLowerCase().includes(input.toLowerCase())}
                options={countries.map((country) => ({ label: `${country}`, value: country }))}
                optionFilterProp="children"
                allowClear={true}
              ></Select>
            </Form.Item>
          </div>
          <Divider orientation="center">Membership Information</Divider>
          <div className={styles.nameContainer}>
            <Form.Item name="role" className={styles.inputParent}>
              <Select placeholder="Role" className={styles.input}>
                <Select.Option value="member">Member</Select.Option>
                <Select.Option value="leader">Leader</Select.Option>
                <Select.Option value="admin">Admin</Select.Option>
              </Select>
            </Form.Item>
            <Form.Item name="isActive" className={styles.inputParent + " " + styles.radioContainer}>
              <Radio.Group className={styles.radioGroup}>
                <Radio value={true}>Active</Radio>
                <Radio value={false}>Inactive</Radio>
              </Radio.Group>
            </Form.Item>
          </div>
        </Form>
      </Card>
    </Modal>
  );
};

export default CreateNewMember;
