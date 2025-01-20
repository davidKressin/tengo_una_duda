import { push, ref, set } from "firebase/database";
import { database } from '../firebaseConfig'; // Ajusta la ruta según donde tengas tu firebaseConfig.js

export const writeDudaData = async (body) => {
    const newDudaRef = push(ref(database, 'dudas')); // Genera un nuevo ID automáticamente
  
    let {
      titulo,
      duda,
      name,
      email,
      materia,
      metodo,
      recompensa } = body;
  
    await set(
      newDudaRef, {
      titulo,
      duda,
      name,
      email,
      materia,
      metodo,
      recompensa,
      paidToken: "",
      paid: false
    }
    );
  
    console.log(body, newDudaRef.key);
    // return newDudaRef.key;
  }
  