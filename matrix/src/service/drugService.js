import BaseStorage from "../framework/storage/baseStorage";

const KEY = "DRUGS";
export default class DrugService {

    static async getDrugs() {
        let drugs = await BaseStorage.get(KEY).then(value => {
            return JSON.parse(value);
        });
        if (drugs == null || !Array.isArray(drugs)) {
            drugs = [];
        }
        return drugs;
    }

    static async newDrugs(drug) {
        console.log(drug);
        let drugs = await DrugService.getDrugs();

        let isNewDrug = true;
        for (let i = 0; i < drugs.length; i++) {
            console.log(drug.drugName);
            if (drugs[i].drugName === drug.drugName) {
                isNewDrug = false;
                break;
            }
        }
        if (isNewDrug) {
            drugs.push(drug);
            console.log(drugs);
            BaseStorage.save(KEY, drugs);
        }
        return isNewDrug;
    }

    static async getTodayDrugs() {
        return DrugService.getDrugs();
    }

    static async deleteDrug(drug) {
        let drugs = await DrugService.getDrugs();
        const newDrugs = [];
        for (let i = 0; i < drugs.length; i++) {
            console.log(drug.drugName);
            if (drugs[i] != null && drugs[i].drugName !== drug.drugName) {
                newDrugs.push(drugs[i]);
            }
        }
        BaseStorage.save(KEY, newDrugs);
        return true;
    }

    static async clearDrugs(){
        BaseStorage.save(KEY,[]);
    }
}