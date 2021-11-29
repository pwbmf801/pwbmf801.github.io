class MiFooter
  extends HTMLElement {
  connectedCallback() {
    this.innerHTML = /* html */
      `<p>
        &copy; 2021
        Fernando Bautista Morales.
      </p>`;
  }
}

customElements.define(
  "mi-footer", MiFooter);
