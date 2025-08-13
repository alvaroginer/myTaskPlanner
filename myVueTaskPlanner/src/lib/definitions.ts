export interface UserData {
  firstName: string;
  lastName: string;
  email: string;
  tasks: TaskData[];
  id: string;
}

export type VuexStore = {
  userData: VuexUser | null;
};

export type VuexUser = Pick<
  UserData,
  'email' | 'id' | 'firstName' | 'lastName'
>;

export interface TaskData {
  taskId: string;
  name: string;
  description?: string;
  createdAt: number;
  deadline: number;
  completed: boolean;
}

export interface addTaskFormData {
  name: string;
  description?: string;
  deadline: string;
}

export interface TaskFormErrors {
  name?: string | undefined;
  description?: string | undefined;
  deadline?: string | undefined;
}

export interface TaskFormState {
  success: boolean;
  errors: TaskFormErrors;
}

export const URL_VALENCIA =
  'https://api.open-meteo.com/v1/forecast?latitude=39.4699&longitude=-0.3763&hourly=temperature_2m';
export const URL_REYKJAVIK =
  'https://api.open-meteo.com/v1/forecast?latitude=64.1355&longitude=-21.8954&hourly=temperature_2m';
export const URL_VIRGEN_DE_LA_VEGA =
  'https://api.open-meteo.com/v1/forecast?latitude=40.065&longitude=-1.404&hourly=temperature_2m';
