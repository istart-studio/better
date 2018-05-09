import BaseStorage from "../framework/storage/baseStorage";

const KEY = "DRUGS";
export default class DrugService {

    static async getDrugs() {
        return await BaseStorage.get(KEY).then(value => {
            return JSON.parse(value);
        });
    }

    static async newDrugs(drug) {
        console.log(drug);
        var drugs = await this.getDrugs();
        if (drugs == null) {
            drugs = [];
        }
        var isNewDrug = true;
        for (var i = 0; i < drugs.length; i++) {
            if (drugs[i].drugName == drug.drugName) {
                isNewDrug = false;
                break;
            }
        }
        if (isNewDrug) {
            drugs.push(drug);
            console.log(drugs);
            BaseStorage.save(KEY, drug);
        }
        return isNewDrug;
    }

    static async getTodayDrugs(loadingFunc) {
        var drugs = await this.getDrugs();
        if (drugs == null) {
            drugs = [];
        }
        loadingFunc(drugs);
    }
}