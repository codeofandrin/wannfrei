import Link from "next/link"

import EndpointCard from "./EndpointCard"

const currentYear = new Date().getFullYear()
const yearRangeFrom = `- 5 (${currentYear - 5})`
const yearRangeTo = `+ 20 (${currentYear + 20})`

const HOLIDAYS_RESPONSE_FIELDS = [
  { name: "name", type: "string", description: "Name des Feiertags" },
  { name: "date", type: "string", description: "Datum im ISO-8601-Format (YYYY-MM-DD)" },
  {
    name: "type",
    type: "string",
    description: (
      <>
        <Link href="#feiertagstypen" className="text-primary-600 dark:text-primary-400 hover:underline">
          Feiertagstyp
        </Link>
      </>
    )
  }
]

const MUNICS_RESPONSE_FIELDS = [
  { name: "{munic_slug}", type: "string", description: "Gemeinde-Slug" },
  { name: "{munic_name}", type: "string", description: "Anzeigename der Gemeinde" }
]

const HOLIDAYS_NATIONAL_RESPONSE_EXAMPLE = `[
  {
    "name": "Neujahrstag",
    "date": "2025-01-01",
    "type": "by_law"
  },
  {
    "name": "Karfreitag",
    "date": "2025-04-18",
    "type": "partly_by_law"
  },
  ...
]`

const HOLIDAYS_CANTON_RESPONSE_EXAMPLE = `[
  {
    "name": "Berchtoldstag",
    "date": "2025-01-02",
    "type": "by_law"
  },
  {
    "name": "Auffahrt",
    "date": "2025-05-29",
    "type": "by_law"
  },
  ...
]`

const HOLIDAYS_MUNIC_RESPONSE_EXAMPLE = `[
  {
    "name": "Näfelser Fahrt",
    "date": "2025-04-03",
    "type": "by_law"
  },
  ...
]`

const CANTON_MUNICS_RESPONSE_EXAMPLE = `{
  "{munic_slug}": "{munic_name}",
  ...
}`

const cantonParam = {
  name: "canton",
  required: true,
  type: "string",
  description: "Kanton-Slug",
  values: "Siehe Kanton-Slugs ↓",
  placeholder: "bern",
  hint: (
    <Link href="#kanton-slugs" className="text-primary-600 dark:text-primary-400 hover:underline">
      Alle Kanton-Slugs ansehen ↓
    </Link>
  )
}

const municParam = {
  name: "munic",
  required: true,
  type: "string",
  description: "Gemeinde-Slug",
  values: "Siehe /munics/cantons/{canton}",
  placeholder: "thun"
}

const yearParam = {
  name: "year",
  required: false,
  type: "integer",
  description: "Jahr für welches die Feiertage zurückgegeben werden.",
  values: `aktuelles Jahr ${yearRangeFrom} ...\naktuelles Jahr ${yearRangeTo}`,
  default: `aktuelles Jahr (${currentYear})`,
  placeholder: currentYear.toString()
}

export default function Endpoints() {
  return (
    <div className="mt-20 sm:mt-24">
      <h2 className="mb-8 text-2xl font-semibold sm:text-3xl">Endpoints</h2>
      <div className="space-y-6">
        <EndpointCard
          id="holidays-national"
          method="GET"
          path="/holidays/national"
          title="Nationale Feiertage"
          description="Gibt alle nationalen Feiertage der Schweiz für das angegebene Jahr zurück."
          params={[yearParam]}
          responseFields={HOLIDAYS_RESPONSE_FIELDS}
          responseExample={HOLIDAYS_NATIONAL_RESPONSE_EXAMPLE}
        />
        <EndpointCard
          id="holidays-canton"
          method="GET"
          path="/holidays/cantons/{canton}"
          title="Kantonale Feiertage"
          description="Gibt alle Feiertage für einen bestimmten Kanton zurück."
          params={[cantonParam, yearParam]}
          paramLinks={{ canton: "#kanton-slugs" }}
          responseFields={HOLIDAYS_RESPONSE_FIELDS}
          responseExample={HOLIDAYS_CANTON_RESPONSE_EXAMPLE}
          note="Die nationalen Feiertage sind nicht enthalten und müssen separat über /holidays/national abgefragt werden."
        />
        <EndpointCard
          id="holidays-munic"
          method="GET"
          path="/holidays/cantons/{canton}/munics/{munic}"
          title="Kommunale Feiertage"
          description="Gibt die spezifischen Feiertage einer Gemeinde zurück."
          params={[cantonParam, municParam, yearParam]}
          paramLinks={{ canton: "#kanton-slugs", munic: "#munics-canton" }}
          responseFields={HOLIDAYS_RESPONSE_FIELDS}
          responseExample={HOLIDAYS_MUNIC_RESPONSE_EXAMPLE}
          note="Nicht jeder Kanton hat Gemeinden mit eigenen Feiertagen. Verfügbare Gemeinden können über /munics/cantons/{canton} abgerufen werden."
        />
        <EndpointCard
          id="munics-canton"
          method="GET"
          path="/munics/cantons/{canton}"
          title="Gemeinden eines Kantons"
          description="Gibt alle Gemeinden zurück, die für einen Kanton spezifische Feiertage haben."
          params={[cantonParam]}
          paramLinks={{ canton: "#kanton-slugs" }}
          responseFields={MUNICS_RESPONSE_FIELDS}
          responseExample={CANTON_MUNICS_RESPONSE_EXAMPLE}
        />
      </div>
    </div>
  )
}
