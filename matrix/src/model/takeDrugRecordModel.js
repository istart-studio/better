export default class TakeDrugRecordModel {

    static newModel = function (drugInfo, plan) {
        return {
            drugName: drugInfo.drugName,
            amount: drugInfo.amount,
            quantity: drugInfo.quantity,
            takeAmount: plan.amount,
            takeQuantity: plan.quantity,
            planTime: plan.time,
            takeTime: 0,
            enable: true
        }
    };
}