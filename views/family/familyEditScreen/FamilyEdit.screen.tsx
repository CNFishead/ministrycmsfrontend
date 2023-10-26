import getFamilyAction from "@/redux/actions/family/getFamily.action";
import { RootState } from "@/redux/store";
import { Avatar, Button, Card, Col, Form, Input, Modal, Row, Tooltip } from "antd";
import { useRouter } from "next/router";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "./FamilyEdit.module.scss";
import { FaEdit, FaTimes, FaUsers } from "react-icons/fa";
import FloatingActionButton from "@/components/floatingActionButton/FloatingActionButton.component";
import MemberType from "@/types/MemberType";
import { BsPlus } from "react-icons/bs";
import { SettingFilled } from "@ant-design/icons";
import AddMemberModal from "./modal/AddMemberModal.modal";
import getMembers from "@/redux/reducers/member/getMembers";
import UserItem from "@/components/userItem/UserItem.component";
import removeFamilyMember from "@/redux/actions/family/removeFamilyMember";

interface FamilyEditProps {
  id: string;
}

/**
 * @description - FamilyEditScreen component, renders the family edit screen, this is the screen that is shown when a user clicks on a family item
 * @returns {JSX.Element} - FamilyEditScreen
 */
const FamilyEdit = (props: FamilyEditProps) => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const [openModal, setOpenModal] = React.useState(false);
  const [actionButtons, setActionButtons] = React.useState([
    {
      tooltip: "Add Member",
      color: "#1890ff",
      icon: <BsPlus />,
      action: () => setOpenModal(true),
    },
    {
      tooltip: "Delete Family",
      color: "#ff4d4f",
      icon: <FaEdit />,
      action: () => console.log("delete family"),
    },
  ]);
  const { user: loggedInUser } = useSelector((state: RootState) => state.auth);
  const {
    selectedFamily: { family },
    updateFamily: { success: updateSuccess },
  } = useSelector((state: RootState) => state.family);
  const {
    selectedMinistry: { ministry },
    mainMinistry: { ministry: mainMinistry },
  } = useSelector((state: RootState) => state.ministry);
  const {
    membersList: { members, loading },
  } = useSelector((state: RootState) => state.member);

  React.useEffect(() => {
    if (!loggedInUser) return;
    if (!family || family._id !== props.id || updateSuccess) {
      dispatch(getFamilyAction(props.id) as any);
    }
    form.setFieldsValue({
      name: family?.name,
    });
  }, [props.id, family, loggedInUser, updateSuccess, dispatch]);

  return (
    <Row className={styles.container} justify={"space-between"}>
      <AddMemberModal
        open={openModal}
        onClose={() => setOpenModal(false)}
        ministryId={ministry?._id ?? mainMinistry?._id}
        members={members}
        loading={loading}
        dispatch={dispatch}
      />
      <FloatingActionButton buttons={actionButtons} icon={<SettingFilled />} />
      <Col className={styles.formContainer} span={19}>
        <div className={styles.detailsContainer}>
          <div className={styles.nameContainer}>
            <p className={styles.name}>
              You are viewing information for the <span>{family?.name}</span> family
            </p>
          </div>
        </div>
        <Form form={form} layout={"vertical"}>
          <Col span={4}>
            <Form.Item name="name">
              <Input addonBefore="Family Name" className={styles.nameInput} />
            </Form.Item>
          </Col>
        </Form>
      </Col>
      <Col span={5} className={styles.familyMemberContainer}>
        {/* add members button, creates a modal popup that allows searching of different members */}

        {family?.members.map((member: MemberType) => {
          return (
            <Card bodyStyle={{ width: "100%", padding: "5%" }} key={member._id} className={styles.familyMember} hoverable>
              <div className={styles.familyMemberDetailsContainer}>
                <Avatar size={32} src={member.profileImageUrl} className={styles.profileImage} />
                <p className={styles.familyMemberName}> {member.fullName}</p>
                <div className={styles.actionContainer}>
                  <Button
                    type="ghost"
                    className={styles.actionButton}
                    onClick={() =>
                      Modal.confirm({
                        title: "Remove Member",
                        content: `Are you sure you want to remove ${member.fullName} from the family?`,
                        onOk: () => {
                          dispatch(removeFamilyMember(family?._id, member._id) as any);
                          dispatch(getFamilyAction(family?._id) as any);
                        },
                      })
                    }
                  >
                    <Tooltip title="Remove Member">
                      <FaTimes className={styles.deleteIcon} />
                    </Tooltip>
                  </Button>
                </div>
              </div>
            </Card>
          );
        })}
      </Col>
    </Row>
  );
};

export default FamilyEdit;
