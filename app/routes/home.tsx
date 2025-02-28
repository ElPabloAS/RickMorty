import type { Route } from "./+types/home";

import  CardCharacter from "../components/CardCharacter";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "New React Router App" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export default function Home() {
  return <CardCharacter />;
  
}
