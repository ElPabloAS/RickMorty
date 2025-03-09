import type { Route } from "./+types/home";
import ContainerHome from "~/components/ContainerHome";
import Header from "~/components/Header";
import Footer from "~/components/Footer";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Rick and Morty" },
    { name: "description", content: "Rick and Morty" },
  ];
}

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <ContainerHome />
      <Footer />
    </div>
  );
}
