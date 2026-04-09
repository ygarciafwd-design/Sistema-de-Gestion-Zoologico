const KEYS = {
  ANIMALES:        'zoo_animales',
  USUARIOS:        'zoo_usuarios',
  NEXT_ANIMAL_ID:  'zoo_next_animal_id',
  NEXT_USUARIO_ID: 'zoo_next_usuario_id',
};

function guardarAnimales(animales) {
  const data = animales.map(a => a.toJSON());
  localStorage.setItem(KEYS.ANIMALES, JSON.stringify(data));
}

function guardarUsuarios(usuarios) {
  const data = usuarios.map(u => u.toJSON());
  localStorage.setItem(KEYS.USUARIOS, JSON.stringify(data));
}

function guardarContadores(nextAnimalId, nextUsuarioId) {
  localStorage.setItem(KEYS.NEXT_ANIMAL_ID,  String(nextAnimalId));
  localStorage.setItem(KEYS.NEXT_USUARIO_ID, String(nextUsuarioId));
}

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

function obtenerUsuarios() {
  const raw = localStorage.getItem(KEYS.USUARIOS);
  if (!raw) return [];

  const data = JSON.parse(raw);
  return data.map(d => new Usuario(d.id, d.nombre, d.correo, d.rol));
}

function obtenerNextAnimalId() {
  return parseInt(localStorage.getItem(KEYS.NEXT_ANIMAL_ID) || '1', 10);
}

function obtenerNextUsuarioId() {
  return parseInt(localStorage.getItem(KEYS.NEXT_USUARIO_ID) || '1', 10);
}

function actualizarStorage(zoo) {
  guardarAnimales(zoo.getAnimales());
  guardarUsuarios(zoo.getUsuarios());
  guardarContadores(zoo.nextAnimalId(), zoo.nextUsuarioId());
  zoo.setNextAnimalId(zoo.nextAnimalId() - 1);
  zoo.setNextUsuarioId(zoo.nextUsuarioId() - 1);
}

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