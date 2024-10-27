import { navigation } from "@/data/navigation";
import PageLayout from "@/layout/page/Page.layout";
import DashboardView from "@/views/dashboard/Dashboard.view"; 

const Dashboard = () => {
  return (
    <PageLayout pages={[navigation().home.links.home]} largeSideBar={true}>
      <DashboardView />
    </PageLayout>
  );
};

export default Dashboard;
