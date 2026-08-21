import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
    // Preserved source/reference material, not our code
    // (docs/sukaya-content.pdf, reference/sukaya-site-archive/).
    "docs/**",
    "reference/**",
    // Third-party Claude Code skill bundle (nextlevelbuilder/ui-ux-pro-max-
    // skill), installed verbatim — its scripts follow their own upstream
    // conventions (e.g. CommonJS require()), not this project's lint rules.
    ".claude/**",
  ]),
]);

export default eslintConfig;
