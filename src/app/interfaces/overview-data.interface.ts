import { ChangeType } from "../enums/change-type.enum";

export interface OverviewData {
    text: string;
    changeType: ChangeType;
    value: number;
    periodDelta: number;
}