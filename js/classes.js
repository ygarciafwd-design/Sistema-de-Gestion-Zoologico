class Animal {
  constructor(id, nombre, edad, especie) {
    this.id      = id;
    this.nombre  = nombre;
    this.edad    = edad;
    this.especie = especie;
  }

  get id()      { return this.id; }
  get nombre()  { return this.nombre; }
  get edad()    { return this.edad; }
  get especie() { return this.especie; }

  describir() {
    return `${this.nombre} — ${this.especie}, ${this.edad} año(s)`;
  }

  tipo() { return 'animal'; }

  toJSON() {
    return {
      tipo:    this.tipo(),
      id:      this.id,
      nombre:  this.nombre,
      edad:    this.edad,
      especie: this.especie,
    };
  }
}

class Mamifero extends Animal {
  constructor(id, nombre, edad, especie, pelaje, gestacion) {
    super(id, nombre, edad, especie);
    this.pelaje    = pelaje;
    this.gestacion = gestacion;
  }

  describir() {
    return `${super.describir()} | Pelaje: ${this.pelaje} | Gestación: ${this.gestacion}`;
  }

  tipo() { return 'mamifero'; }

  toJSON() {
    return { ...super.toJSON(), pelaje: this.pelaje, gestacion: this.gestacion };
  }
}

class Ave extends Animal {
  constructor(id, nombre, edad, especie, envergadura, puedeVolar) {
    super(id, nombre, edad, especie);
    this.envergadura = envergadura;
    this.puedeVolar  = puedeVolar;
  }

  describir() {
    return `${super.describir()} | Envergadura: ${this.envergadura}cm | Vuela: ${this.puedeVolar}`;
  }

  tipo() { return 'ave'; }

  toJSON() {
    return { ...super.toJSON(), envergadura: this.envergadura, puedeVolar: this.puedeVolar };
  }
}

class Reptil extends Animal {
  constructor(id, nombre, edad, especie, tipoEscama, esVenenoso) {
    super(id, nombre, edad, especie);
    this.tipoEscama = tipoEscama;
    this.esVenenoso = esVenenoso;
  }

  describir() {
    const v = this.esVenenoso === 'Sí' ? 'venenoso' : 'no venenoso';
    return `${super.describir()} | Escama: ${this.tipoEscama} | ${v}`;
  }

  tipo() { return 'reptil'; }

  toJSON() {
    return { ...super.toJSON(), tipoEscama: this.tipoEscama, esVenenoso: this.esVenenoso };
  }
}

class Usuario {
 
  constructor(id, nombre, correo, rol) {
    this.id     = id;
    this.nombre = nombre;
    this.correo = correo;
    this.rol    = rol;
  }

  get id()     { return this.id; }
  get nombre() { return this.nombre; }
  get correo() { return this.correo; }
  get rol()    { return this.rol; }

  describir() {
    return `${this.nombre} <${this.correo}> — Rol: ${this.rol}`;
  }

  toJSON() {
    return { id: this.id, nombre: this.nombre, correo: this.correo, rol: this.rol };
  }
}

class Zoologico {
  #animales  = [];
  #usuarios  = [];
  #nextAnimalId  = 1;
  #nextUsuarioId = 1;

  agregarAnimal(animal) {
    this.#animales.push(animal);
  }

  getAnimales() {
    return [...this.#animales];
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
