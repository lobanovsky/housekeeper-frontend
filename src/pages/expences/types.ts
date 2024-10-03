import { GroupOfPayment } from '../../backend/services/backend';

export interface CounterpartyData {
    data: GroupOfPayment[],
    total: number,
    totalSum: number
}
