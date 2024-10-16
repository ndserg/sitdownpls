import initWebpSupport from "./webp-support.js";
import Pagination from "./pagination.js";
import initDragScroll from "./dragscroll.js";

window.Pagination = Pagination;

window.addEventListener("DOMContentLoaded", () => {
  initWebpSupport();
  initDragScroll();
});
