import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";
import pluginReact from "eslint-plugin-react";


export default [
  {ignores: ["**/*test*", "*babel.config.js*"],},
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  pluginReact.configs.flat.recommended,
  {files: ["**/*.{js,mjs,cjs,ts,jsx,tsx}"],
    rules : {"react/react-in-jsx-scope" : "off",}
  },
];
