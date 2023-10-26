import PageLayout from "@/layout/page/Page.layout";
import { navigation } from "@/data/navigation";
import { useMediaQuery } from "react-responsive";
import Registration from "@/views/auth/register/Registration.screen";

export default function AuthScreen() {
  // get the size of the screen using react-responsive useMediaQuery hook
  const isMobile = useMediaQuery({ query: "(max-width: 1024px)" });
  return (
    <PageLayout
      pages={[navigation().auth.links.register]}
      largeSideBar={isMobile}
      meta={{ title: `CMS | Register` }}
      container={false}
    >
      <Registration />
    </PageLayout>
  );
}
