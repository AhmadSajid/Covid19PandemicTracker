import React, { useEffect, useState } from "react";

import { Dropdown, Grid } from "semantic-ui-react";

import CountryDetail from "./CountryDetail";
import { PandemicApi } from "../apis/pandemicApi";
import { Country } from "../models/models";

function CountrySelect() {

    const initialState: Country[] = [];
    const [countries, setCountries] = useState(initialState);
    const [selectedCountry, setSelectedCountry] = useState();


    useEffect(() => {
        const api = new PandemicApi();
        api.getCountries()
        .then(cs => setCountries(cs))
        .catch(err => console.log(err));
    }, [selectedCountry])

    const dropdownValues = countries.map((c: any) => ({
        key: c.iso3Name,
        text: c.name,
        value: c.name
    }));

    const onChange = (e: any, data: any) => {
        setSelectedCountry(e.target.textContent)
    }

    return (
        <Grid>
            <Grid.Row>
                <Grid.Column width={8}>
                    <Dropdown
                        fluid
                        placeholder="Select a country"
                        search
                        selection
                        options={dropdownValues}
                        onChange={onChange}
                    />
                </Grid.Column>

                <Grid.Column width={8}>
                    {selectedCountry &&
                        <CountryDetail country={selectedCountry} />
                    }
                </Grid.Column>
            </Grid.Row>
        </Grid>

    );
}

export default CountrySelect;