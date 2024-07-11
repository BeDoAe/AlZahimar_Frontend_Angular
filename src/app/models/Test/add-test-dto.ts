import { AddTestAnswerQuestionDTO } from "./add-test-answer-question-dto";

export interface AddTestDTO {

    Title: string;
    DegreeTest: number;
    TestAnswerQuestions: AddTestAnswerQuestionDTO[];
}
