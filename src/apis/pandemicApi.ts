import { Country, PandemicStats } from "../models/models";

class PandemicsApi {

    private baseApi = "https://covid19.mathdro.id/api";

    public async getPandemicStats() {
        const json = await this.getResponse(this.baseApi);
        const pandemicStatistics = this.parseStatistics(json);
        return pandemicStatistics;
    }

    public async getCountries() {
        const json = await this.getResponse(`${this.baseApi}/countries`);
        const countries = this.parseCountriesResponse(json);
        return countries;
    }

    public async getCountryDetail(country: string) {
        try {
            const json = await this.getResponse(`${this.baseApi}/countries/${country}`);
            const pandemicStatistics = this.parseStatistics(json);
            return pandemicStatistics;
        }
        catch(ex) {
            console.log(ex);
            alert(ex.error.message)
            return {};
        }
    }

    private parseStatistics(response: any): PandemicStats {
        return {
            confirmed: response.confirmed.value,
            recoverd: response.recovered.value,
            deaths: response.deaths.value,
            image: response.image
        };
    }

    private parseCountriesResponse(response: any): Country[] {
        return response.countries
            .map((c: any) => ({ name: c.name, iso3Name: c.iso3 }));
    }

    private async getResponse(api: string) {
        const response = await fetch(api);
        const json = await response.json();

        if(!response.ok) throw json;

        return json;
    }
}

const PandemicApi = new PandemicsApi();
export { PandemicApi };