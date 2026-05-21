export default function HolidayTypes() {
  return (
    <div className="mt-20 sm:mt-24" id="feiertagstypen">
      <h2 className="mb-5 text-2xl font-semibold sm:text-3xl">Feiertagstypen</h2>
      <div className="overflow-hidden rounded-2xl border border-neutral-200 dark:border-neutral-800">
        <table className="w-full text-base">
          <thead className="bg-neutral-50 dark:bg-neutral-900">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-semibold tracking-wider text-neutral-400 uppercase dark:text-neutral-500">
                Wert
              </th>
              <th className="hidden px-6 py-3 text-left text-xs font-semibold tracking-wider text-neutral-400 uppercase sm:table-cell dark:text-neutral-500">
                Beschreibung
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-neutral-200 dark:divide-neutral-800">
            <tr>
              <td className="px-6 py-4 font-mono text-sm text-neutral-800 dark:text-neutral-200">by_law</td>
              <td className="hidden px-6 py-4 text-neutral-500 sm:table-cell dark:text-neutral-400">
                Gesetzlich anerkannter Feiertag. Arbeitnehmer haben Anspruch auf freien Tag.
              </td>
            </tr>
            <tr>
              <td className="px-6 py-4 font-mono text-sm text-neutral-800 dark:text-neutral-200">
                partly_by_law
              </td>
              <td className="hidden px-6 py-4 text-neutral-500 sm:table-cell dark:text-neutral-400">
                Je nach Kanton oder Gemeinde gesetzlich anerkannt.
              </td>
            </tr>
            <tr>
              <td className="px-6 py-4 font-mono text-sm text-neutral-800 dark:text-neutral-200">optional</td>
              <td className="hidden px-6 py-4 text-neutral-500 sm:table-cell dark:text-neutral-400">
                Freier Tag liegt im Ermessen des Arbeitgebers.
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  )
}
