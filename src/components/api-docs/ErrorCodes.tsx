function CodeBlock({ children }: { children: string }) {
  return (
    <pre className="overflow-x-auto rounded-xl bg-neutral-100 p-4 font-mono text-sm text-neutral-800 dark:bg-neutral-900 dark:text-neutral-200">
      <code>{children}</code>
    </pre>
  )
}

export default function ErrorCodes() {
  return (
    <div className="mt-20 sm:mt-24">
      <h2 className="mb-5 text-2xl font-semibold sm:text-3xl">Errors</h2>
      <div className="space-y-4">
        <div className="rounded-2xl border border-neutral-200 p-6 sm:p-8 dark:border-neutral-800">
          <div className="mb-4 flex flex-wrap items-center gap-3">
            <span className="rounded-md bg-red-100 px-2 py-0.5 font-mono text-sm font-semibold text-red-700 dark:bg-red-950 dark:text-red-400">
              4xx
            </span>
            <span className="font-medium">Client Error</span>
          </div>
          <p className="mb-4 text-base text-neutral-500 dark:text-neutral-400">
            Ungültige Pfadparameter (unbekannter Kanton, Gemeinde) oder ungültiger Jahreswert.
          </p>
          <CodeBlock>{`{
  "detail": {
    "msg": "canton 'invalid-canton' not found"
  }
}`}</CodeBlock>
        </div>
        <div className="rounded-2xl border border-neutral-200 p-6 sm:p-8 dark:border-neutral-800">
          <div className="mb-4 flex flex-wrap items-center gap-3">
            <span className="rounded-md bg-red-100 px-2 py-0.5 font-mono text-sm font-semibold text-red-700 dark:bg-red-950 dark:text-red-400">
              500
            </span>
            <span className="font-medium">Server Error</span>
          </div>
          <p className="mb-4 text-base text-neutral-500 dark:text-neutral-400">Unerwartete Serverfehler.</p>
          <CodeBlock>{`{
  "msg": "Internal Server Error"
}`}</CodeBlock>
        </div>
      </div>
    </div>
  )
}
