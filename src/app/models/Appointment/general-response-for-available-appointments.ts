import { AvailableAppointment } from "./available-appointment";

export interface GeneralResponseForAvailableAppointments {
  isSuccess: boolean;
  data: AvailableAppointment[];
}
