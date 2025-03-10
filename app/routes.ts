import { type RouteConfig, index, layout, route } from "@react-router/dev/routes";

export default [
  layout("./routes/Layout.tsx", [
    index("./routes/home.tsx"),
    route("characters", "./routes/ListadoCharacters.tsx"),
    route("characters/:id", "./routes/DetailCharacter.tsx"),
    route("guessCharacter", "./routes/GameCharacter.tsx"),
  ]),
] satisfies RouteConfig;
