import nextCoreWebVitals from "eslint-config-next/core-web-vitals";
import nextTypescript from "eslint-config-next/typescript";
import { dirname } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const eslintConfig = [...nextCoreWebVitals, ...nextTypescript, {
  rules: {
    // TypeScript rules — strict but pragmatic
    "@typescript-eslint/no-explicit-any": "warn",
    "@typescript-eslint/no-unused-vars": ["error", { argsIgnorePattern: "^_", varsIgnorePattern: "^_" }],
    "@typescript-eslint/no-non-null-assertion": "warn",
    "@typescript-eslint/ban-ts-comment": "warn",
    "@typescript-eslint/prefer-as-const": "error",
    "@typescript-eslint/no-unused-disable-directive": "error",
    "@typescript-eslint/consistent-type-imports": "error",
    "@typescript-eslint/no-floating-promises": "warn",
    
    // React rules
    "react-hooks/exhaustive-deps": "warn",
    "react-hooks/purity": "warn",
    "react/no-unescaped-entities": "off",
    "react/display-name": "off",
    "react/prop-types": "off",
    "react-compiler/react-compiler": "off",
    "react/self-closing-comp": "error",
    
    // Next.js rules
    "@next/next/no-img-element": "error",
    "@next/next/no-html-link-for-pages": "error",
    "@next/next/no-duplicate-head": "error",
    
    // General JavaScript rules
    "prefer-const": "error",
    "no-unused-vars": ["error", { argsIgnorePattern: "^_", varsIgnorePattern: "^_" }],
    "no-console": ["warn", { allow: ["warn", "error"] }],
    "no-debugger": "error",
    "no-empty": ["error", { allowEmptyCatch: true }],
    "no-irregular-whitespace": "error",
    "no-case-declarations": "error",
    "no-fallthrough": "error",
    "no-mixed-spaces-and-tabs": "error",
    "no-redeclare": "error",
    "no-undef": "error",
    "no-unreachable": "error",
    "no-useless-escape": "error",
    "no-unused-expressions": "error",
    "eqeqeq": ["error", "always", { null: "ignore" }],
    "curly": ["error", "all"],
    "default-case": "error",
    "default-case-last": "error",
  },
}, {
  ignores: ["node_modules/**", ".next/**", "out/**", "build/**", "next-env.d.ts", "examples/**", "skills"]
}];

export default eslintConfig;