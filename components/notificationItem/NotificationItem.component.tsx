import NotificationType from '@/types/NotificationType';
import styles from './NotificationItem.module.scss';
import moment from 'moment';
import Link from 'next/link';
import React from 'react';
import getNotificationLink from '@/utils/getNotificationLink';
import { useUpdateSelectedNotification } from '@/state/notifications/useNotifications';
import { Avatar } from 'antd';

interface Props {
  notification: NotificationType;
  small: Boolean;
}
const NotificationItem = (props: Props) => {
  const { mutate: updateNotification } = useUpdateSelectedNotification();
  return (
    <>
      <Link
        className={`${styles.container} ${
          !props.notification?.opened ? styles.unread : ''
        }`}
        href={getNotificationLink(props.notification)}
        key={props.notification.entityId}
        onClick={() => {
          updateNotification(props.notification._id);
        }}
      >
        <div className={styles.content}>
          <div className={styles.titleContainer}>
            <Avatar
              size="small"
              src={props.notification?.userFrom?.profileImageUrl}
            />

            <h1
              className={`${styles.title}  ${props.small ? styles.small : ''}`}
            >
              {props.notification.message}
            </h1>
          </div>

          <p
            className={`${styles.description} ${
              props.small ? styles.small : ''
            }`}
          >
            {props.notification.description}
          </p>
        </div>
        <div className={styles.date}>
          {moment(props.notification?.createdAt)
            .format('MM/DD/YYYY')
            .toString()}
        </div>
      </Link>
    </>
  );
};

// default props
NotificationItem.defaultProps = {
  small: false,
};

export default NotificationItem;
