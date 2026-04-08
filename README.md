# 🦁 Sistema de Gestión — Zoológico

Proyecto educativo de **Programación Orientada a Objetos (POO) en JavaScript ES6+**.  
Gestiona animales y usuarios de un zoológico aplicando: clases, herencia, encapsulamiento y polimorfismo.

---

## Estructura del proyecto

```
Sistema-de-Gestion-Zoologico/
├── index.html          # Interfaz principal
├── css/
│   └── styles.css      # Estilos globales
├── js/
│   ├── classes.js      # Clases POO (Animal, Mamifero, Ave, Reptil, Usuario, Zoologico)
│   ├── storage.js      # Funciones de localStorage
│   └── app.js          # Lógica de la UI
└── README.md
```

---

## Conceptos POO aplicados

### Encapsulamiento
Las clases `Animal` y `Usuario` usan **propiedades privadas** (`#`) accesibles solo mediante getters:

```js
class Animal {
  #id; #nombre; #edad; #especie;

  get id()     { return this.#id; }
  get nombre() { return this.#nombre; }
  // ...
}
```

### Herencia
Tres subclases extienden `Animal` con propiedades propias:

```js
class Mamifero extends Animal {
  constructor(id, nombre, edad, especie, pelaje, gestacion) {
    super(id, nombre, edad, especie); // llama al padre
    this.pelaje    = pelaje;
    this.gestacion = gestacion;
  }
}

class Ave extends Animal {
  // envergadura, puedeVolar
}

class Reptil extends Animal {
  // tipoEscama, esVenenoso
}
```

### Polimorfismo
Cada subclase sobreescribe el método `describir()`:

```js
// Animal base
describir() { return `${this.nombre} — ${this.especie}, ${this.edad} año(s)`; }

// Mamifero
describir() { return `${super.describir()} | Pelaje: ${this.pelaje}`; }

// Ave
describir() { return `${super.describir()} | Envergadura: ${this.envergadura}cm`; }
```

### Patrón Repository (clase Zoologico)
Centraliza el acceso a los datos con propiedades privadas:

```js
class Zoologico {
  #animales = [];
  #usuarios = [];

  agregarAnimal(animal) { this.#animales.push(animal); }
  getAnimales()         { return [...this.#animales]; }
  eliminarAnimal(id)    { this.#animales = this.#animales.filter(a => a.id !== id); }
}
```

---

## localStorage

Los datos persisten entre recargas usando `localStorage`:

| Función                        | Descripción                                  |
|-------------------------------|----------------------------------------------|
| `guardarAnimales(animales)`   | Serializa y guarda el arreglo de animales    |
| `guardarUsuarios(usuarios)`   | Serializa y guarda el arreglo de usuarios    |
| `obtenerAnimales()`           | Deserializa y reconstruye instancias de clase|
| `obtenerUsuarios()`           | Reconstruye instancias de Usuario            |
| `actualizarStorage(zoo)`      | Persiste el estado completo del zoológico    |
| `cargarDesdeStorage(zoo)`     | Restaura el estado al iniciar la app         |

---

## Cómo ejecutar

1. Clona el repositorio:
   ```bash
   git clone https://github.com/ygarciafwd-design/Sistema-de-Gestion-Zoologico.git
   ```
2. Abre `index.html` directamente en tu navegador.  
   No requiere servidor ni dependencias externas.

---

## Tecnologías

- HTML5
- CSS3 (variables, grid, responsive)
- JavaScript ES2022 (clases, propiedades privadas `#`, spread, arrow functions)
