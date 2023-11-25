import PageLayout from "@/layout/page/Page.layout";
import { navigation } from "@/data/navigation";
import { useMediaQuery } from "react-responsive";
import FamilyEdit from "@/views/family/familyEditScreen/FamilyEdit.screen";

interface Props {
  id: string;
}

export default function FamilyEditScreen(props: Props) {
  // get the size of the screen using react-responsive useMediaQuery hook
  const isMobile = useMediaQuery({ query: "(max-width: 1024px)" });
  return (
    <PageLayout pages={[navigation().members.links.families]} largeSideBar={isMobile}>
      <FamilyEdit />
    </PageLayout>
  );
}
