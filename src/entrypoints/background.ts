export default defineBackground(() => {
  console.log(`Hello background!, ${browser.runtime.id}`);
});
