import React, { useEffect, useState } from "react";

import { Dropdown, Grid, DropdownProps } from "semantic-ui-react";

import CountryDetail from "./CountryDetail";
import { PandemicApi } from "../apis/pandemicApi";
import { Country } from "../models/models";

function CountrySelect() {

    const [countries, setCountries] = useState<Country[]>([]);
    const [selectedCountry, setSelectedCountry] = useState<string>();

    useEffect(() => {
        PandemicApi
            .getCountries()
            .then(cs => setCountries(cs));
    }, [])

    const dropdownValues = countries.map((c: any) => ({
        key: c.iso3Name,
        text: c.name,
        value: c.name
    }));

    const onChange = (e: any, data: DropdownProps) => {
        setSelectedCountry(data.value?.toString());
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