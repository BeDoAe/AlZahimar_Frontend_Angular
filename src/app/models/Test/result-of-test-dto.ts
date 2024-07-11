export interface ResultOfTestDTO {
    patientName: string;
    testTitle: string;
    patientScore: number;
    testScore: number;
    dateTaken: Date;
    patientAnswers: { [key: string]: string };
    testAnswers: { [key: string]: string };

}
