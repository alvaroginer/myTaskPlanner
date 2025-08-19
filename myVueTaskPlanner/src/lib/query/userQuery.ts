import {
  collection,
  doc,
  getDoc,
  query,
  setDoc,
  where,
  getDocs,
} from "firebase/firestore";
import { db } from "../auth/auth";
import type { UserData } from "../definitions";
import type { SignUpProps } from "../validations/formValidation";

//CREATE
export const createUserDb = async (userData: SignUpProps, uidKey: string) => {
  try {
    // 1. Verificar si ya existe un usuario con ese email
    const ref = collection(db, "users");
    const q = query(ref, where("email", "==", userData.email));
    const snapshot = await getDocs(q);

    if (!snapshot.empty) {
      throw new Error("Este email ya está en uso");
    }

    // 2. Crear el usuario con ID personalizado
    const newUserRef = doc(ref, uidKey);
    const userDataWithRef = { ...userData, id: uidKey };

    await setDoc(newUserRef, userDataWithRef);

    return userDataWithRef;
  } catch (error: any) {
    throw new Error(error.message || "An error occurred while creating a user");
  }
};

//READ
export const getOneUser = async (userId: string) => {
  try {
    const userSnap = await getDoc(doc(db, "users", userId));

    if (!userSnap.exists()) {
      throw new Error(`Perfil con ID ${userId} no encontrado.`);
    }

    const typedUserSnap: UserData = userSnap.data() as UserData;
    return typedUserSnap;
  } catch (error: any) {
    throw new Error(
      `An error happened while fecthing a user: ${error.message}`
    );
  }
};

export const getOneUserByMail = async (email: string) => {
  try {
    const ref = collection(db, "users");
    const q = query(ref, where("email", "==", email));
    const querySnap = await getDocs(q);

    if (querySnap.empty) {
      throw new Error(`Usuario con email ${email} no encontrado.`);
    }

    // Tomamos el primero que coincida
    const userDoc = querySnap.docs[0];
    const typedUserSnap: UserData = userDoc.data() as UserData;

    return typedUserSnap;
  } catch (error: any) {
    throw new Error(`Error: ${error.message}`);
  }
};
