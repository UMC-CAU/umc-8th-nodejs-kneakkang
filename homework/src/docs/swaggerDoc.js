import { swaggerComponents } from "./components/index.js";
import { userPaths } from "./paths/user.js";
import { reviewPaths } from "./paths/review.js"
import { missionPaths } from "./paths/mission.js";
import { storePaths } from "./paths/store.js";

export const swaggerDocument = {
  openapi: "3.0.0",
  info: {
    title: "UMC 7th API",
    version: "1.0.0"
  },
  ...swaggerComponents,
  paths: {
    ...userPaths,
    ...storePaths,
    ...missionPaths,
    ...reviewPaths
  }
};
