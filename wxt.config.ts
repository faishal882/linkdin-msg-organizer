import { defineConfig } from "wxt";
import tailwindcss from "@tailwindcss/vite";

// // wxt.config.ts
// export default defineConfig({
//   srcDir: 'src',
// });
// wxt.config.ts
export default defineConfig({
  srcDir: "src",
  manifest: {
    permissions: ["cookies"],
    host_permissions: ["*://*.linkedin.com/*"],
  },
  vite: () => ({
    plugins: [tailwindcss()],
  }),
});
