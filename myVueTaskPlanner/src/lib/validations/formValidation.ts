import type { addTaskFormData, TaskData, TaskFormState } from "../definitions";
import { generateRandomId } from "../utils";
import { getOneUserByMail } from "../query/userQuery";
import { logInDataSchema, addTaskSchema } from "./validationSchemas";
import { authKey } from "../auth/auth";
import { signInWithEmailAndPassword } from "firebase/auth";

type LogInProps = {
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
