import { use, useEffect, useState } from "react";
import styles from "./Dashboard.module.scss";
import Card from "./layout/card/Card.component";
import VideosCard from "./components/cards/viewsChartCard/ViewsChartCard.component";
import DashboardHeader from "./layout/header/Header.layout";
import TotalCard from "./components/cards/totalCard/TotalCard.component";
import TopPerformingContentCard from "./components/cards/topPerformingContentCard/TopPerformingContentCard.component";
import NewsCard from "./components/cards/newsCard/NewsCard.component";
import MapViewsCard from "./components/cards/mapViewsCard/MapViewsCard.component";
import ViewsChartCard from "./components/cards/viewsChartCard/ViewsChartCard.component";
import PaymentCard from "./components/cards/paymentCard/newsCard/PaymentCard.component";
import { AiFillLike, AiFillEye } from "react-icons/ai";
import { MdVideoLibrary } from "react-icons/md";
import SubscribersCard from "./components/cards/subscribersCard/newsCard/SubscribersCard.component";
import { useUser } from "@/state/auth";
import { hasFeature, FEATURES } from "@/utils/hasFeature";
import Container from "@/layout/container/Container.layout";
import { Button } from "antd";
import Link from "next/link";
type Props = {};

type Card = {
  title: string;
  component: React.ReactNode;
  gridKey: string;
  hideIf?: boolean;
};

const Dashboard = (props: Props) => {
  const { data: loggedInData } = useUser();
  const dashboardCards = [] as Card[];

  const [cards, setCards] = useState(dashboardCards);

  return (
    <div className={styles.wrapper}>
      <DashboardHeader />
      {!hasFeature(loggedInData?.user, FEATURES.VOD, FEATURES.LIVESTREAMING) && (
        <div className={styles.noFeaturesContainer}>
          <h1>Welcome to your dashboard. You currently do not have any features enabled.</h1>
          <p>
            To enhance your Truthcasting experience, you can add features such as Video On Demand and Livestreaming.
            Please navigate to the Features page to find the option to add these features and unlock their
            functionalities.
          </p>
          <Link href="/features">
            <Button type="primary">Go to Features</Button>
          </Link>
        </div>
      )}
      <div className={styles.container}>
        {cards
          .filter((c) => !c.hideIf)
          .map((card: Card, index: number) => {
            return (
              <Card key={index} title={card.title} gridKey={card.gridKey}>
                {card.component}
              </Card>
            );
          })}
      </div>
    </div>
  );
};

export default Dashboard;
