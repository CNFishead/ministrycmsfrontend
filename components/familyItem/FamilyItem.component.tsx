import FamilyType from "@/types/FamilyType";
import styles from "./FamilyItem.module.scss";
import React from "react";
import MemberType from "@/types/MemberType";
import { Avatar, Card, Empty } from "antd";
import Link from "next/link";

const { Meta } = Card;

interface FamilyItemProps {
  family: FamilyType;
}

/**
 * @description - FamilyItem component, renders a family item
 * @param props  - FamilyItemProps
 * @returns
 */
const FamilyItem = (props: FamilyItemProps) => {
  return (<Link href={`/families/${props.family?._id}`}>
    <Card
      className={styles.container}
      bordered={true}
      hoverable
      style={{ width: "95%" }}
      cover={
        props.family?.members.length > 0 ? (
          <Avatar.Group size={64} className={styles.avatarGroup}>
          {props.family?.members.slice(0, 3).map((member: MemberType, index) => {
            return (
                <Avatar src={member?.profileImageUrl} key={member._id}/>
            );
          })}
          </Avatar.Group>
        ) : (
          <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description="No Family Members" />
        )
      }
    >
      
        <Meta title={props.family?.name} description={`${props.family?.members.length} members`} />
      
    </Card></Link>
  );
};

export default FamilyItem;
