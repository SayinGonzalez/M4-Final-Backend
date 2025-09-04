import mongoose from "mongoose";

export async function connectDB() {
    const uri = process.env.MONGODB_URI; // 🔹 verificar que no sea undefined
    if (!uri) throw new Error("MONGODB_URI no está definido en las variables de entorno");

    try {
        const conn = await mongoose.connect(uri);
        console.log(`✅ Conexión exitosa a MondgoDB: ${conn.connection.host}`);
    } catch (error) {
        console.error('❌ Error al conectar a MongoDB', error);
        process.exit(1);
    }
}



/* 
────────────────────────────────────────────────────────────
PRUEBA CONEXIÓN CON MongoDB
────────────────────────────────────────────────────────────

connectDB(); // Intenta conectar

// Opcional: cerrar la conexión luego de unos segundos para probar el ciclo
setTimeout(async () => {
    await mongoose.disconnect();
    console.log("✅ Desconectado de MongoDB");
    process.exit(0);
    }, 2000);

────────────────────────────────────────────────────────────
*/

/* 
    🔒 2. Enmascarar valores sensibles
    Podés reemplazar parte de la clave con asteriscos antes de loguearla:

    const maskedPassword = process.env.PASSWORD.replace(/.(?=.{4})/g, '*');
    console.log(`Usuario: ${process.env.USER}, Password: ${maskedPassword}`);

    log -> Usuario: user123, Password: ********reta


    🛡 3. Usar una función centralizada de logs seguros
    Creá un helper que bloquee automáticamente campos sensibles:

    function safeEnvLog(env) {
    const safe = { ...env };
    if (safe.PASSWORD) safe.PASSWORD = '********';
    if (safe.USER) safe.USER = safe.USER.slice(0, 2) + '***';
    return safe;
    }

    console.log(safeEnvLog(process.env));


    🔐 4. Configurar variables fuera de logs (Producción)
    En producción, directamente evitá cualquier log relacionado a credenciales. Usá NODE_ENV para condicionar logs:

    if (process.env.NODE_ENV === "development") {
    console.log("Conexión con usuario:", process.env.USER);
    }

*/