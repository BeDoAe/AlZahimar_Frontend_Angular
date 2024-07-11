import { PatientStoryTest } from "./patient-story-test";
import { StoryQuestionAndAnswer } from "./story-question-and-answer";

export interface StoryTest {

  id: number;
  imageUrl: string;
  description: string;
  soundPath: string;
  storyQuestionAndAnswers: StoryQuestionAndAnswer[];
  patientStoryTests: PatientStoryTest[];
  isDeleted: boolean;
  degree: number;
}
