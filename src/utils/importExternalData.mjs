import axios from 'axios';
import mongoose from 'mongoose';
import Country from "../models/Country.mjs";
import { connectDB } from '../config/dbConfig.mjs';
import fs from 'fs';


try {
    // Conectar a la base
    await connectDB();
    console.log('✅ Conectado a la base de datos');

    // Consumir API
    const { data } = await axios.get('https://restcountries.com/v3.1/all');

    const countriesFiltered = data
        // Filtrar los paises que tengan como mínimo el español
        .filter(country => country.languages?.spa)
        .map(pais => {
            // Desestructuración con rest (...resto) para eliminar los campos especificados
            const {
                translations,
                tld,
                cca2,
                ccn3,
                cca3,
                cioc,
                idd,
                altSpellings,
                car,
                coatOfArms,
                postalCode,
                demonyms,
                ...resto
            } = pais;

            // Agregar campo "creador"
            return {
                ...resto,
                creador: "Sayii"
            };
        });

    console.log(countriesFiltered);

    /* fs.writeFileSync('countries_filtered.json', JSON.stringify(countriesFiltered, null, 2));
    console.log('Archivo guardado como countries_filtered.json'); */

    /* // Buscar duplicados
    const existentes = await YourModel.find({
        API: { $in: filtered.map(e => e.API) }
    }).lean();

    const yaExisten = new Set(existentes.map(e => e.API));
    const nuevos = filtered.filter(e => !yaExisten.has(e.API));

    if (nuevos.length === 0) {
        console.log('ℹ️ No hay nuevos datos para importar.');
    } else { }*/
     
    if (!Array.isArray(data)) throw new Error('La API no devolvió un array válido');

    await Country.insertMany(countriesFiltered);
    console.log(`✅ Se importaron ${countriesFiltered.length} nuevos registros.`);

    await mongoose.disconnect();
    console.log('✅ Desconectado de la base de datos');

} catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
}

