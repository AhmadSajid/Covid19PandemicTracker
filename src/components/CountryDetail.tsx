import React, { useState, useEffect } from "react";
import { List, Statistic, Header } from "semantic-ui-react";
import { PandemicStats } from "../models/models";
import { PandemicApi } from "../apis/pandemicApi";

function CountryDetail(props: any) {

    const [countryDetail, setCountryDetail] = useState<PandemicStats>({});

    useEffect(() => {
        PandemicApi.getCountryDetail(props.country)
            .then(countryStats => setCountryDetail(countryStats));
    }, [props.country])

    return (
        <List divided selection>
            <List.Header>
                <Header as="h1" content={props.country.toUpperCase()} />
            </List.Header>
            <List.Item>
                <Statistic label="Confirmed" value={countryDetail.confirmed} />
            </List.Item>
            <List.Item>
                <Statistic label="Recovered" value={countryDetail.recoverd} color="green" />
            </List.Item>
            <List.Item>
                <Statistic label="Deaths" value={countryDetail.deaths} color="red" />
            </List.Item>
        </List>
    );
}

export default CountryDetail;