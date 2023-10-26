import React from "react";
import styles from "./Ministry.module.scss";
import SearchWrapper from "@/layout/searchWrapper/SearchWrapper.layout";
import { AiOutlinePlus, AiOutlineUpload } from "react-icons/ai";
import CreateNewMinistry from "./modal/createNewMinistry/CreateNewMinistry.modal";

const Ministry = () => {
  const [modalOpen, setModalOpen] = React.useState(true);


  return (
    <div className={styles.container}>
      <SearchWrapper
        buttons={[
          {
            toolTip: "Create new Ministry",
            icon: <AiOutlinePlus className={styles.icon} />,
            onClick: () => {
              setModalOpen(true);
            },
            type: "primary",
          },
        ]}
        placeholder="Search for ministries"
        // total={totalData?.total}
      >
        <CreateNewMinistry open={modalOpen} />
        <p>Hi</p>
      </SearchWrapper>
    </div>
  );
};

export default Ministry;
