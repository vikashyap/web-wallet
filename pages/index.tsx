import type { NextPage } from "next";
import dynamic from "next/dynamic";

const Layout = dynamic(
  () => import("../components/Layout").then((module) => module.Layout),
  { ssr: false }
);

const Home: NextPage = () => {
  return <Layout />;
};

export default Home;
