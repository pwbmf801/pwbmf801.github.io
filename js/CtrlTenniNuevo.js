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
      forma.addEventListener(
        "submit", guarda);
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
        add(modelo);
      muestraTennis();
    } catch (e) {
      muestraError(e);
    }
  }
  
  