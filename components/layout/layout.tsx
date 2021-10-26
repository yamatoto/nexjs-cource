import { Fragment } from "react";
import MainHeader from "./main-header";

const Layout = ({ children }: JSX.ElementChildrenAttribute) => {
  return (
    <Fragment>
      <MainHeader />
      <main>{children}</main>
    </Fragment>
  );
};

export default Layout;
