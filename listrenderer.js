export function construct(list, container, itemRenderer) {
  const ListRenderer = {
    container: document.querySelector(container),
    itemRenderer: itemRenderer,
    render() {
      this.container.innerHTML = "";
      for(const item of list) {
        const html = this.itemRenderer.render(item);
        this.container.insertAdjacentHTML("beforeend", html);
      }
    },
    sort( sortBy, sortDir ) {
      this.sortBy = sortBy;

      list.sort((a,b) => {
        if( a[this.sortBy] > b[this.sortBy]) {
          return 1;
        } else {
          return -1;
        }
      });

      this.render();
    }
  }

  return ListRenderer;
}