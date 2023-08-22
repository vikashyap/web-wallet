import type { NextPage } from "next";
import { Footer, Navbar, Services, Welcome } from "../components";

export const Layout: NextPage = () => {
  return (
    <div className="min-h-screen">
      <div className="gradient-bg-welcome">
        <Navbar />
        <Welcome />
      </div>
      <Services />
      <Footer />
    </div>
  );
};
