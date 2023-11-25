import React from "react";
import styles from "./StaffPage.module.scss";
import SearchWrapper from "@/layout/searchWrapper/SearchWrapper.layout";
import { AiOutlinePlus, AiOutlineUser } from "react-icons/ai";
import { Modal } from "antd";

const StaffScreen = () => {
  const handleSearch = (value: string) => {
    console.log(value);
  };
  return (
    <div className={styles.container}>
      <SearchWrapper
        buttons={[
          {
            toolTip: "Add Staff Member",
            icon: (
              <div className={styles.iconContainer}>
                <AiOutlinePlus /> <AiOutlineUser className={styles.icon} />
              </div>
            ),
            onClick: () => {
              Modal.info({
                title: "Coming Soon",
                content: "This feature is coming soon",
              });
            },
            type: "primary",
          },
        ]}
        queryKey="staff"
        total={0}
        isFetching={false}
        placeholder="Search Staff Members"
      >
        <div className={styles.contentContainer}></div>
      </SearchWrapper>
    </div>
  );
};

export default StaffScreen;
