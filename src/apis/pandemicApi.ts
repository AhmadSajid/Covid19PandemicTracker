// import { Country, PandemicStats } from "../models/models";


interface Country {
    name: string;
    iso3Name: string;
}

interface PandemicStats {
    confirmed: number;
    recoverd: number;
    deaths: number;
    image?: string;
}

class PandemicApi {

    private baseApi = "https://covid19.mathdro.id/api";
    private countriesApi = `${this.baseApi}/countries`;
    private countryDetailApi = `${this.countriesApi}/`;

    public async getPandemicStats() {
        const json = await this.getResponse(this.baseApi);
        const pandemicStatistics = this.parseStatistics(json);
        return pandemicStatistics;
    }

    public async getCountries() {
        const json = await this.getResponse(this.countriesApi);
        const countries = this.parseCountriesResponse(json);
        return countries;
    }

    public async getCountryDetail(country: string) {
        try {
            const json = await this.getResponse(`${this.countryDetailApi}${country}`);
            const pandemicStatistics = this.parseStatistics(json);
            return pandemicStatistics;
        }
        catch {
            console.log("error");
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
        return json;
    }
}

export { PandemicApi };