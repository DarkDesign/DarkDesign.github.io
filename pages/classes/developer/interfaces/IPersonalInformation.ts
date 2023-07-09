import { Types } from "../../../core";

export interface IPersonalInformation {
    readonly name: string;
    readonly surname: string;
    readonly sex: Types.Sex;
    readonly dateOfBirth: string | null;
    readonly location: string;
}
