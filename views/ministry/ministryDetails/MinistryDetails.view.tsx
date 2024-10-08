import React from "react";
import styles from "./MinistryDetails.module.scss";
import formStyles from "@/styles/Form.module.scss";
import { useRouter } from "next/router";
import { Form, Button, Select, Input, Divider, Row, Empty } from "antd";
import { useQueryClient } from "@tanstack/react-query";
import selectableMinistryTypes from "@/data/selectableMinistryTypes";
import useFetchData from "@/state/useFetchData";
import usePostData from "@/state/usePostData";
import UserItem from "@/components/userItem/UserItem.component";
import PhotoUpload from "@/components/photoUpload/PhotoUpload.component";
import MemberType from "@/types/MemberType";
import { useSearchStore } from "@/state/search/search";
import useUpdateData from "@/state/useUpdateData";
import { useUser } from "@/state/auth";

const MinistryDetails = () => {
  const [form] = Form.useForm();
  const router = useRouter();
  const { id } = router.query;
  const queryClient = useQueryClient();
  const [leaderSearch, setLeaderSearch] = React.useState("");
  const selectableOptions = selectableMinistryTypes();
  const { data: loggedInUser } = useUser();

  const { data: selectedProfile } = useFetchData({
    url: `/ministry/${loggedInUser.user?.ministry?._id}`,
    key: "selectedProfile",
    enabled: !!loggedInUser?.user?.ministry?._id,
  });

  const { setSearch } = useSearchStore();
  const { data: membersListData, isLoading: loading } = useFetchData({
    url: `/member/${selectedProfile?.ministry?._id}`,
    key: "membersList",
    enabled: !!selectedProfile?.ministry?._id,
  });

  const { data: ministryData } = useFetchData({
    url: `/ministry/${id}`,
    key: "ministry",
    enabled: !!id,
  });

  const { mutate: createNewMinistry } = usePostData({
    successMessage: "Ministry created successfully",
    queriesToInvalidate: ["ministryList", "ministry", "membersList"],
    url: `/ministry/${selectedProfile?.ministry?._id}`,
    key: "ministryCreate",
  });
  const { mutate: updateMinistry } = useUpdateData({
    successMessage: "Ministry updated successfully",
    queriesToInvalidate: ["ministryList", "ministry", "membersList"],
  });
  const onFinish = (values: any) => {
    if (id) {
      updateMinistry({ url: `/ministry/${id}`, formData: { ...values, _id: id } });
      return;
    }
    createNewMinistry({ url: `/ministry/${selectedProfile?.ministry?._id}`, formData: values });
    form.resetFields();
  };

  React.useEffect(() => {
    if (id) {
      form.setFieldsValue(ministryData?.ministry);
    }
  }, [ministryData]);

  React.useEffect(() => {
    if (leaderSearch !== "") setSearch(leaderSearch);
    queryClient.invalidateQueries(["membersList"] as any);
  }, [leaderSearch]);

  React.useEffect(() => {
    return () => {
      setSearch("");
    };
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.leftContainer}>
        <Form
          form={form}
          layout="vertical"
          className={formStyles.form}
          onFinish={() => onFinish(form.getFieldsValue())}
          initialValues={{
            ministryImageUrl: "http://localhost:5000/images/default-ministry-banner.jpg",
            ministryType: "Small Group",
          }}
        >
          <div className={formStyles.group}>
            <div className={formStyles.editContainer}>
              <Divider orientation="left">Ministry Banner Image</Divider>
              <div className={styles.imageUploadContainer}>
                <div className={styles.imageContainer}>
                  <PhotoUpload
                    listType="picture-card"
                    isAvatar={false}
                    label=""
                    name="ministryImageUrl"
                    form={form}
                    action={`${process.env.API_URL}/upload`}
                    default={form.getFieldsValue().ministryImageUrl}
                  />
                </div>
              </div>
              <div className={styles.helperText}>
                <p>Upload a banner image for your ministry</p>
                <p>This will be used as an image placeholder when members sign-in</p>
              </div>
            </div>
          </div>

          <div className={formStyles.group}>
            <div className={formStyles.editContainer}>
              {ministryData && (
                <div className={styles.leaderInformation}>
                  <h3>Ministry Leader</h3>
                  <UserItem user={ministryData?.ministry?.leader as any} />
                </div>
              )}
              <Divider orientation="left">Ministry Details</Divider>
              {/* firstName and lastName should be on the same line */}
              <Form.Item name="name">
                <Input type="text" addonBefore="Ministry Name" className={formStyles.input} />
              </Form.Item>
              <Form.Item name="description" className={styles.inputParent}>
                <Input.TextArea rows={4} className={formStyles.input} placeholder="Ministry Bio/Mission" />
              </Form.Item>
              <Form.Item name="ministryType" className={styles.inputParent} label="Ministry Type">
                <Select
                  placeholder="Select Ministry Type"
                  className={formStyles.input}
                  defaultValue={form.getFieldsValue().ministryType}
                >
                  {selectableOptions.map((option) => (
                    <Select.Option key={option.value} value={option.value}>
                      {option.label}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>
              <Form.Item
                // name should be an object with the id and name of the leader
                name={["leader", "_id"]}
                className={styles.inputParent}
                label="Ministry Leader"
              >
                <Select
                  // onChange={() => console.log("changed")}
                  onSearch={(value) => {
                    setLeaderSearch(value);
                  }}
                  showSearch
                  placeholder="Select Ministry Leader"
                  className={formStyles.input}
                  value={form.getFieldsValue().leader?.fullName}
                  loading={loading}
                >
                  {membersListData?.members.map((member: MemberType) => (
                    <Select.Option key={member._id} value={member._id}>
                      {member.firstName} {member.lastName}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>
              <Row justify={"center"}>
                <Button
                  type="primary"
                  htmlType="submit"
                  className={formStyles.submitButton}
                  loading={loading}
                  disabled={loading}
                >
                  {id ? "Update Ministry" : "Create Ministry"}
                </Button>
              </Row>
            </div>
          </div>
        </Form>
      </div>
      <div className={styles.rightContainer}>
        <Divider orientation="left">Members</Divider>
        {ministryData?.ministry?.members.map((member: MemberType) => (
          <UserItem key={member._id} user={member} />
        ))}
        {ministryData?.ministry?.members.length === 0 ||
          (!ministryData && (
            <div className={styles.noMembers}>
              <Empty description="No Members" />
            </div>
          ))}
      </div>
    </div>
  );
};

export default MinistryDetails;
