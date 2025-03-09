import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
    index("routes/home.tsx"), 
    route("characters", "routes/ListadoCharacters.tsx"), 
    route("characters/:id", "routes/DetailCharacter.tsx"), 

  
] satisfies RouteConfig;
