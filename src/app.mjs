/* ─────────────────────────  IMPORTS  ───────────────────────── */
import express from 'express';
import session from 'express-session';
import dotenv from "dotenv";
import dotenvExpand from "dotenv-expand";
import { connectDB } from './config/dbConfig.mjs';
import cors from "cors";

// Import rutas
import routes from './routes/index.mjs'

/* Importaciones
// import path from 'path';
// import { fileURLToPath } from 'url';
// import methodOverride from "method-override"; 
// */

/* ─────────────────────────  ENV  ───────────────────────── */
// 1 ➜ Cargar variables del archivo .env
const env = dotenv.config();
// 2 ➜ expandir interpolaciones
dotenvExpand.expand(env);


/* ──────────────────────────────────────────────────────────────── */
const app = express();
const PORT = process.env.PORT || 3000;


/* ───────────────────────────  CORS  ─────────────────────────── */
//  Configuración de CORS
//  Intercambio de recursos de origen cruzado
const corsOptions = {
  origin: process.env.FRONTEND_URL,   //  URL del frontend
  // credentials: true,  //  Permite enviar cookies
  // methods: ['GET', 'POST', 'PUT', 'DELETE'],
  // allowedHeaders: ['Content-Type', 'Authorization'],
  // exposedHeaders: ['Content-Range', 'X-Content-Range'],
  // credentials: true,
  // maxAge: 86400 // 24 horas en segundos
}

/* CORS ➜ Es donde permitimos y autorizamos a servicios 
   de diferentes dominios a acceder a nuestro servidor */
app.use(cors(corsOptions));


/* ───────────────────────────  SESSION  ─────────────────────────── */
app.use(session({
  secret: 'appPets',  // Clave única y secreta  
  resave: false,  // No guarda la sesión si no se modificó
  saveUninitialized: false,  // Para que no se guarden sesiones vacías
  cookie: {
    httpOnly: true,   // No accesible desde JS del front
    secure: false,  // true si se usa HTTPS
    sameSite: "none",  // "lax", o "none" si front y back tienen distinto dominio
    maxAge: 1000 * 60 * 60 // 1 hora
  }
}));

/* ─────────────────────────  MIDDLEWARE  ───────────────────────── */
//  Middleware para parsear JSON
app.use(express.json());
// Para procesar datos del formulario
// // Middleware para parsear datos de formularios URL-encoded
// app.use(express.urlencoded({ extended: true }));

/* 
  Convierte la URL del módulo en una ruta de archivo (fileURLToPath(import.meta.url))
  y obtiene el directorio del archivo actual (path.dirname(...)) 
*/
// const __dirname = path.dirname(fileURLToPath(import.meta.url));
//  Para mandar put por formulario
// //  Configuración de method-override
// app.use(methodOverride("_method"));
// //  Configuración de express.static
// app.use(express.static(path.join(__dirname, "public")));


/* ───────────────────────────  RUTAS  ─────────────────────────── */
// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'OK', timestamp: new Date() });
});

// Rutas principales de la API
app.use('/api', routes);

// Rutas no encontradas (404)
app.use((req, res) => {
  res.status(404).json({ mensaje: 'Ruta no encontrada' });
});

/* ─────────────────────────────  CONEXIONES  ───────────────────────────── */
// Iniciar conexión a MongoDB
connectDB();

// Iniciar el servidor
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Servidor ejecutándose en el puerto: ${PORT}`);
  console.log('Desde render - ');
  console.log(`Desde VSC - http://localhost:${PORT}`);
});