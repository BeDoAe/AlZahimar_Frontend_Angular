import { StoryTestAnswersQuestionsDTO } from "./story-test-answers-questions-dto";

export interface StoryDTOs {


  storyId: number;
  storyImageUrl: string;
  storyDescription: string;
  storySoundPath: string;
  storyDegree: number;
  storyQuestionAndAnswers: StoryTestAnswersQuestionsDTO[];
}
