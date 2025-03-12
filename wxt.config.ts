import { defineConfig } from "wxt";

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
});
