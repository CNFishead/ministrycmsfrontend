import PageLayout from "@/layout/page/Page.layout";
import { navigation } from "@/data/navigation";
import { useMediaQuery } from "react-responsive";
import ForgotPassword from "@/views/auth/forgot_password/ForgotPassword.view";

export default function AuthScreen() {
  // get the size of the screen using react-responsive useMediaQuery hook
  const isMobile = useMediaQuery({ query: "(max-width: 1024px)" });
  return (
    <PageLayout
      pages={[navigation().auth.links.forgot_password]}
      largeSideBar={isMobile}
      meta={{ title: `CMS | Login` }}
    >
      <ForgotPassword />
    </PageLayout>
  );
}
