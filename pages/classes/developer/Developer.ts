import { Project } from '../project/Project';
import { ICompilation, IPersonalInformation, ISocialNetwork, IWorkExperience } from './interfaces';

export class Developer {

    public constructor(
        public readonly personal: IPersonalInformation,
        public readonly compilations: ICompilation[],
        public readonly socialNetworks: ISocialNetwork[],
        public readonly workExperience: IWorkExperience[],
        public readonly project: Project[]
    ) {}

}
