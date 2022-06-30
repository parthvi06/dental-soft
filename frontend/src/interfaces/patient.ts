export interface IPatient {
  id?: string;
  _id?: string;
  img?: string | ArrayBuffer;
  profileImg?: string | ArrayBuffer;
  name: string;
  lastName?: string;
  fullName?: string;
  number: string;
  phone?: string;
  age?: number;
  gender: string;
  address?: string;
  status?: string;
  lastVisit?: string;
  birthDate?: string;
  email?: string;
  street?: string;
  city?: string;
  state?: string;
  pincode?: number
}

export interface IAppointment {
  // id?: string;
  _id?: string;
  img?: string;
  title?: string;
  email?: string;
  number?: string;
  start?: string;
  fromTo?: string;
  doctor?: string;
  injury?: string;
  from?: string;
  to?: string;
  date?: string
}

export interface IBilling {
  _id?: string;
  billNo?: number;
  billDate?: string;
  patient?: string;
  doctor?: string;
  charges?: number;
  tax?: number;
  discount?: number;
  total?: number;
}

export interface IDepartment {
  img: string;
  title: string;
  desc: string;
  team: string[];
}
