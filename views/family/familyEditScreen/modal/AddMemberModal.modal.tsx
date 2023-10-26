import getMembers from "@/redux/actions/member/getMembers";
import { RootState } from "@/redux/store";
import MemberType from "@/types/MemberType";
import { Form, Input, Modal, Select } from "antd";
import React from "react";
import styles from "./AddMemberModal.module.scss";
import { Dispatch } from "redux";
import UserItem from "@/components/userItem/UserItem.component";
import { useSelector } from "react-redux";
import addFamilyMemberAction from "@/redux/actions/family/addFamilyMember.action";
import { GET_FAMILY_RESET } from "@/redux/constants/familyConstants";

interface AddMemberModalProps {
  open: boolean;
  dispatch: Dispatch;
  onClose: () => void;
  ministryId: string;
  members: MemberType[];
  loading?: boolean;
}
/**
 * @description - AddMemberModal component, renders a modal that allows a user to add a member to a family
 * @returns {JSX.Element} - AddMemberModal
 */
const AddMemberModal = (props: AddMemberModalProps) => {
  const [form] = Form.useForm();

  const {
    selectedFamily: { family },
  } = useSelector((state: RootState) => state.family);
  return (
    <Form
      form={form}
      onFinish={() => {
        props.dispatch(addFamilyMemberAction(family._id, form.getFieldsValue()) as any);
      }}
    >
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
        onOk={() => {
          // submit the form
          form.submit();
          // close the modal
          props.onClose();
        }}
      >
        <Form.Item
          label="Search"
          // for the form the name is members, which is an array of object id's
          name="members"
        >
          <Select
            placeholder="Search for a member"
            allowClear
            showSearch
            onSearch={(value) => {
              if (!value || value === "") return;
              props.dispatch(getMembers({ keyword: value.trim(), ministryId: props.ministryId, page: 1, limit: 10 }) as any);
            }}
            options={props.members?.map((member) => {
              // return the MemberItem as an option
              return {
                value: member._id,
                label: `${member.firstName} ${member.lastName}`,
              };
            })}
            filterOption={(input, option) =>
              (option?.label ?? "").toLowerCase().includes(input.toLowerCase()) &&
              // make sure the member is not already in the family
              !family.members.find((member: any) => member._id === option?.value)
            }
          />
        </Form.Item>
      </Modal>
    </Form>
  );
};

export default AddMemberModal;
