import * as z from 'zod';
import { isValidFutureDate } from './utils';

export const logInDataSchema = z.object({
  email: z
    .string('El correo es obligatorio')
    .email('Introduce un correo electrónico válido'),
  password: z
    .string('La contraseña es obligatoria')
    .min(8, 'Debe tener al menos 8 caracteres')
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9]).*$/,
      'Debe incluir mayúsculas, minúsculas y un carácter especial'
    ),
});

export const signUpDataSchema = z.object({
  firstName: z.string().min(2, 'El nombre debe tener al menos 2 caracteres'),
  lastName: z.string().min(2, 'El apellido debe tener al menos 2 caracteres'),
  email: z
    .string('El correo es obligatorio')
    .email('Introduce un correo electrónico válido'),
  password: z
    .string('La contraseña es obligatoria')
    .min(8, 'Debe tener al menos 8 caracteres')
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9]).*$/,
      'Debe incluir mayúsculas, minúsculas y un carácter especial'
    ),
});

export const addTaskSchema = z.object({
  name: z
    .string()
    .min(2, 'El nombre debe tener al menos 2 caracteres')
    .max(50, 'El nombre no puede tener más de 50 caracteres')
    .regex(/^(?!\s*$).*$/, 'Introduce un nombre válido'),
  deadline: z.string().refine((val) => isValidFutureDate(val.trim()), {
    message: 'La fecha límite no es válida o no es futura',
  }),
});
