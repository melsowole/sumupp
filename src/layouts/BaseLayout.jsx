import { Outlet, useLocation } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";

export default function BaseLayout() {
  const location = useLocation();

  const headerConfig = {
    "/": {
      title: "Home",
      backRoute: null,
      actions: null,
    },
  };

  const { title, backRoute, actions } = headerConfig[location.pathname] || {};

  return (
    <>
      <main>
        <Header title={title} backRoute={backRoute} actions={actions} />
        <div>
          <Outlet context="main" />
        </div>
      </main>

      <hr />

      <Footer />
    </>
  );
}
