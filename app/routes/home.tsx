
import type { Route } from "./+types/home";
import ContainerHome from "~/components/ContainerHome";
export function meta({}: Route.MetaArgs) {
  return [
    { title: "Rick and Morty" },
    { name: "description", content: "Rick and Morty" },
  ];
}

export default function Home() {
  return <>
  <ContainerHome />
  </>
}
