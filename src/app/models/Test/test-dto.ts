import { TestAnswerQuestionDTO } from "./test-answer-question-dto";

export interface TestDTO {
    testId: number;
    title: string;
    degreeTest: number;
    testAnswerQuestions: TestAnswerQuestionDTO[];
    answers?: string[];
}
