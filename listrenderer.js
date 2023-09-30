export function construct(list, container, itemRenderer) {
  const ListRenderer = {
    container: document.querySelector(container),
    itemRenderer: itemRenderer,
    render() {
      this.container.innerHTML = "";
      for (const item of list) {
        const html = this.itemRenderer.render(item);
        this.container.insertAdjacentHTML("beforeend", html);
      }
    },
    sort(sortBy, sortDir) {
      this.sortBy = sortBy;

      if (sortDir !== undefined) {
        this.sortDir = sortDir;
      } else {
        // hvis this.sortDir var "asc", så sæt den til "desc" - eller omvendt
        if (this.sortDir === "asc") {
          this.sortDir = "desc";
        } else {
          this.sortDir = "asc";
        }
      }

      console.log(`Sorter efter ${this.sortBy} i retning ${this.sortDir}`);

      list.sort((a, b) => {
        if (this.sortDir === "asc") {
          if (a[this.sortBy] > b[this.sortBy]) {
            return 1;
          } else {
            return -1;
          }
        } else {
          if (a[this.sortBy] < b[this.sortBy]) {
            return 1;
          } else {
            return -1;
          }
        }
      });

      this.render();
    },
  };

  return ListRenderer;
}
