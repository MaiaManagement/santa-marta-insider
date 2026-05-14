import nextVitals from "eslint-config-next/core-web-vitals";

const config = [
  {
    ignores: [
      ".claude/**",
      ".netlify/**",
      ".next/**",
      "node_modules/**",
      "out/**",
    ],
  },
  ...nextVitals,
];

export default config;
