export default class DrugInfoModel {

    static newModel = function () {
        return {
            version: "0.0.1",
            drugName: "",
            amount: 0,
            quantity: '',
            price: 0.0,
            vendor: "",
            plan: [],
        }
    };

    static newPlan = function (time, amount, quantity, enable) {
        return {
            time: time,
            amount: amount,
            quantity: quantity,
            enable: enable,
        };
    }
}