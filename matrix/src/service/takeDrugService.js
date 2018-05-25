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
        //从药品计划中获取今日预计用药
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
        //根据今日的用药记录匹配未服用的用药计划
        const drugRecords = await TakeDrugService.getRecords();
        const now = new Date();
        const today = new Date();
        today.setFullYear(now.getFullYear(), now.getMonth(), now.getDate());
        today.setHours(0,0,0,0);
        const tomorrow = new Date();
        tomorrow.setFullYear(now.getFullYear(), now.getMonth(), now.getDate() + 1);
        tomorrow.setHours(0,0,0,0);
        const startTimeStamp = today.getTime();
        const endTimeStamp = tomorrow.getTime();
        for (const index in drugRecords) {
            const todayDrugRecord = drugRecords[index];
            if (todayDrugRecord.createTime >= startTimeStamp && todayDrugRecord.createTime <= endTimeStamp) {
                //已经用过不再提醒
                drugPlans.forEach(drugPlan => {
                    if (todayDrugRecord.drugName === drugPlan.drugName
                        && todayDrugRecord.takeAmount === drugPlan.takeAmount
                        && todayDrugRecord.takeQuantity === drugPlan.takeQuantity) {
                        drugPlan.state = todayDrugRecord.state;
                    }
                });
            }
        }

        //排序
        drugPlans.sort((a, b) => {
            return parseFloat(a.planTime) - parseFloat(b.planTime);
        });


        return drugPlans;
    }

    static async take(drugRecord, abandon) {
        let drugPlans = await TakeDrugService.getTodayDrugs();
        for (let index in drugPlans) {
            const drugPlan = drugPlans[index];
            if (drugPlan.drugName === drugRecord.drugName &&
                drugPlan.planTime === drugRecord.planTime) {

                if (abandon !== -1) {
                    drugRecord.state = 1;
                    drugRecord.takeTime = new Date();
                } else {
                    drugRecord.state = -1;
                }
                TakeDrugService.saveRecord(drugRecord);
            }
        }
    }

    static async getRecords() {
        return await BaseStorage.get(RECORDS_KEY).then(records => {
            return JSON.parse(records);
        });
    }

    static async saveRecord(drugRecord) {
        console.log(drugRecord);
        TakeDrugService.getRecords().then(records => {
            if (!records) {
                records = [];
            }
            records.push(drugRecord);
            BaseStorage.save(RECORDS_KEY, records);
        });
    }
}