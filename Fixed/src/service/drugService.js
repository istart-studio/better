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
        drugs.push(drug);
        console.log(drugs);
        BaseStorage.save(KEY, drugs);
    }

    static async getTodayDrugs(loadingFunc) {
        var drugs = await this.getDrugs();
        if (drugs == null) {
            drugs = [];
        }
        loadingFunc(drugs);
    }
}