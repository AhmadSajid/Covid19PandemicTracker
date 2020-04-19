import React, { useEffect, useState } from "react";

import { Image, Dropdown } from "office-ui-fabric-react";
import { PandemicStats } from "./Dashborad";

interface Country {
    name: string;
    iso3Name: string;
}

function parseCountryDetailResponse(response: any): PandemicStats {
    return {
        confirmed: response.confirmed.value,
        recoverd: response.recovered.value,
        deaths: response.deaths.value,
        image: response.image
    };
}


function parseApiResponse(response: any): Country[] {
    return response.countries
        .map((c: any) => ({ name: c.name, iso3Name: c.iso3 }));
}

function CountrySelect() {

    const initialState: Country[] = [];
    const [countries, setCountries] = useState(initialState);
    const [selectedCountry, setSelectedCountry] = useState();

    useEffect(() => {
        fetch("https://covid19.mathdro.id/api/countries")
            .then(res => res.json())
            .then(obj => setCountries(parseApiResponse(obj)))
    }, [selectedCountry])

    const dropdownValues = countries.map((c: any) => ({
        key: c.iso3Name,
        text: c.name
    }));


    const onChange = (e: any, options: any, index: any) => {
        setSelectedCountry(e.target.textContent)
    }


    return (
        <>
            <div className="row">
                <Dropdown
                    placeholder="Select a country"
                    label="Select infected country:"
                    options={dropdownValues}
                    onChange={onChange}
                />


            </div>
            {selectedCountry &&
                <div className="row">
                    <CountryDetail country={selectedCountry} />
                </div>
            }
        </>

    );
}


function CountryDetail(props: any) {

    const intitialState: Partial<PandemicStats> = {};
    const [countryDetail, setCountryDetail] = useState(intitialState);

    useEffect(() => {
        fetch(`https://covid19.mathdro.id/api/countries/${props.country}`)
        .then(res => res.json())
        .then(obj => {
            const detail: any = parseCountryDetailResponse(obj);
            setCountryDetail(detail)
        })
    }, [props.country])


    return (
        <div className="card">
            <div className="card-body">
                <h5 className="card-title">Recovered</h5>
                <p className="card-text">{countryDetail.recoverd}</p>
                <h5 className="card-title">Deaths</h5>
                <p className="card-text">{countryDetail.deaths}</p>
                <h5 className="card-title">Confirmed</h5>
                <p className="card-text">{countryDetail.confirmed}</p>
            </div>
        </div>
    )
}

export default CountrySelect;