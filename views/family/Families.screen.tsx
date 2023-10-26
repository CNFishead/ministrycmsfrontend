import React, { use } from "react";
import styles from "./Families.module.scss";
import SearchWrapper from "@/layout/searchWrapper/SearchWrapper.layout";
import { AiOutlinePlus } from "react-icons/ai";
import CreateFamilyModal from "./modal/CreateFamilyModal.modal";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import FamilyType from "@/types/FamilyType";
import FamilyItem from "@/components/familyItem/FamilyItem.component";
import getFamiliesAction from "@/redux/actions/family/getFamilies.action";
import { Col, Row } from "antd";

const Families = () => {
  const [modalOpen, setModalOpen] = React.useState(false);
  const dispatch = useDispatch();

  const { user } = useSelector((state: RootState) => state.auth);
  const {
    listFamilies: { families, loading },
  } = useSelector((state: RootState) => state.family);

  const {
    search: { search, pageNumber, pageLimit, filter },
  } = useSelector((state: RootState) => state.interface);

  React.useEffect(() => {
    if (!user) return;
    dispatch(
      getFamiliesAction({
        keyword: search,
        page: pageNumber,
        limit: pageLimit,
        filter,
      }) as any
    );
  }, [search, pageNumber, pageLimit, filter, dispatch]);
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
        total={families?.length}
      >
        <CreateFamilyModal dispatch={dispatch} open={modalOpen} onClose={() => setModalOpen(false)} />
        <Row className={styles.contentContainer} justify={"space-evenly"}>
          {families?.map((family: FamilyType) => {
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
