import React, { useState, useEffect } from "react";
import { Card } from "semantic-ui-react";
import { PandemicStats } from "../models/models";
import { PandemicApi } from "../apis/pandemicApi";

function CountryDetail(props: any) {

    const intitialState: Partial<PandemicStats> = {} ;
    const [countryDetail, setCountryDetail] = useState(intitialState);

    useEffect(() => {
        const api = new PandemicApi();
        api.getCountryDetail(props.country)
            .then(countryStats => setCountryDetail(countryStats));
    }, [props.country])


    return (
        <Card>
            <Card.Content>
                <Card.Header>Confirmed</Card.Header>
                <Card.Description>{countryDetail.confirmed}</Card.Description>
                <Card.Header>Recovered</Card.Header>
                <Card.Description>{countryDetail.recoverd}</Card.Description>
                <Card.Header>Deaths</Card.Header>
                <Card.Description>{countryDetail.deaths}</Card.Description>
            </Card.Content>
        </Card>
    );
}

export default CountryDetail;