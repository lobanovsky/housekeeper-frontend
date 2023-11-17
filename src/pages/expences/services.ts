import {GroupOfPayment, OutgoingGropingPaymentsFilter, PaymentService} from "../../backend/services/backend";
import {ActionCallbackWithData} from "../../utils/types";
import {showError} from "../../utils/notifications";
import {CounterpartyData} from "./types";

// export interface ExpensesResponse {
//     data: Array<GroupOfPayment & {id: string}>,
//     total: number,
//     totalSum: number
// }
export const loadExpensesByDates = (requestParams: OutgoingGropingPaymentsFilter, onFinish: ActionCallbackWithData<CounterpartyData>) => {
    PaymentService.findOutgoingPaymentsGroupingByCounterparty({body: requestParams})
        .then((loadedData: GroupOfPayment[]) => {
            const totalSum = loadedData.reduce((accum, {total: categoryTotal = 0}) => accum + categoryTotal, 0);
            onFinish(true, {
                data: loadedData.map((item) => ({
                    ...item,
                    id: item.name || ''
                })),
                total: loadedData.length,
                totalSum
            });
        })
        .catch(e => {
            onFinish(false);
            showError('Не удалось загрузить траты', e);
        })
}
