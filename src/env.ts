import { envsafe, str, url } from "envsafe";

export const env = envsafe({
  NODE_ENV: str({
    devDefault: "development",
    choices: ["development", "production"],
  }),

  /**
   * Databases
   */
  DATABASE_URL: str({
    desc: "Dump database (weapons, costumes...)",
  }),
  NIERREINGUIDE_DATABASE_URL: str({
    desc: "Main database (loadouts...)",
  }),
});
