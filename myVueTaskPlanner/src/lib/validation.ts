import type { addTaskFormData, TaskData, TaskFormState } from './definitions';
import { isValidFutureDate, generateRandomId } from './utils';
import { getOneUserByMail } from './query/userQuery';
import { logInDataSchema, addTaskSchema } from './validationSchemas';
import { email } from 'zod';
//import { signInWithEmailAndPassword } from 'firebase/auth';

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

  const validateUser = await getOneUserByMail(formData.email);
};
