import { HolidayType } from "./enums"

export const cantons = {
    AG: "Aargau",
    AR: "Appenzell Ausserrhoden",
    AI: "Appenzell Innerrhoden",
    BL: "Basel-Landschaft",
    BS: "Basel-Stadt",
    BE: "Bern",
    FR: "Freiburg",
    GE: "Genf",
    GL: "Glarus",
    GR: "Graubünden",
    JU: "Jura",
    LU: "Luzern",
    NE: "Neuenburg",
    NW: "Nidwalden",
    OW: "Obwalden",
    SH: "Schaffhausen",
    SZ: "Schwyz",
    SO: "Solothurn",
    SG: "St. Gallen",
    TI: "Tessin",
    TG: "Thurgau",
    UR: "Uri",
    VD: "Waadt",
    VS: "Wallis",
    ZG: "Zug",
    ZH: "Zürich"
}

export const staticCantonHolidayDates: Record<
    string,
    Array<{ name: string; date: string | null; type: HolidayType }>
> = {
    AG: [
        { name: "Neujahrstag", date: "01.01", type: HolidayType.legal },
        { name: "Berchtoldstag", date: "02.01", type: HolidayType.legal },
        { name: "Karfreitag", date: null, type: HolidayType.legal },
        { name: "Ostermontag", date: null, type: HolidayType.legal },
        { name: "Tag der Arbeit", date: "01.05", type: HolidayType.legal },
        { name: "Auffahrt", date: null, type: HolidayType.legal },
        { name: "Pfingstmontag", date: null, type: HolidayType.legal },
        { name: "Fronleichnam", date: null, type: HolidayType.legal },
        { name: "Bundesfeier", date: "01.08", type: HolidayType.legal },
        { name: "Mariä Himmelfahrt", date: "15.08", type: HolidayType.legal },
        { name: "Allerheiligen", date: "01.11", type: HolidayType.legal },
        { name: "Mariä Empfängnis", date: "08.12", type: HolidayType.legal },
        { name: "Weihnachtstag", date: "25.12", type: HolidayType.legal },
        { name: "Stephanstag", date: "26.12", type: HolidayType.legal }
    ],
    AR: [],
    AI: [],
    BL: [],
    BS: [],
    BE: [],
    FR: [],
    GE: [],
    GL: [],
    GR: [],
    JU: [],
    LU: [],
    NE: [],
    NW: [],
    OW: [],
    SH: [],
    SZ: [],
    SO: [],
    SG: [],
    TI: [],
    TG: [],
    UR: [],
    VD: [],
    VS: [],
    ZG: [],
    ZH: []
}

export const staticNationalHolidays = {}
