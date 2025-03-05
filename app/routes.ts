import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
    index("routes/home.tsx"), 
    route("characters", "routes/CardCharacter.tsx"), 
    route("character/:id", "routes/CardDetailCharacter.tsx"), 
] satisfies RouteConfig;
