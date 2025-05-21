import { userSchemas } from "./user.schema.js";
import { reviewSchemas } from "./review.schema.js";
import { storeSchemas } from "./store.schema.js";
import { missionSchemas } from "./mission.schema.js";

export const swaggerComponents = {
  components: {
    schemas: {
      ...userSchemas,
      ...reviewSchemas,
      ...storeSchemas,
      ...missionSchemas
    }
  }
};