import React, { useEffect, useState } from "react";

import { Card, Label, Image } from "semantic-ui-react";

import CountrySelect from "./ContrySelect";
import { PandemicStats } from "../models/models";
import { PandemicApi } from "../apis/pandemicApi";

const StatsCard = ({ header, value, color }: any) => (
    <Card>
        <Card.Content>
            <Card.Header>{header}</Card.Header>
            <Card.Description>
                <Label content={value} size="massive" color={color} />
            </Card.Description>
        </Card.Content>
    </Card>
);

function PandemicStatsComponent() {

    const [stats, setStats] = useState<PandemicStats>({});

    useEffect(() => {
        PandemicApi
            .getPandemicStats()
            .then(ps => setStats(ps));
    }, []);

    return (
        <>
            <div className="jumbotron">

                <h1 className="display-4">Worldwide Statistics</h1>

                <div className="row">
                    <div className="col-sm-12 text-center">
                        {/* <Image src={stats.image} fluid /> */}
                    </div>
                </div>
                <div className="row">
                    <div className="col-sm-4">
                        <StatsCard header="Confirmed" value={stats.confirmed} />
                    </div>
                    <div className="col-sm-4">
                        <StatsCard header="Recovered" value={stats.recoverd} color="green" />
                    </div>
                    <div className="col-sm-4">
                        <StatsCard header="Deaths" value={stats.deaths} color="red" />

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