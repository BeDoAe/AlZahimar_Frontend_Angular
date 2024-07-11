export interface DoctorEditDTO {
  FirstName: string;
  LastName: string;
  UserName: string;
  Address: string;
  Phone: string;
  CardNumber: number;
  Age: number;
  Gender:number;
  Image?:File;
  WorksIn?: string;
  History?: string;
  Price?: number;
}

// Default values for DoctorEditDTO
export const defaultDoctorEditDTO: DoctorEditDTO = {
  FirstName: '',
  LastName: '',
  UserName: '',
  Address: '',
  Phone: '',
  CardNumber: 0,
  Age: 0,
  WorksIn: '',
  History: '',
  Price: 0,
  Gender: 0,
  Image: undefined
};
