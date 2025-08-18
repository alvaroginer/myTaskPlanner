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

//CREATE
export const createUserDb = async (userData: UserData) => {
  try {
    const userRef = collection(db, "users");
    const newUserRef = doc(userRef);
    const userDataWithRef = { ...userData, id: newUserRef.id };

    await setDoc(newUserRef, userDataWithRef);
    console.log(
      "Event created in FireBase with the following data",
      userDataWithRef
    );
    return userDataWithRef.id;
  } catch {
    throw new Error("An error occurred while creating a user");
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
