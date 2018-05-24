import DrugService from "./drugService";
import TakeDrugRecordModel from "../model/takeDrugRecordModel";
import BaseStorage from "../framework/storage/baseStorage";

const RECORDS_KEY = "DRUGS_RECORD";

export default class TakeDrugService {

    /**
     * 今日用药数量变化：数量变化，属性变化
     * @returns {Promise<*>}
     */
    static async getTodayDrugs() {
        let drugPlans = [];
        const drugs = await DrugService.getDrugs();
        for (const index in drugs) {
            const drug = drugs[index];
            const plan = drug.plan;
            plan.forEach(planDetail => {
                if (planDetail.enable) {
                    drugPlans.push(TakeDrugRecordModel.newModel(drug, planDetail));
                }
            })
        }


        let drugRecords = await TakeDrugService.getRecords();
        for (const index in drugRecords) {
            const record = drugRecords[index];
            //todo:已经服用的药品不在出现今日用药列表中(服用，本次不服用)
        }

        drugPlans.sort((a, b) => {
            return parseFloat(a.planTime) - parseFloat(b.planTime);
        });


        return drugPlans;
    }

    static async take(drugRecord) {
        let drugPlans = await TakeDrugService.getTodayDrugs();
        for (let index in drugPlans) {
            const drugPlan = drugPlans[index];
            if (drugPlan.drugName === drugRecord.drugName &&
                drugPlan.planTime === drugRecord.planTime) {

                drugPlan.takeTime = new Date();

                drugRecord.takeTime = new Date();

                TakeDrugService.saveRecord(drugRecord);
            }
        }
        BaseStorage.update(TODAY_PLAN_KEY,)
    }

    static async getRecords() {
        return BaseStorage.get(RECORDS_KEY);
    }

    static async saveRecord(drugRecord) {
        console.log(drugRecord);
        BaseStorage.get(RECORDS_KEY).then(records => {
            if (!records) {
                records = [];
            }
            records.push(drugRecord);
            BaseStorage.save(RECORDS_KEY, records);
        });
    }
}