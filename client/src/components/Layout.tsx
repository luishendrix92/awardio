import React from "react";
import { Outlet } from "react-router-dom";
import Footer from "./Footer";
import Navbar from "./Navbar";

function Layout() {
  return (
    <React.Fragment>
      <Navbar />
      <div>
        <div className="ui container" style={{ marginTop: "30px" }}>
          <Outlet />
        </div>
      </div>
      <Footer />
    </React.Fragment>
  );
}

export default Layout;
