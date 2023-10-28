import React, { useEffect } from "react";
import styles from "./CreateFamilyModal.module.scss";
import { Button, Form, Input, Modal, Tooltip } from "antd";
import { FaQuestionCircle } from "react-icons/fa";
import { BiUserPlus } from "react-icons/bi";

interface CreateFamilyModalProps {
  open: boolean;
  onClose: () => void;
}

const CreateFamilyModal = (props: CreateFamilyModalProps) => {
  const [form] = Form.useForm();
  const onFinish = (values: any) => {
    // props.dispatch(createFamilyAction(values) as any);
  };

  return (
    <Modal
      title="Create Family"
      open={props.open}
      onCancel={props.onClose}
      className={styles.container}
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
              // loading={createLoading}
            >
              Create Family
            </Button>
          </div>
        </div>
      }
    >
      <div className={styles.contentContainer}>
        <div className={styles.formContainer}>
          <Form form={form} layout="vertical" onFinish={() => onFinish(form.getFieldsValue())}>
            <div className={styles.formInputContainer}>
              <Form.Item
                label={
                  <>
                    <span className={styles.inputLabelText}>Family Name</span>{" "}
                    <Tooltip title="The family name is the last name of the family">
                      <FaQuestionCircle className={styles.tooltipIcon} />
                    </Tooltip>
                  </>
                }
                name="name"
              >
                <Input type="text" placeholder="Name" className={`${styles.input} ${styles.addon}`} />
              </Form.Item>
            </div>
          </Form>
        </div>
      </div>
    </Modal>
  );
};

export default CreateFamilyModal;
