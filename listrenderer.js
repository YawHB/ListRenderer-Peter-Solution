export function construct(list, container, itemRenderer) {
  const ListRenderer = {
    items: list,
    container: document.querySelector(container),
    itemRenderer: itemRenderer,
    render() {
      this.container.innerHTML = "";
      const filteredList = this.items.filter(item => item[this.filterProperty] == this.filterValue);
      for (const item of filteredList) {
        const html = this.itemRenderer.render(item);
        this.container.insertAdjacentHTML("beforeend", html);
      }
    },
    sort(sortBy, sortDir) {
      
      if (sortDir) {
        this.sortDir = sortDir;
      } else if( sortBy === this.sortBy ) {
        // hvis this.sortDir var "asc", så sæt den til "desc" - eller omvendt
        if (this.sortDir === "asc") {
          this.sortDir = "desc";
        } else {
          this.sortDir = "asc";
        }
      } else {
        this.sortDir = "asc";
      }

      this.sortBy = sortBy;
      
      console.log(`Sorter efter ${this.sortBy} i retning ${this.sortDir}`);

      this.items.sort((a, b) => {
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
    filter(filterProperty, filterValue) {
      this.filterProperty = filterProperty;
      this.filterValue = filterValue;
      console.log(`filter: property: ${filterProperty} value: ${filterValue}`);

      this.render()
    }
  };

  return ListRenderer;
}
