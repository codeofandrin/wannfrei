"use client"

import CopyButton from "./CopyButton"

const CANTONS: [string, string][] = [
  ["aargau", "Aargau"],
  ["appenzell-ausserrhoden", "Appenzell A. Rh."],
  ["appenzell-innerrhoden", "Appenzell I. Rh."],
  ["basel-landschaft", "Basel-Landschaft"],
  ["basel-stadt", "Basel-Stadt"],
  ["bern", "Bern"],
  ["freiburg", "Freiburg"],
  ["genf", "Genf"],
  ["glarus", "Glarus"],
  ["graubuenden", "Graubünden"],
  ["jura", "Jura"],
  ["luzern", "Luzern"],
  ["neuenburg", "Neuenburg"],
  ["nidwalden", "Nidwalden"],
  ["obwalden", "Obwalden"],
  ["schaffhausen", "Schaffhausen"],
  ["schwyz", "Schwyz"],
  ["solothurn", "Solothurn"],
  ["st-gallen", "St. Gallen"],
  ["tessin", "Tessin"],
  ["thurgau", "Thurgau"],
  ["uri", "Uri"],
  ["waadt", "Waadt"],
  ["wallis", "Wallis"],
  ["zug", "Zug"],
  ["zuerich", "Zürich"]
]

export default function CantonSlugs() {
  return (
    <div className="mt-20 sm:mt-24" id="kanton-slugs">
      <h2 className="mb-5 text-2xl font-semibold sm:text-3xl">Kanton-Slugs</h2>
      <div className="rounded-2xl border border-neutral-200 p-6 sm:p-8 dark:border-neutral-800">
        <p className="mb-6 text-base text-neutral-500 dark:text-neutral-400">
          Folgende Werte sind als{" "}
          <code className="rounded bg-neutral-100 px-1.5 py-0.5 font-mono text-sm dark:bg-neutral-800">
            {"{canton}"}
          </code>
          -Parameter gültig:
        </p>
        <div className="xs:grid-cols-2 grid grid-cols-1 gap-y-2 sm:grid-cols-3 lg:grid-cols-4">
          {CANTONS.map(([slug, _]) => (
            <div key={slug} className="flex items-center gap-2">
              <CopyButton text={slug} />
              <span className="font-mono text-sm font-medium text-neutral-800 dark:text-neutral-200">
                {slug}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
