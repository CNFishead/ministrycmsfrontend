import React, { use } from "react";
import styles from "./Families.module.scss";
import SearchWrapper from "@/layout/searchWrapper/SearchWrapper.layout";
import { AiOutlinePlus } from "react-icons/ai";
import CreateFamilyModal from "./modal/CreateFamilyModal.modal";
import FamilyType from "@/types/FamilyType";
import FamilyItem from "@/components/familyItem/FamilyItem.component";
import { Col, Row } from "antd";
import useFetchData from "@/state/useFetchData";
import Loader from "@/components/loader/Loader.component";
import Error from "@/components/error/Error.component";

const Families = () => {
  const [modalOpen, setModalOpen] = React.useState(false);
  const {
    data: familyList,
    isLoading,
    isError,
    error,
  } = useFetchData({
    url: `/family`,
    key: "families",
  });

  if (isLoading) return <Loader />;
  if (isError) return <Error error={error} />;

  return (
    <div className={styles.container}>
      <SearchWrapper
        buttons={[
          {
            toolTip: "Create new Family",
            icon: <AiOutlinePlus className={styles.icon} />,
            onClick: () => {
              setModalOpen(true);
            },
            type: "primary",
          },
        ]}
        placeholder="Search for Families"
        total={familyList?.total}
        isFetching={isLoading}
        queryKey="families"
      >
        <CreateFamilyModal open={modalOpen} onClose={() => setModalOpen(false)} />
        <Row className={styles.contentContainer} justify={"space-evenly"}>
          {familyList?.families?.map((family: FamilyType) => {
            return (
              <Col className={styles.familyCardContainer} span={6} key={family._id}>
                <FamilyItem family={family} />
              </Col>
            );
          })}
        </Row>
      </SearchWrapper>
    </div>
  );
};

export default Families;
