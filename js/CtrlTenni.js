import {
    getAuth,
    getFirestore
  } from "../lib/fabrica.js";
  import {
    getString,
    muestraError
  } from "../lib/util.js";
  import {
    muestraTennis
  } from "./navegacion.js";
  import {
    tieneRol
  } from "./seguridad.js";
  
  const daoTenni =
    getFirestore().
      collection("Tenni");
  const params =
    new URL(location.href).
      searchParams;
  const id = params.get("id");
  /** @type {HTMLFormElement} */
  const forma = document["forma"];
  
  getAuth().onAuthStateChanged(
    protege, muestraError);
  
  /** @param {import(
      "../lib/tiposFire.js").User}
      usuario */
  async function protege(usuario) {
    if (tieneRol(usuario,
      ["Administrador"])) {
      busca();
    }
  }
  
  /** Busca y muestra los datos que
   * corresponden al id recibido. */
  async function busca() {
    try {
      const doc =
        await daoTenni.
          doc(id).
          get();
      if (doc.exists) {
        /**
         * @type {
            import("./tipos.js").
                    Tenni} */
        const data = doc.data();
        forma.codigo.value = data.codigo || "";
        forma.nombre.value = data.nombre || "";
        forma.linea.value = data.linea || "";
        forma.color.value = data.color || "";
        forma.descripcion.value = data.descripcion || "";
        forma.precio.value = data.precio || "";
        forma.fecha.value = data.fecha || "";
        forma.addEventListener(
          "submit", guarda);
        forma.eliminar.
          addEventListener(
            "click", elimina);
      } else {
        throw new Error(
          "No se encontró.");
      }
    } catch (e) {
      muestraError(e);
      muestraTennis();
    }
  }
  
  /** @param {Event} evt */
  async function guarda(evt) {
    try {
      evt.preventDefault();
      const formData =
        new FormData(forma);
      const codigo = getString(
          formData, "codigo").trim();  
      const nombre = getString(formData, "nombre").trim();
      const linea = getString(formData, "linea").trim();
      const color = getString(formData, "color").trim();
      const descripcion = getString(formData, "descripcion").trim();
      const precio = getString(formData, "precio").trim();
      const fecha = getString(formData, "fecha").trim();
      /**
       * @type {
          import("./tipos.js").
                  Tenni} */
      const modelo = {
        codigo, 
        nombre,
        linea,
        color,
        descripcion,
        precio,
        fecha
      };
      await daoTenni.
        doc(id).
        set(modelo);
      muestraTennis();
    } catch (e) {
      muestraError(e);
    }
  }
  
  async function elimina() {
    try {
      if (confirm("Confirmar la " +
        "eliminación")) {
        await daoTenni.
          doc(id).
          delete();
        muestraTennis();
      }
    } catch (e) {
      muestraError(e);
    }
  }
  
  