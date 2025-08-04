import type { addTaskFormData, TaskData, TaskFormState } from "./definitions";
import { isValidFutureDate, generateRandomId } from "./utils";

export const validateAddTaskForm = ({
  name,
  deadline,
  description,
}: addTaskFormData): TaskFormState | TaskData => {
  const nameRegex = /^(?!\s*$).{1,50}$/;
  if (!nameRegex.test(name.trim())) {
    console.log("Entra en la validación de nombre");
    return {
      success: false,
      errors: { name: "Task name must have between 1 and 50 characters" },
    };
  }

  const isValidDate = isValidFutureDate(deadline.trim());
  if (!isValidDate) {
    return {
      success: false,
      errors: { deadline: "Dates must follow the dd/mm/yy format" },
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
