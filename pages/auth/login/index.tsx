import Auth from "@/views/auth/Auth.view";
import Meta from "@/components/meta/Meta.component";

export default function AuthScreen() {
  return (
    <>
      <Meta title="Shepherd | Login" />
      <Auth />
    </>
  );
}