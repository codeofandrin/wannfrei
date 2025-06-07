export default function HolidaysFallback() {
  let holidayRows = []
  for (let i = 0; i < 5; i++) {
    holidayRows.push(
      <tr key={i}>
        <td className="flex py-4 pl-4 sm:pl-8">
          <div className="h-5 w-14 animate-pulse rounded-full bg-neutral-200 sm:h-6 sm:w-20 dark:bg-neutral-800" />
        </td>
        <td>
          <div className="h-5 w-32 animate-pulse rounded-full bg-neutral-200 sm:h-6 sm:w-44 dark:bg-neutral-800" />
        </td>
        <td>
          <div className="h-5 w-28 animate-pulse rounded-full bg-neutral-200 sm:h-6 sm:w-32 dark:bg-neutral-800" />
        </td>
        <td className="pr-4 sm:pr-8">
          <div className="h-5 w-20 animate-pulse rounded-full bg-neutral-200 sm:h-6 sm:w-24 dark:bg-neutral-800" />
        </td>
      </tr>
    )
  }

  return (
    <div className="mt-24 flex flex-col">
      <h1 className="font-brand text-2xl font-medium sm:text-center sm:text-3xl">
        Feiertage für{" "}
        <span className="text-primary-800 dark:text-primary-200 animate-pulse font-bold">. . .</span>
      </h1>
      {/* Filters */}
      <div className="mt-8 sm:mt-14 sm:flex sm:items-center sm:justify-between">
        <div className="sm:flex sm:w-1/2 sm:items-center">
          <div className="flex w-32 animate-pulse cursor-not-allowed justify-center rounded-full border-1 border-neutral-300 bg-neutral-300 px-5 py-3 font-medium text-transparent sm:w-28 sm:py-2 dark:border-neutral-800 dark:bg-neutral-800">
            placeholder
          </div>
          <div className="mt-3 flex w-48 animate-pulse cursor-not-allowed justify-center rounded-full border-1 border-neutral-300 bg-neutral-300 px-5 py-3 font-medium text-transparent sm:mt-0 sm:ml-3 sm:w-44 sm:py-2 dark:border-neutral-800 dark:bg-neutral-800">
            placeholder
          </div>
          <div className="mt-3 flex w-48 animate-pulse cursor-not-allowed justify-center rounded-full border-1 border-neutral-300 bg-neutral-300 px-5 py-3 font-medium text-transparent sm:mt-0 sm:ml-3 sm:w-44 sm:py-2 dark:border-neutral-800 dark:bg-neutral-800">
            placeholder
          </div>
        </div>
        <div className="mt-3 flex w-full animate-pulse cursor-not-allowed justify-center rounded-full border-1 border-neutral-300 bg-neutral-300 px-5 py-3 font-medium text-transparent sm:mt-0 sm:w-0 sm:py-2 dark:border-neutral-800 dark:bg-neutral-800">
          placeholder
        </div>
      </div>
      {/* Holidays Table */}
      <div className="mt-5">
        <div className="relative max-h-[500px] overflow-scroll rounded-lg border-1 border-neutral-300 shadow-lg sm:max-h-[600px] dark:border-neutral-800 dark:shadow-xl dark:shadow-neutral-900/50">
          <table className="w-full min-w-[600px]">
            <thead className="sticky top-0 bg-neutral-200 dark:bg-neutral-700">
              <tr className="font-semibold">
                <td className="relative py-4 pl-4 sm:pl-8">
                  <p>Datum</p>
                  <div className="absolute bottom-0 left-0 h-[1px] w-full bg-neutral-300 dark:bg-neutral-800" />
                </td>
                <td className="relative">
                  <p>Feiertag</p>
                  <div className="absolute bottom-0 left-0 h-[1px] w-full bg-neutral-300 dark:bg-neutral-800" />
                </td>
                <td className="relative">
                  <p>Wochentag</p>
                  <div className="absolute bottom-0 left-0 h-[1px] w-full bg-neutral-300 dark:bg-neutral-800" />
                </td>
                <td className="relative pr-4 sm:pr-8">
                  <p>Typ</p>
                  <div className="absolute bottom-0 left-0 h-[1px] w-full bg-neutral-300 dark:bg-neutral-800" />
                </td>
              </tr>
            </thead>
            <tbody>{holidayRows}</tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
