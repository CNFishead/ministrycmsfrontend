import PageLayout from "@/layout/page/Page.layout";
import { navigation } from "@/data/navigation";
import { useMediaQuery } from "react-responsive";
import { checkAuthorization } from "@/components/privateRoute/PrivateRouteV2";
import Ministry from "@/views/ministry/Ministry.Screen";

export default function Home() {
  // get the size of the screen using react-responsive useMediaQuery hook
  const isMobile = useMediaQuery({ query: "(max-width: 1024px)" });
  return (
    <PageLayout pages={[navigation().ministries.links.ministries]} largeSideBar={isMobile}>
      <Ministry />
    </PageLayout>
  );
}
