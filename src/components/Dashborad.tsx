import React, { useEffect, useState } from "react";

import { Image, Dropdown } from "office-ui-fabric-react";
import CountrySelect from "./ContrySelect";


export interface PandemicStats {
    confirmed: number;
    recoverd: number;
    deaths: number;
    image?: string;
}


function parseApiResponse(response: any): PandemicStats {
    return {
        confirmed: response.confirmed.value,
        recoverd: response.recovered.value,
        deaths: response.deaths.value,
        image: response.image
    };
}


const Card = (props: any) => (
    <div className="card">
        <div className="card-body">
            <h5 className="card-title">{props.header}</h5>
            <p className="card-text">{props.value}</p>
        </div>
    </div>
);


function PandemicStatsComponent() {

    const initialState: Partial<PandemicStats> = {};
    const [stats, setStats] = useState(initialState)


    useEffect(() => {
        fetch("https://covid19.mathdro.id/api")
            .then(res => res.json())
            .then(obj => setStats(parseApiResponse(obj)))
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
                        <Card header="Confirmed" value={stats.confirmed} />
                    </div>
                    <div className="col-sm-4">
                        <Card header="Recovered" value={stats.recoverd} />
                    </div>
                    <div className="col-sm-4">
                        <Card header="Deaths" value={stats.deaths} />
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