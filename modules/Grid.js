import { getRedirectResult } from "firebase/auth";
import Masonry from "masonry-layout";

export default class Grid {
  constructor({ gridType, items, itemType, clickablePath }) {
    const grid = document.createElement("ul");
    grid.classList.add(gridType + "-grid", "grid");

    if (items.length == 0) {
      const noItemsMessage = document.createElement("p");
      const noNotesMessage = document.createElement("span");
      noNotesMessage.textContent = `No ${gridType}s yet...`;
      // noNotesMessage.classList.add("grid-item");
      grid.append(noNotesMessage);
    } else {
      items.forEach((item) => {
        const gridItem = new itemType(item);
        const itemContainer = document.createElement("li");
        itemContainer.classList.add("grid-item");
        itemContainer.append(gridItem);
        grid.append(itemContainer);
      });

      if (clickablePath) {
        window.addEventListener("click", (e) => {
          // const itemActions = e.target.closest(".grid-item-actions");
          const item = e.target.closest(".grid-item").querySelector("article");

          if (item) {
            window.location.assign(clickablePath + item.id);
          }
        });
      }

      const masonry = new Masonry(grid, {
        itemSelector: ".grid-item",
        percentPosition: true,
        gutter: 16,
        transitionDuration: "0.1s",
      });

      // TODO: fix this
      setTimeout(() => {
        masonry.layout();
      }, 200);
    }

    return grid;
  }
}
