import PageLayout from "@/layout/page/Page.layout";
import { navigation } from "@/data/navigation";
import { useMediaQuery } from "react-responsive";
import Families from "@/views/family/Families.screen";

export default function MembersScreen() {
  // get the size of the screen using react-responsive useMediaQuery hook
  const isMobile = useMediaQuery({ query: "(max-width: 1024px)" });
  return (
    <PageLayout pages={[navigation().members.links.families]} largeSideBar={isMobile}>
      <Families />
    </PageLayout>
  );
}
