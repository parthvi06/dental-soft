export interface IPatient {
  id?: string;
  _id?: any;
  img?: string | ArrayBuffer;
  profileImg?: string | ArrayBuffer;
  name?: string | any;
  lastName?: string;
  fullName?: string;
  number?: string;
  phone?: string;
  age?: number;
  gender?: string;
  address?: string;
  status?: string;
  lastVisit?: string;
  birthDate?: string;
  email?: string;
  house_no?: string;
  street?: any;
  city?: any;
  state?: string;
  pincode?: number;
  prescription?: string;
  complaint?: any;
  findings?: any;
  investigation?: any;
  diagnosis?: any;
  notes?: any;
  surface?: string,
  top?: string,
  pop?: string,
  sensitivity?: string,
  conclusion?: string,
  price?: number,
  discount?: number,
  totalprice?: number,
  treatment?: string,
  drug?:string
  am?:string,
  noon?:string,
  pm?:string,
  totalqty?:string,
  food?:string,
  instruction?:string;
  treatmentCheckbox?:any
  treatmentPrice?:number,
  treatmentDiscount?: number,
  treatmentTotal?: number,
 
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
  date?: string;
  end?:string
  
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
export interface IEventCalendar {
  _id: string;
  id?: string;
  title: string;
  treatment: string;
  backgroundColor: string;
  textColor: string;
  end: string;
  start: string;
  user: string;
}

export const mapEventCalendar = (eventCalendar: IEventCalendar) => ({
  ...eventCalendar,
  id: eventCalendar?._id,
});

export const mapArrayEventCalendar = (listEventsCalendar: IEventCalendar[]) => {
  const listEventsCalendarFormated = listEventsCalendar.map((eventCalendar) => mapEventCalendar(eventCalendar));

  return listEventsCalendarFormated;
};
