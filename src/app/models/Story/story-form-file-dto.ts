import { AddStoryQuestionAnswerDTOs } from "./add-story-question-answer-dtos";

export interface StoryFormFileDto {

  storyImageUrl: File;
  storyDescription: string;
  storySoundPath: File;
  storyDegree: number;
  storyTestAnswerQuestions: AddStoryQuestionAnswerDTOs[];
}
