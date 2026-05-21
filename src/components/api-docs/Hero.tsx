import CopyButton from "./CopyButton"

export const BASE_URL = "https://api.wannfrei.andrin.software"

export default function Hero() {
  return (
    <div className="mt-28 sm:mt-36">
      <h1 className="font-brand text-4xl font-[550] tracking-tight sm:text-5xl sm:font-semibold">
        <span className="text-primary-600 dark:text-primary-500">A</span>PI{" "}
        <span className="text-secondary-600 dark:text-secondary-500">D</span>okumentation
      </h1>
      <p className="mt-6 max-w-2xl text-lg text-neutral-500 sm:mt-8 dark:text-neutral-400">
        Öffentliche REST API für Schweizer Feiertage. National, kantonal und kommunal.
      </p>
      <div className="mt-6 flex flex-wrap items-center gap-3">
        <span className="font-semibold text-neutral-500 dark:text-neutral-400">Base URL</span>
        <code className="rounded-lg bg-neutral-100 px-3 py-1.5 font-mono text-sm text-neutral-800 dark:bg-neutral-900 dark:text-neutral-200">
          {BASE_URL}
        </code>
        <CopyButton text={BASE_URL} />
      </div>
    </div>
  )
}
