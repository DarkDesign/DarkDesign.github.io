import { Developer } from './classes';
import {
    IPersonalInformation,
    ICompilation,
    ISocialNetwork,
    IWorkExperience
} from './classes/developer/interfaces';
import { Types } from './core';


function getPersonalInformation(): IPersonalInformation {
    return {
        name: 'Aleksandr',
        surname: 'Trukhin',
        sex: Types.Sex.Male,
        dateOfBirth: '21.02.1992',
        location: 'Russia, Perm'
    }
}

function getCompilations(): ICompilation[] {
    return [
        {
            name: 'Vue 2',
            numberOfYears: 4.5,
            knowledgeAssessment: Types.KnowledgeAssessment.BeenUsingItForYears,
            additions: [
                'vue-class-component',
                'vue-property-decorator'
            ]
        },
        {
            name: 'TypeScript',
            numberOfYears: 4.5,
            knowledgeAssessment: Types.KnowledgeAssessment.BeenUsingItForYears,
        },
        {
            name: 'Tailwind',
            numberOfYears: 0.7,
            knowledgeAssessment: Types.KnowledgeAssessment.Collide
        }
    ];
}

function getSocialNetworks(): ISocialNetwork[] {
    return [
        {
            name: 'Telegram',
            url: 'https://t.me/DarkPROF'
        }
    ]
}

function getWorkExperience(): IWorkExperience[] {
    return [
        {
            companyName: 'Samokat (Smart Space LLC)',
            description: 'Monitoring team, development of the frontend part of the internal, corporate product.',
            employmentDate: '02.~.2023',
            lengthOfService: '~ years'
        },
        {
            companyName: 'LLC «AXLE»',
            description: 'Development CRM system for small businesses.',
            employmentDate: '02.~.2022',
            lengthOfService: '11 months'
        },
        {
            companyName: 'LLC «TADOS»',
            description: 'Developing configurators in Vue.js and Angular 2+.',
            employmentDate: '06.~.2021',
            lengthOfService: '8 months'
        },
        {
            companyName: 'IMC group',
            description: 'RESTful web API development on Node.js / Express + MongoDB, spa development on Vue.js. Setting up Ubuntu 20.04 servers. Setting up CI/CD.',
            employmentDate: '09.~.2019',
            lengthOfService: '1 years 9 months'
        },
        {
            companyName: 'Individual business',
            description: 'Customer search, small team management, development of php services.',
            employmentDate: '02.~.2016',
            lengthOfService: '3 years 7 months'
        },
        {
            companyName: 'Freelance',
            description: 'Development of php services.',
            employmentDate: '02.~.2015',
            lengthOfService: '1 year'
        }
    ]
}


// TODO: Need to add projects
const frontendDeveloper: Developer = new Developer(
    getPersonalInformation(),
    getCompilations(),
    getSocialNetworks(),
    getWorkExperience(),
    []
)
