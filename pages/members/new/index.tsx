import PageLayout from "@/layout/page/Page.layout";
import { navigation } from "@/data/navigation";
import { useMediaQuery } from "react-responsive";
import CreateNewMember from "@/views/members/views/createNewMember/CreateNewMember.view";

export default function MembersScreen() {
  // get the size of the screen using react-responsive useMediaQuery hook
  const isMobile = useMediaQuery({ query: "(max-width: 1024px)" });
  return (
    <PageLayout pages={[navigation().members.links.members]} largeSideBar={isMobile}>
      <CreateNewMember />
    </PageLayout>
  );
}