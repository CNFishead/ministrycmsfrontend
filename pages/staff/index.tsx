import PageLayout from "@/layout/page/Page.layout";
import { navigation } from "@/data/navigation";
import { useMediaQuery } from "react-responsive";
import cookie from "cookie";
import { checkAuthorization } from "@/components/privateRoute/PrivateRouteV2";
import StaffScreen from "@/views/staff/StaffPage.screen";

export default function Home() {
  // get the size of the screen using react-responsive useMediaQuery hook
  const isMobile = useMediaQuery({ query: "(max-width: 1024px)" });
  return (
    <PageLayout pages={[navigation().ministries.links.staff]} largeSideBar={isMobile}>
      <StaffScreen />
    </PageLayout>
  );
}

// use server side props to set the user in the store
export const getServerSideProps = async (ctx: any) => {
  // check the cookie for a user object if it exists dispatch a login action
  const cookies = cookie.parse(ctx.req.headers.cookie || "");
  const user = cookies.user;
  if (!user) {
    // if the necessary data is not found in the cookie, redirect the user to the login page
    return {
      redirect: {
        destination: "/auth/login",
        permanent: false,
      },
    };
  }
  // check if the user has the correct permissions to access the page
  const isAuthorized = await checkAuthorization(JSON.parse(user), ["admin", "user"]);
  if (!isAuthorized) {
    // if the user does not have the correct permissions to access the page, redirect the user to the homepage
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }
  return {
    props: {},
  };
};
