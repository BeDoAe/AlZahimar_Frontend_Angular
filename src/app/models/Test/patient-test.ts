export interface PatientTest {

    // id: number;
    // patientId: number;
    // testId: number;
    // isDeleted: boolean;
    // dateTaken: Date;
    // score: number;
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
  testId: number;
  test: {
    id: number;
    title: string;
    testAnswerQuestions: {
      id: number;
      question: string;
      correctAnswer: string;
      testId: number;
      answers: string[];
      isDeleted: boolean;
    }[];
    isDeleted: boolean;
    patientTests: any[];
    degree: number;
  };
  isDeleted: boolean;
  dateTaken: string;
  score: number;
}

