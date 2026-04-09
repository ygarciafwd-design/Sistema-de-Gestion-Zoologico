const zoo = new Zoologico();

document.addEventListener('DOMContentLoaded', () => {
  cargarDesdeStorage(zoo);
  cargarDatosEjemplo();
  initNav();
  initForms();
  renderDashboard();
});

function cargarDatosEjemplo() {
  if (zoo.getAnimales().length > 0) return;

  zoo.agregarAnimal(new Mamifero(zoo.nextAnimalId(), 'Simba',  5, 'León africano',     'Dorado',    'Sí'));
  zoo.agregarAnimal(new Ave    (zoo.nextAnimalId(), 'Pico',   2, 'Tucán toco',         45,          'Sí'));
  zoo.agregarAnimal(new Reptil (zoo.nextAnimalId(), 'Rex',    8, 'Iguana verde',       'Queratina', 'No'));
  zoo.agregarAnimal(new Mamifero(zoo.nextAnimalId(), 'Nala',  3, 'Elefante asiático',  'Gris liso', 'No'));
  zoo.agregarAnimal(new Ave    (zoo.nextAnimalId(), 'Pluma',  1, 'Flamenco rosado',    120,         'Sí'));
  zoo.agregarAnimal(new Reptil (zoo.nextAnimalId(), 'Víbora', 4, 'Cobra real',         'Lisa',      'Sí'));

  zoo.agregarUsuario(new Usuario(zoo.nextUsuarioId(), 'Ana García',    'ana@zoo.com',    'admin'));
  zoo.agregarUsuario(new Usuario(zoo.nextUsuarioId(), 'Carlos López',  'carlos@zoo.com', 'cuidador'));
  zoo.agregarUsuario(new Usuario(zoo.nextUsuarioId(), 'Marta Ruiz',    'marta@zoo.com',  'veterinario'));

  actualizarStorage(zoo);
}

function initNav() {
  document.querySelectorAll('.navegacion-boton').forEach(btn => {
    btn.addEventListener('click', () => {
      const target = btn.dataset.tab;
      switchTab(target);
    });
  });
}

function switchTab(tabId) {
  document.querySelectorAll('.navegacion-boton').forEach(b => {
    b.classList.toggle('activo', b.dataset.tab === tabId);
  });
  document.querySelectorAll('.seccion-pestana').forEach(s => {
    s.classList.toggle('activo', s.id === tabId);
  });
  if (tabId === 'dashboard') renderDashboard();
  if (tabId === 'animales')  renderAnimales();
  if (tabId === 'usuarios')  renderUsuarios();
}

function initForms() {
  document.getElementById('a-tipo').addEventListener('change', toggleExtraFields);
  document.getElementById('btn-add-animal').addEventListener('click', crearAnimal);
  document.getElementById('btn-add-user').addEventListener('click', crearUsuario);
}

function toggleExtraFields() {
  const tipo = document.getElementById('a-tipo').value;
  ['mamifero', 'ave', 'reptil'].forEach(t => {
    document.getElementById(`extra-${t}`).classList.toggle('oculto', t !== tipo);
  });
}

function crearAnimal() {
  const nombre  = document.getElementById('a-nombre').value.trim();
  const edad    = parseInt(document.getElementById('a-edad').value, 10);
  const especie = document.getElementById('a-especie').value.trim();
  const tipo    = document.getElementById('a-tipo').value;

  if (!nombre || !especie || !tipo || isNaN(edad) || edad < 0) {
    alert('Por favor, completa todos los campos obligatorios.');
    return;
  }

  const id = zoo.nextAnimalId();
  let animal;

  switch (tipo) {
    case 'mamifero':
      animal = new Mamifero(id, nombre, edad, especie,
        document.getElementById('a-pelaje').value.trim() || '—',
        document.getElementById('a-gestacion').value);
      break;
    case 'ave':
      animal = new Ave(id, nombre, edad, especie,
        parseInt(document.getElementById('a-envergadura').value, 10) || 0,
        document.getElementById('a-volar').value);
      break;
    case 'reptil':
      animal = new Reptil(id, nombre, edad, especie,
        document.getElementById('a-escama').value.trim() || '—',
        document.getElementById('a-veneno').value);
      break;
  }

  zoo.agregarAnimal(animal);
  actualizarStorage(zoo);

  ['a-nombre', 'a-edad', 'a-especie', 'a-pelaje', 'a-envergadura', 'a-escama'].forEach(
    id => { document.getElementById(id).value = ''; }
  );
  document.getElementById('a-tipo').value = '';
  toggleExtraFields();

  mostrarAlerta('animal-alert');
  renderAnimales();
}

function crearUsuario() {
  const nombre = document.getElementById('u-nombre').value.trim();
  const correo = document.getElementById('u-correo').value.trim();
  const rol    = document.getElementById('u-rol').value;

  if (!nombre || !correo) {
    alert('Por favor, completa nombre y correo.');
    return;
  }

  const id = zoo.nextUsuarioId();
  zoo.agregarUsuario(new Usuario(id, nombre, correo, rol));
  actualizarStorage(zoo);

  document.getElementById('u-nombre').value = '';
  document.getElementById('u-correo').value = '';

  mostrarAlerta('user-alert');
  renderUsuarios();
}

function eliminarAnimal(id) {
  if (!confirm('¿Seguro que quieres eliminar este animal?')) return;
  zoo.eliminarAnimal(id);
  actualizarStorage(zoo);
  renderAnimales();
  renderDashboard();
}

function eliminarUsuario(id) {
  if (!confirm('¿Seguro que quieres eliminar este usuario?')) return;
  zoo.eliminarUsuario(id);
  actualizarStorage(zoo);
  renderUsuarios();
}

function renderDashboard() {
  const animales = zoo.getAnimales();
  const usuarios = zoo.getUsuarios();

  document.getElementById('stat-total').textContent = animales.length;
  document.getElementById('stat-mam').textContent   = animales.filter(a => a.tipo() === 'mamifero').length;
  document.getElementById('stat-ave').textContent   = animales.filter(a => a.tipo() === 'ave').length;
  document.getElementById('stat-rep').textContent   = animales.filter(a => a.tipo() === 'reptil').length;
  document.getElementById('stat-users').textContent = usuarios.length;

  const el = document.getElementById('dashboard-list');
  if (!animales.length) {
    el.innerHTML = '<p class="vacio">Sin animales registrados.</p>';
    return;
  }
  el.innerHTML = animales.slice(-6).reverse().map(a => itemAnimalHTML(a, false)).join('');
}

function renderAnimales() {
  const animales = zoo.getAnimales();
  const el = document.getElementById('animal-list');
  if (!animales.length) {
    el.innerHTML = '<p class="vacio">Sin animales registrados.</p>';
    return;
  }
  el.innerHTML = animales.map(a => itemAnimalHTML(a, true)).join('');
}

function renderUsuarios() {
  const usuarios = zoo.getUsuarios();
  const el = document.getElementById('user-list');
  if (!usuarios.length) {
    el.innerHTML = '<p class="vacio">Sin usuarios registrados.</p>';
    return;
  }
  el.innerHTML = usuarios.map(u => `
    <div class="elemento-fila">
      <div class="elemento-informacion">
        <div class="elemento-titulo">
          ${escapeHtml(u.nombre)}
          <span class="insignia insignia-${u.rol}">${labelRol(u.rol)}</span>
        </div>
        <div class="elemento-meta">${escapeHtml(u.correo)}</div>
      </div>
      <button class="boton boton-peligro" onclick="eliminarUsuario(${u.id})">Eliminar</button>
    </div>
  `).join('');
}

function itemAnimalHTML(a, conBoton) {
  const boton = conBoton
    ? `<button class="boton boton-peligro" onclick="eliminarAnimal(${a.id})">Eliminar</button>`
    : '';
  return `
    <div class="elemento-fila">
      <div class="elemento-informacion">
        <div class="elemento-titulo">
          ${escapeHtml(a.nombre)}
          <span class="insignia insignia-${a.tipo()}">${labelTipo(a.tipo())}</span>
        </div>
        <div class="elemento-meta">${escapeHtml(a.describir())}</div>
      </div>
      ${boton}
    </div>
  `;
}

function labelTipo(tipo) {
  return { mamifero: 'Mamífero', ave: 'Ave', reptil: 'Reptil' }[tipo] || tipo;
}

function labelRol(rol) {
  return { admin: 'Administrador', cuidador: 'Cuidador', veterinario: 'Veterinario' }[rol] || rol;
}

function mostrarAlerta(id) {
  const el = document.getElementById(id);
  el.classList.remove('hidden');
  setTimeout(() => el.classList.add('hidden'), 2500);
}

function escapeHtml(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}