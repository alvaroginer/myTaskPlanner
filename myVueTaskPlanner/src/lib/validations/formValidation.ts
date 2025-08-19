import type { addTaskFormData, TaskData, TaskFormState } from "../definitions";
import { generateRandomId } from "../utils";
import { getOneUserByMail, createUserDb } from "../query/userQuery";
import {
  logInDataSchema,
  addTaskSchema,
  signUpDataSchema,
} from "./validationSchemas";
import { authKey } from "../auth/auth";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";

type LogInProps = {
  email: string;
  password: string;
};

export type SignUpProps = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
};

export const validateAddTaskForm = ({
  name,
  deadline,
  description,
}: addTaskFormData): TaskFormState | TaskData => {
  const result = addTaskSchema.safeParse({ name, deadline, description });
  if (!result.success) {
    return {
      success: false,
      errors: {
        name: result.error.flatten().fieldErrors.name?.[0],
        deadline: result.error.flatten().fieldErrors.deadline?.[0],
      },
    };
  }

  const actualDate = new Date().getTime();
  const validFormData = {
    name: name.trim(),
    deadline: Number(deadline.trim()),
    createdAt: actualDate,
    completed: false,
    taskId: generateRandomId(),
  };

  if (description) {
    return { ...validFormData, description: description };
  }

  return validFormData;
};

export const validateLoginForm = async (formData: LogInProps) => {
  const result = logInDataSchema.safeParse(formData);

  if (!result.success) {
    return {
      errors: {
        email: result.error.flatten().fieldErrors.email?.[0],
        password: result.error.flatten().fieldErrors.password?.[0],
      },
    };
  }

  try {
    const validateUser = await getOneUserByMail(formData.email);

    await signInWithEmailAndPassword(
      authKey,
      formData.email,
      formData.password
    );

    return validateUser;
  } catch (error: any) {
    return {
      errors: {
        login:
          error.message ?? "Problemas de inicio de sesión, vuelve a intentarlo",
      },
    };
  }
};

export const validateSignupForm = async (formData: SignUpProps) => {
  const result = signUpDataSchema.safeParse(formData);

  if (!result.success) {
    return {
      errors: {
        firstName: result.error.flatten().fieldErrors.firstName?.[0],
        lastName: result.error.flatten().fieldErrors.lastName?.[0],
        email: result.error.flatten().fieldErrors.email?.[0],
        password: result.error.flatten().fieldErrors.password?.[0],
      },
    };
  }

  try {
    const userCredential = await createUserWithEmailAndPassword(
      authKey,
      formData.email,
      formData.password
    );

    const uidKey = userCredential.user.uid;

    const newUser = await createUserDb(formData, uidKey);

    return newUser;
  } catch (error: any) {
    return {
      errors: {
        signup:
          error.message ?? "Problemas de inicio de sesión. Vuelve a intentarlo",
      },
    };
  }
};
