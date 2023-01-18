import React from "react";
import Footer from "./Footer";
import Navbar from "./Navbar";

const Layout = ({ children, adminNav }) => {
  return (
    <div className="layout">
      <Navbar adminNav={adminNav} />
      <main>{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;
