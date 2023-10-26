import Container from '@/layout/container/Container.layout';
import styles from './NotificationsView.module.scss';
import Link from 'next/link';
import { Badge, Button, Empty, Skeleton } from 'antd';
import { AiFillDelete, AiFillExclamationCircle } from 'react-icons/ai';
import {
  useNotifications,
  useUpdateSelectedNotification,
} from '@/state/notifications/useNotifications';
import { FiExternalLink } from 'react-icons/fi';
import Error from '@/components/error/Error.component';
import { useState } from 'react';
import getNotificationLink from '@/utils/getNotificationLink';
import NotificationItem from '@/components/notificationItem/NotificationItem.component';

type Props = {};

const NotificationsView = (props: Props) => {
  const { data, isError, isLoading, error, isFetching } = useNotifications();

  const { mutate: updateNotification } = useUpdateSelectedNotification();
  return (
    <Container
      title={
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <span
            style={{
              display: 'flex',
              alignItems: 'center',
              flex: '1',
            }}
          >
            Notifications
          </span>
          <Button type="primary" onClick={() => updateNotification('')}>
            Mark all Read
          </Button>
        </div>
      }
    >
      <div className={styles.notifications}>
        {data?.notifications?.length > 0 ? (
          data?.notifications.map((notification) => {
            return (
              <NotificationItem
                notification={notification}
                key={notification.entityId}
              />
            );
          })
        ) : (
          <Empty
            image={Empty.PRESENTED_IMAGE_SIMPLE}
            description="You have no notifications"
          />
        )}
      </div>
    </Container>
  );
};

export default NotificationsView;
