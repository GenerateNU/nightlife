import pluginJs from "@eslint/js";
import { configs as tsConfigs } from "@typescript-eslint/eslint-plugin";
import { configs as pluginReactConfigs } from "eslint-plugin-react";

export default [
  {
    ignores: ["**/*test*", "*babel.config.js*"],
  },
  pluginJs.configs.recommended,
  tsConfigs.recommended,
  pluginReactConfigs.flat.recommended,
  {
    files: ["**/*.{js,mjs,cjs,ts,jsx,tsx}"],
    rules: {
      "react/react-in-jsx-scope": "off",
      "@typescript-eslint/no-unused-expressions": [
        "error",
        {
          allowShortCircuit: true,
          allowTernary: true,
          allowTaggedTemplates: true,
        },
      ],
    },
  },
];
