import { Types } from '../../../core';

export interface ICompilation {
    readonly name: string;
    readonly numberOfYears: number;
    readonly knowledgeAssessment: Types.KnowledgeAssessment;
    readonly additions?: ( string | ICompilation )[];
}
