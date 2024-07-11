import { TimeSlot } from "./time-slot";

export interface AvailableAppointment {
  date: string;
  availableSlots: TimeSlot[];
}
