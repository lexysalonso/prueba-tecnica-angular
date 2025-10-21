# 🧩 Prueba Técnica — Angular 20 + Angular Material

## 🚀 Descripción
Este proyecto fue desarrollado como parte de una **prueba técnica** para demostrar dominio de **Angular 20**, **Angular Material**, **RxJS** y **buenas prácticas de arquitectura y diseño de componentes**.  

La aplicación consiste en una **gestión de tareas (Task Manager)** que incluye autenticación simulada, manejo de estados reactivos, persistencia local, modo oscuro, notificaciones, y dashboard con métricas visuales.

---

## 🧠 Conocimientos y Habilidades Demostradas

### 🧱 1. Arquitectura y estructura del proyecto
- Uso de **standalone components** (Angular 15+).
- Organización modular con **Lazy Loading** (`/tasks`, `/login`, `/dashboard`).
- Separación por capas: `presentation`, `services`, `models`, `router`.

### ⚙️ 2. Angular Material
- Integración completa del **tema personalizado (custom theme)**.
- Implementación de **modo oscuro (dark mode)** global con `ThemeService`.
- Uso de componentes de Angular Material:
  - `MatTable`, `MatFormField`, `MatDialog`, `MatSnackBar`, `MatButton`, `MatInput`, `MatCard`, `MatIcon`.

### 🔄 3. Reactive Forms y validaciones
- Formularios reactivos con `FormBuilder`.
- Validaciones reactivas (`Validators.required`, `Validators.minLength`).
- Feedback visual de errores.
- Reutilización del formulario para **crear y editar tareas**.

### 💾 4. Simulación de backend y servicios
- Creación de un **TaskService** usando `BehaviorSubject` para mantener el estado global de tareas.
- Simulación de persistencia con **LocalStorage**, imitando operaciones CRUD.
- Métodos:
  - `getTasks()`
  - `addTask()`
  - `updateTask()`
  - `deleteTask()`

### 🧮 5. Observables y RxJS
- Gestión reactiva del estado mediante `BehaviorSubject`.
- Subcripciones centralizadas y limpieza con `Subscription`.
- Actualización automática de vistas (tabla y gráficos) al modificar datos.

### 🧭 6. Routing y Guards
- Configuración de rutas con **lazy loading**.
- Rutas protegidas mediante **AuthGuard**.
- Autenticación simulada con `AuthService` y `BehaviorSubject`.
- Redirecciones condicionales según estado de login.

### 🔐 7. Autenticación simulada
- Login con **ReactiveForm**.
- Persistencia del usuario autenticado en `localStorage`.
- Logout reactivo y redirección a `/login`.

### 🧰 8. Experiencia de usuario (UX)
- Confirmación de eliminación con **MatDialog**.
- Notificaciones con **MatSnackBar** al crear, editar o eliminar tareas.
- Interfaz limpia y responsiva con Angular Material.

### 🌗 9. Dark Mode
- Implementación con `ThemeService` usando `BehaviorSubject`.
- Persistencia del modo (claro/oscuro) en `localStorage`.
- Aplicación global del tema con `body.dark-theme`.

### 📊 10. Dashboard con Gráficos (Chart.js)
- Integración de **chart.js 4.5** y **ng2-charts 8.0**.
- Gráficos dinámicos sincronizados con los datos del `TaskService`.
- Tipos de gráficos implementados:
  - Gráfico de **dona** (porcentaje de tareas por estado).
  - Gráfico de **barras** (comparativo de tareas por estado).

---

## 🧩 Tecnologías Utilizadas

| Tecnología | Uso principal |
|-------------|----------------|
| **Angular 20** | Framework principal |
| **Angular Material** | UI Components y theming |
| **RxJS** | Estado reactivo |
| **Chart.js + ng2-charts** | Dashboard de métricas |
| **SCSS** | Estilos y variables personalizadas |
| **LocalStorage** | Persistencia local |
| **TypeScript** | Tipado estático y buenas prácticas |

---

## 🧪 Funcionalidades principales
- ✅ CRUD completo de tareas.  
- ✅ Filtrado por estado.  
- ✅ Búsqueda por texto.  
- ✅ Validaciones en formularios.  
- ✅ Dark mode persistente.  
- ✅ Dashboard con estadísticas actualizadas en tiempo real.  
- ✅ Autenticación simulada (login/logout).  
- ✅ Notificaciones y diálogos amigables.  

---

## 📸 Vista general

| Pantalla | Descripción |
|-----------|--------------|
| **Login** | Acceso al sistema con Reactive Forms. |
| **Listado de tareas** | Tabla con acciones (editar, eliminar, filtrar, buscar). |
| **Modal de tarea** | Crear/editar con validaciones. |
| **Dashboard** | Gráficos dinámicos de estado de tareas. |
| **Modo oscuro** | Activable y persistente en toda la app. |

---

## 💡 Próximas mejoras
- Integración con **backend real (REST API)**.  
- Manejo avanzado de estado global con **NgRx** o **SignalStore**.  
- Soporte para paginación y ordenamiento.  
- Modo offline con **IndexedDB**.  

---

## 👤 Autor
**Lexys M.**  
Desarrollador Frontend — Angular | TypeScript | RxJS  

