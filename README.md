## 🔗 Enlace de despliegue en Netlify
<!-- Agregar -->

## 📁 Estructura del Proyecto
/src
 ├── /components
 │   └── /pages
 │   │   ├── ItemList.jsx
 │   │   ├── ItemDetail.jsx
 │   │   ├── ItemCreate.jsx
 │   │   ├── ItemEdit.jsx
 │   │   └── NotFound.jsx
 │   └── ItemCard.jsx
 ├── /context
 │   └── ItemContext.jsx
 ├── /Router
 │   └── AppRouter.jsx
 ├── App.jsx
 └── main.jsx

## 🧩 Funcionalidades del Proyecto
<!-- Agregar -->

## 🛠️ Tecnologías utilizadas

-  React con Vite
-  Tailwind CSS
-  Boostrap Icons

### 🔥 ¿Por qué usamos Axios?

Elegimos Axios en lugar de Fetch porque:

- 🔹 Su sintaxis es más limpia y legible.
- 🔹 Convierte automáticamente las respuestas JSON. (con fetch se necesita hacer una conversión).
- 🔹 Maneja automáticamente errores HTTP.
- 🔹 Facilita peticiones concurrentes y uso de interceptores. (En fetch es de forma manual).
- 🔹 Tiene mejor soporte en proyectos medianos y grandes por su flexibilidad.
- 🔹 Tiene soporte con Node.js a diferencia de Fetch.
- 🔹 Soporta cancelación de peticiones, timeouts y configuración global.

###  By: Sayin Gonzalez

➜