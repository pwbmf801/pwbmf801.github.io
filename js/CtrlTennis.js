// @ts-nocheck
import {
    getAuth,
    getFirestore
  } from "../lib/fabrica.js";
  import {
    cod,
    muestraError
  } from "../lib/util.js";
  import {
    tieneRol
  } from "./seguridad.js";
  
  /** @type {HTMLUListElement} */
  const daoTenni =
    getFirestore().
      collection("Tenni");
  
  getAuth().
    onAuthStateChanged(
      protege, muestraError);
  
  /** @param {import(
      "../lib/tiposFire.js").User}
      usuario */
  async function protege(usuario) {
    if (tieneRol(usuario,
      ["Administrador"])) {
      consulta();
    }
  }
  
  function consulta() {
    daoTenni.
      orderBy("nombre")
      .onSnapshot(
        htmlLista, errConsulta);
  }
  
  /**
   * @param {import(
      "../lib/tiposFire.js").
      DocumentSnapshot} doc */
  function htmlFila(doc) {
    /**
     * @type {import("./tipos.js").
                    Tenni} */
    const data = doc.data();
    const codigo = cod(data.codigo);
    const nombre = cod(data.nombre);
    const precio = cod(data.precio);
    var fsf= cod(data.fecha);
    var fecha = new Date(fsf);
    var espacio="[   -   ]";
    var dformat = [fecha.getDate()+1, fecha.getMonth()+1, fecha.getFullYear()].join('/');
    const parámetros =
      new URLSearchParams();
    parámetros.append("id", doc.id);
    return ( /* html */
      `<li>
        <a class="fila" href=
    "tenni.html?${parámetros}">
          <strong class="primario">
            ${codigo} ${nombre} ${precio} ${dformat}
          </strong>
        </a>
       
      </li>`);
  }
  
  /** @param {Error} e */
  function errConsulta(e) {
    muestraError(e);
    consulta();
  }
  
  