import { PatientStoryTest } from "./patient-story-test";

export interface SubmitStoryTestResponse {
  // isSuccess: boolean;
  // data: PatientStoryTest;
  id: number;
  patientId: number;
  patient: {
    id: number;
    firstName: string;
    lastName: string;
    age: number;
    address: string;
    isDeleted: boolean;
    appointments: any[];
    gender: number;
  };
  storyTestId: number;
  storyTest: {
    id: number;
    imageUrl: string;
    description: string;
    soundPath: string;
    storyQuestionAndAnswers: {
      id: number;
      question: string;
      correctAnswer: string;
      storyTestId: number;
      answers: string[];
      isCorrected: boolean;
      isDeleted: boolean;
    }[];
    patientStoryTests: any[];
    isDeleted: boolean;
    degree: number;
  };
  isDeleted: boolean;
  score: number;
}


