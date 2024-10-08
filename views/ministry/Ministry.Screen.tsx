import React from "react";
import styles from "./Ministry.module.scss";
import SearchWrapper from "@/layout/searchWrapper/SearchWrapper.layout";
import { AiOutlinePlus } from "react-icons/ai";
import useFetchData from "@/state/useFetchData";
import { Avatar, Button, Table, Modal } from "antd";
import { default as MinistryType } from "@/types/Ministry";
import Link from "next/link";
import { FaEdit, FaTrash } from "react-icons/fa";
import useRemoveData from "@/state/useRemoveData";
import { useRouter } from "next/router"; 
import { useUser } from "@/state/auth";

const Ministry = () => { 
  const router = useRouter();
  const { data: loggedInData } = useUser();
  const { data: selectedProfile, isLoading: profileIsLoading } = useFetchData({
    url: `/ministry/${loggedInData.user?.ministry?._id}`,
    key: "selectedProfile",
    enabled: !!loggedInData?.user?.ministry?._id,
  });

  const {
    data: ministryData,
    isFetching,
    isLoading: loading,
  } = useFetchData({
    url: `/ministry/${selectedProfile?.ministry?._id}/subministries`,
    key: "ministryList",
    enabled: !!selectedProfile?.ministry?._id,
  });

  const { mutate: deleteMinistry } = useRemoveData({
    successMessage: "Ministry deleted successfully",
    queriesToInvalidate: ["ministryList"],
  });

  return (
    <div className={styles.container}>
      <SearchWrapper
        buttons={[
          {
            toolTip: "Create new Ministry",
            icon: <AiOutlinePlus className={styles.icon} />,
            onClick: () => {
              router.push("/ministries/new");
            },
            type: "primary",
          },
        ]}
        placeholder="Search for ministries"
        total={ministryData?.totalCount}
        queryKey={"ministryList"}
        isFetching={isFetching}
      >
        <div className={styles.contentContainer}>
          <Table
            className={styles.table}
            dataSource={ministryData?.ministries}
            loading={loading}
            size="small"
            rowKey={(record: MinistryType) => record._id}
            columns={[
              {
                title: "Ministry Name",
                dataIndex: "name",
                key: "name",
              },
              {
                title: "# of Members",
                dataIndex: "members",
                key: "members",
                render: (text: string, record: MinistryType) => {
                  return <span>{record.members?.length}</span>;
                },
              },
              {
                title: "Ministry Leader",
                dataIndex: "leader",
                key: "leader",
                render: (text: string, record: MinistryType) => {
                  return (
                    <Link href={`/members/edit/${record.leader?._id}`}>
                      <div className={styles.leader}>
                        <Avatar src={record.leader?.profileImageUrl} />
                        <span>{record.leader?.fullName}</span>
                      </div>
                    </Link>
                  );
                },
              },
              {
                title: "Actions",
                dataIndex: "actions",
                key: "actions",
                render: (text: string, record: MinistryType) => {
                  return (
                    <div className={styles.actions}>
                      <Link href={`/ministries/${record._id}`}>
                        <Button>
                          <FaEdit />
                        </Button>
                      </Link>
                      <Button
                        onClick={() =>
                          Modal.confirm({
                            title: "Are you sure you want to delete this ministry?",
                            content: "This action cannot be undone",
                            onOk: () => {
                              deleteMinistry({
                                url: `/ministry/${selectedProfile?.ministry?._id}/subministries/${record._id}`,
                              });
                            },
                          })
                        }
                      >
                        <FaTrash />
                      </Button>
                    </div>
                  );
                },
              },
            ]}
            pagination={false}
          />
        </div>
      </SearchWrapper>
    </div>
  );
};

export default Ministry;
