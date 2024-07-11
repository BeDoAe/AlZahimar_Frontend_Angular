export interface StoryQuestionAndAnswer {
  id: number;
  question: string;
  correctAnswer: string;
  storyTestId: number;
  answers: string[];
  isCorrected: boolean;
  isDeleted: boolean;
}
