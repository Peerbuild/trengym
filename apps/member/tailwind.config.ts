import type { Config } from "tailwindcss";
import globalConfig from "@trengym/ui/tailwind.config.ts";

const config: Config = {
  ...globalConfig,
  presets: [require("nativewind/preset")],
};

export default config;
