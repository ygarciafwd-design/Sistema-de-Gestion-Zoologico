/**
 * storage.js
 * ─────────────────────────────────────────────────────
 * Funciones para persistir datos en localStorage.
 * Los objetos se serializan a JSON al guardar y se
 * reconstruyen como instancias de clase al cargar.
 * ─────────────────────────────────────────────────────
 */

const KEYS = {
  ANIMALES:        'zoo_animales',
  USUARIOS:        'zoo_usuarios',
  NEXT_ANIMAL_ID:  'zoo_next_animal_id',
  NEXT_USUARIO_ID: 'zoo_next_usuario_id',
};


/* ── GUARDAR ─────────────────────────────────────────── */

/**
 * Guarda el array de animales en localStorage.
 * @param {Animal[]} animales
 */
function guardarAnimales(animales) {
  const data = animales.map(a => a.toJSON());
  localStorage.setItem(KEYS.ANIMALES, JSON.stringify(data));
}

/**
 * Guarda el array de usuarios en localStorage.
 * @param {Usuario[]} usuarios
 */
function guardarUsuarios(usuarios) {
  const data = usuarios.map(u => u.toJSON());
  localStorage.setItem(KEYS.USUARIOS, JSON.stringify(data));
}

/**
 * Guarda los contadores de IDs.
 * @param {number} nextAnimalId
 * @param {number} nextUsuarioId
 */
function guardarContadores(nextAnimalId, nextUsuarioId) {
  localStorage.setItem(KEYS.NEXT_ANIMAL_ID,  String(nextAnimalId));
  localStorage.setItem(KEYS.NEXT_USUARIO_ID, String(nextUsuarioId));
}


/* ── OBTENER ─────────────────────────────────────────── */

/**
 * Carga los animales desde localStorage y los reconstruye
 * como instancias de la subclase correspondiente.
 * @returns {Animal[]}
 */
function obtenerAnimales() {
  const raw = localStorage.getItem(KEYS.ANIMALES);
  if (!raw) return [];

  const data = JSON.parse(raw);

  return data.map(d => {
    switch (d.tipo) {
      case 'mamifero':
        return new Mamifero(d.id, d.nombre, d.edad, d.especie, d.pelaje, d.gestacion);
      case 'ave':
        return new Ave(d.id, d.nombre, d.edad, d.especie, d.envergadura, d.puedeVolar);
      case 'reptil':
        return new Reptil(d.id, d.nombre, d.edad, d.especie, d.tipoEscama, d.esVenenoso);
      default:
        return new Animal(d.id, d.nombre, d.edad, d.especie);
    }
  });
}

/**
 * Carga los usuarios desde localStorage y los reconstruye
 * como instancias de Usuario.
 * @returns {Usuario[]}
 */
function obtenerUsuarios() {
  const raw = localStorage.getItem(KEYS.USUARIOS);
  if (!raw) return [];

  const data = JSON.parse(raw);
  return data.map(d => new Usuario(d.id, d.nombre, d.correo, d.rol));
}

/**
 * Devuelve el próximo ID de animal guardado (o 1 si no existe).
 * @returns {number}
 */
function obtenerNextAnimalId() {
  return parseInt(localStorage.getItem(KEYS.NEXT_ANIMAL_ID) || '1', 10);
}

/**
 * Devuelve el próximo ID de usuario guardado (o 1 si no existe).
 * @returns {number}
 */
function obtenerNextUsuarioId() {
  return parseInt(localStorage.getItem(KEYS.NEXT_USUARIO_ID) || '1', 10);
}


/* ── ACTUALIZAR (guardar estado completo del zoo) ────── */

/**
 * Persiste el estado actual del zoológico completo.
 * Llama a esta función cada vez que haya cambios.
 * @param {Zoologico} zoo
 */
function actualizarStorage(zoo) {
  guardarAnimales(zoo.getAnimales());
  guardarUsuarios(zoo.getUsuarios());
  guardarContadores(zoo.nextAnimalId(), zoo.nextUsuarioId());
  // Devolvemos el ID incrementado: corregimos el doble salto
  zoo.setNextAnimalId(zoo.nextAnimalId() - 1);
  zoo.setNextUsuarioId(zoo.nextUsuarioId() - 1);
}


/* ── CARGAR (restaurar estado desde localStorage) ────── */

/**
 * Restaura el zoológico desde localStorage al iniciar la app.
 * @param {Zoologico} zoo - Instancia vacía del zoológico
 */
function cargarDesdeStorage(zoo) {
  const animales  = obtenerAnimales();
  const usuarios  = obtenerUsuarios();
  const nextAId   = obtenerNextAnimalId();
  const nextUId   = obtenerNextUsuarioId();

  animales.forEach(a  => zoo.agregarAnimal(a));
  usuarios.forEach(u  => zoo.agregarUsuario(u));
  zoo.setNextAnimalId(nextAId);
  zoo.setNextUsuarioId(nextUId);
}
