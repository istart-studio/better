export default class TakeDrugRecordModel {

    static newModel = function (drugInfo, plan) {
        return {
            drugName: drugInfo.drugName,
            amount: drugInfo.amount,
            quantity: drugInfo.quantity,
            takeAmount: plan.amount,
            takeQuantity: plan.quantity,
            planTime: plan.time,
            createTime:new Date().getTime(),
            takeTime: 0,
            state: 0//0:未使用(进行显示)，1：使用，-1：放弃
        }
    };
}