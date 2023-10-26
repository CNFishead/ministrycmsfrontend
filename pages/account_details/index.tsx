import PageLayout from "@/layout/page/Page.layout";
import { navigation } from "@/data/navigation";
import AccountDetails from "@/views/account_details/AccountDetails.screen";
import { useMediaQuery } from "react-responsive";
import cookie from "cookie";
import { checkAuthorization } from "@/components/privateRoute/PrivateRouteV2";
import setAuthToken from "@/utils/setAuthToken";
import { NextPageContext } from "next";
import { RootState } from "@/redux/store";
import { useSelector } from "react-redux";

export default function Home() {
  // get the size of the screen using react-responsive useMediaQuery hook
  const isMobile = useMediaQuery({ query: "(max-width: 1024px)" });
  return (
    <PageLayout pages={[navigation().account_details.links.account_details]} largeSideBar={isMobile}>
      <AccountDetails />
    </PageLayout>
  );
}

Home.getInitialProps = async (context: NextPageContext) => {
  // check the cookie for a user object if it exists dispatch a login action
  const cookies = cookie.parse(context.req?.headers.cookie || "");
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
  // set the token in axios header
  await setAuthToken(JSON.parse(user).token);
  console.log(JSON.parse(user).token);
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
