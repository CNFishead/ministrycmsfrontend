import PageLayout from "@/layout/page/Page.layout";
import { navigation } from "@/data/navigation";
import { useMediaQuery } from "react-responsive";
import MinistryDetails from "@/views/ministry/ministryDetails/MinistryDetails.view";

export default function Home() {
  // get the size of the screen using react-responsive useMediaQuery hook
  const isMobile = useMediaQuery({ query: "(max-width: 1024px)" });
  return (
    <PageLayout pages={[navigation().ministries.links.ministries]} largeSideBar={isMobile}>
      <MinistryDetails />
    </PageLayout>
  );
}
