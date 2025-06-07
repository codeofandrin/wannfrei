import RegionFilterFallback from "@/components/home/RegionFilterFallback"
import HolidaysFallback from "@/components/home/HolidaysFallback"

export default function Loading() {
  return (
    <div>
      <div className="mt-28 sm:mt-36">
        <h1 className="font-brand text-4xl font-[550] sm:text-center sm:text-5xl sm:font-semibold">
          <span className="text-primary-600 dark:text-primary-500">Wann</span> habe ich{" "}
          <span className="text-secondary-600 dark:text-secondary-500">frei</span>?
        </h1>
        <h2 className="mt-8 font-medium text-neutral-500 sm:mt-10 sm:text-center sm:text-xl dark:text-neutral-500">
          Erhalte einen Überblick über nationale, kantonale, gesetzliche und optionale Feiertage in der
          Schweiz.
        </h2>
        <RegionFilterFallback />
      </div>
      <HolidaysFallback />
    </div>
  )
}
