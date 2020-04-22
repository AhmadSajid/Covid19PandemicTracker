interface Country {
    name?: string;
    iso3Name?: string;
}

interface PandemicStats {
    confirmed?: number;
    recoverd?: number;
    deaths?: number;
    image?: string;
}

export { Country, PandemicStats };
