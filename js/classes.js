/**
 * classes.js
 * ─────────────────────────────────────────────────────
 * Clases del sistema de gestión del zoológico.
 * Aplica: Encapsulamiento, Herencia y Polimorfismo (POO).
 * ─────────────────────────────────────────────────────
 */

/* ══════════════════════════════════════════════════════
   CLASE BASE — Animal
   Propiedades privadas (#) accesibles solo por getters.
   ══════════════════════════════════════════════════════ */
class Animal {
  // Propiedades privadas (encapsulamiento real ES2022)
  #id;
  #nombre;
  #edad;
  #especie;

  /**
   * @param {number} id       - Identificador único
   * @param {string} nombre   - Nombre del animal
   * @param {number} edad     - Edad en años
   * @param {string} especie  - Especie del animal
   */
  constructor(id, nombre, edad, especie) {
    this.#id      = id;
    this.#nombre  = nombre;
    this.#edad    = edad;
    this.#especie = especie;
  }

  // ── Getters (punto de acceso controlado) ──────────
  get id()      { return this.#id; }
  get nombre()  { return this.#nombre; }
  get edad()    { return this.#edad; }
  get especie() { return this.#especie; }

  /**
   * Descripción base. Las subclases la extienden (polimorfismo).
   * @returns {string}
   */
  describir() {
    return `${this.#nombre} — ${this.#especie}, ${this.#edad} año(s)`;
  }

  /**
   * Tipo del animal. Sobreescrito en cada subclase.
   * @returns {string}
   */
  tipo() { return 'animal'; }

  /**
   * Serializa el objeto para guardarlo en localStorage.
   * @returns {Object}
   */
  toJSON() {
    return {
      tipo:    this.tipo(),
      id:      this.#id,
      nombre:  this.#nombre,
      edad:    this.#edad,
      especie: this.#especie,
    };
  }
}


/* ══════════════════════════════════════════════════════
   SUBCLASE — Mamifero
   Hereda de Animal. Agrega: pelaje y gestacion.
   ══════════════════════════════════════════════════════ */
class Mamifero extends Animal {
  /**
   * @param {number} id
   * @param {string} nombre
   * @param {number} edad
   * @param {string} especie
   * @param {string} pelaje     - Tipo de pelaje (Ej: "Dorado")
   * @param {string} gestacion  - "Sí" | "No"
   */
  constructor(id, nombre, edad, especie, pelaje, gestacion) {
    super(id, nombre, edad, especie); // Llamada al constructor padre
    this.pelaje    = pelaje;
    this.gestacion = gestacion;
  }

  /** @override */
  describir() {
    return `${super.describir()} | Pelaje: ${this.pelaje} | Gestación: ${this.gestacion}`;
  }

  /** @override */
  tipo() { return 'mamifero'; }

  /** @override */
  toJSON() {
    return { ...super.toJSON(), pelaje: this.pelaje, gestacion: this.gestacion };
  }
}


/* ══════════════════════════════════════════════════════
   SUBCLASE — Ave
   Hereda de Animal. Agrega: envergadura y puedeVolar.
   ══════════════════════════════════════════════════════ */
class Ave extends Animal {
  /**
   * @param {number} id
   * @param {string} nombre
   * @param {number} edad
   * @param {string} especie
   * @param {number} envergadura  - Envergadura en cm
   * @param {string} puedeVolar   - "Sí" | "No"
   */
  constructor(id, nombre, edad, especie, envergadura, puedeVolar) {
    super(id, nombre, edad, especie);
    this.envergadura = envergadura;
    this.puedeVolar  = puedeVolar;
  }

  /** @override */
  describir() {
    return `${super.describir()} | Envergadura: ${this.envergadura}cm | Vuela: ${this.puedeVolar}`;
  }

  /** @override */
  tipo() { return 'ave'; }

  /** @override */
  toJSON() {
    return { ...super.toJSON(), envergadura: this.envergadura, puedeVolar: this.puedeVolar };
  }
}


/* ══════════════════════════════════════════════════════
   SUBCLASE — Reptil
   Hereda de Animal. Agrega: tipoEscama y esVenenoso.
   ══════════════════════════════════════════════════════ */
class Reptil extends Animal {
  /**
   * @param {number} id
   * @param {string} nombre
   * @param {number} edad
   * @param {string} especie
   * @param {string} tipoEscama  - Ej: "Queratina"
   * @param {string} esVenenoso  - "Sí" | "No"
   */
  constructor(id, nombre, edad, especie, tipoEscama, esVenenoso) {
    super(id, nombre, edad, especie);
    this.tipoEscama = tipoEscama;
    this.esVenenoso = esVenenoso;
  }

  /** @override */
  describir() {
    const v = this.esVenenoso === 'Sí' ? 'venenoso' : 'no venenoso';
    return `${super.describir()} | Escama: ${this.tipoEscama} | ${v}`;
  }

  /** @override */
  tipo() { return 'reptil'; }

  /** @override */
  toJSON() {
    return { ...super.toJSON(), tipoEscama: this.tipoEscama, esVenenoso: this.esVenenoso };
  }
}


/* ══════════════════════════════════════════════════════
   CLASE — Usuario
   Gestiona los usuarios del sistema con encapsulamiento.
   ══════════════════════════════════════════════════════ */
class Usuario {
  #id;
  #nombre;
  #correo;
  #rol;

  /**
   * @param {number} id
   * @param {string} nombre
   * @param {string} correo
   * @param {string} rol  - "admin" | "cuidador" | "veterinario"
   */
  constructor(id, nombre, correo, rol) {
    this.#id     = id;
    this.#nombre = nombre;
    this.#correo = correo;
    this.#rol    = rol;
  }

  get id()     { return this.#id; }
  get nombre() { return this.#nombre; }
  get correo() { return this.#correo; }
  get rol()    { return this.#rol; }

  describir() {
    return `${this.#nombre} <${this.#correo}> — Rol: ${this.#rol}`;
  }

  toJSON() {
    return { id: this.#id, nombre: this.#nombre, correo: this.#correo, rol: this.#rol };
  }
}


/* ══════════════════════════════════════════════════════
   CLASE — Zoologico (patrón Repository)
   Centraliza el acceso a animales y usuarios.
   Usa propiedades privadas para proteger los datos.
   ══════════════════════════════════════════════════════ */
class Zoologico {
  #animales  = [];
  #usuarios  = [];
  #nextAnimalId  = 1;
  #nextUsuarioId = 1;

  // ── Animales ───────────────────────────────────────
  agregarAnimal(animal) {
    this.#animales.push(animal);
  }

  getAnimales() {
    return [...this.#animales]; // copia defensiva
  }

  eliminarAnimal(id) {
    this.#animales = this.#animales.filter(a => a.id !== id);
  }

  nextAnimalId() {
    return this.#nextAnimalId++;
  }

  setNextAnimalId(n) {
    this.#nextAnimalId = n;
  }

  // ── Usuarios ───────────────────────────────────────
  agregarUsuario(usuario) {
    this.#usuarios.push(usuario);
  }

  getUsuarios() {
    return [...this.#usuarios];
  }

  eliminarUsuario(id) {
    this.#usuarios = this.#usuarios.filter(u => u.id !== id);
  }

  nextUsuarioId() {
    return this.#nextUsuarioId++;
  }

  setNextUsuarioId(n) {
    this.#nextUsuarioId = n;
  }
}
