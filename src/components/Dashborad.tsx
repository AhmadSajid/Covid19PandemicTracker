import React, { useEffect, useState } from "react";

import { Card } from "semantic-ui-react";

import CountrySelect from "./ContrySelect";
import { PandemicStats } from "../models/models";
import { PandemicApi } from "../apis/pandemicApi";

const StatsCard = (props: any) => (
    <Card>
        <Card.Content>
            <Card.Header>{props.header}</Card.Header>
            <Card.Description>{props.value}</Card.Description>
        </Card.Content>
    </Card>
);

function PandemicStatsComponent() {

    const initialState: Partial<PandemicStats> = {};
    const [stats, setStats] = useState(initialState)

    useEffect(() => {
        const api = new PandemicApi();
        api.getPandemicStats()
            .then(pandemicStats => setStats(pandemicStats))
    }, [])

    return (
        <>
            <div className="jumbotron">

                <h1 className="display-4">Covid-19 Pandemic Tracker</h1>

                <div className="row">
                    <div className="col-sm-12 text-center">
                        {/* <Image src={stats.image} /> */}
                    </div>
                </div>
                <div className="row">
                    <div className="col-sm-4">
                        <StatsCard header="Confirmed" value={stats.confirmed} />
                    </div>
                    <div className="col-sm-4">
                        <StatsCard header="Recovered" value={stats.recoverd} />
                    </div>
                    <div className="col-sm-4">
                        <StatsCard header="Deaths" value={stats.deaths} />
                    </div>
                </div>
            </div>

            <div className="container">
                <CountrySelect />
            </div>
        </>
    );
}

export default PandemicStatsComponent;