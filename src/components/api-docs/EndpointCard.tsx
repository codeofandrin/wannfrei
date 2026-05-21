"use client"

import { useState } from "react"
import Link from "next/link"
import { BASE_URL } from "./Hero"
import CopyButton from "./CopyButton"

interface Param {
  name: string
  required: boolean
  type: string
  description: string
  values?: string
  default?: string
  placeholder?: string
  hint?: React.ReactNode
}

interface ResponseField {
  name: string
  type: string
  description: React.ReactNode
}

interface EndpointCardProps {
  id?: string
  method: string
  path: string
  title: string
  description: string
  params?: Param[]
  paramLinks?: Record<string, string>
  responseFields?: ResponseField[]
  responseExample: string
  note?: string
}

function CodeBlock({ children }: { children: string }) {
  return (
    <div className="relative">
      <pre className="overflow-x-auto rounded-xl bg-neutral-100 p-4 font-mono text-sm leading-relaxed text-neutral-800 dark:bg-neutral-900 dark:text-neutral-200">
        <code>{children}</code>
      </pre>
    </div>
  )
}

function PathDisplay({ path, paramLinks }: { path: string; paramLinks?: Record<string, string> }) {
  const parts = path.split(/(\{[^}]+\})/)
  return (
    <span className="font-mono text-base">
      {parts.map((part, i) => {
        const match = part.match(/^\{(\w+)\}$/)
        if (match) {
          const paramName = match[1]
          const href = paramLinks?.[paramName]
          if (href) {
            return (
              <Link
                key={i}
                href={href}
                className="text-primary-600 hover:text-primary-500 dark:text-primary-400 dark:hover:text-primary-300 transition-colors">
                {part}
              </Link>
            )
          }
          return (
            <span key={i} className="text-primary-600 dark:text-primary-400">
              {part}
            </span>
          )
        }
        return (
          <span key={i} className="text-neutral-700 dark:text-neutral-300">
            {part}
          </span>
        )
      })}
    </span>
  )
}

function getPathParamNames(path: string): Set<string> {
  return new Set([...path.matchAll(/\{(\w+)\}/g)].map((m) => m[1]))
}

function resolvePath(path: string, values: Record<string, string>): string {
  let resolved = path
  for (const [key, value] of Object.entries(values)) {
    if (value) resolved = resolved.replace(`{${key}}`, encodeURIComponent(value))
  }
  return resolved
}

function buildBodyParams(
  params: Param[],
  values: Record<string, string>,
  path: string
): Record<string, string> {
  const pathParams = getPathParamNames(path)
  const result: Record<string, string> = {}
  for (const p of params) {
    if (pathParams.has(p.name)) continue
    const val = values[p.name]
    if (val) result[p.name] = val
  }
  return result
}

export default function EndpointCard({
  id,
  method,
  path,
  title,
  description,
  params,
  paramLinks,
  responseFields,
  responseExample,
  note
}: EndpointCardProps) {
  const [tryOpen, setTryOpen] = useState(false)
  const [values, setValues] = useState<Record<string, string>>({})
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<{ status: number; body: string } | null>(null)

  function handleChange(name: string, value: string) {
    setValues((prev) => ({ ...prev, [name]: value }))
  }

  async function handleSend() {
    setLoading(true)
    setResult(null)
    const resolvedPath = resolvePath(path, values)
    const bodyParams = params ? buildBodyParams(params, values, path) : null
    const proxyUrl = `/api/proxy/${resolvedPath}`

    try {
      const res = await fetch(proxyUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: bodyParams && Object.keys(bodyParams).length > 0 ? JSON.stringify(bodyParams) : undefined
      })
      const text = await res.text()
      let formatted = text
      try {
        formatted = JSON.stringify(JSON.parse(text), null, 2)
      } catch {}
      setResult({ status: res.status, body: formatted })
    } catch {
      setResult({ status: 0, body: "Netzwerkfehler – konnte keine Verbindung herstellen." })
    } finally {
      setLoading(false)
    }
  }

  const resolvedPreviewPath = resolvePath(path, values)
  const previewUrl = BASE_URL + resolvedPreviewPath
  const previewBodyParams = params ? buildBodyParams(params, values, path) : null
  const previewBody =
    previewBodyParams && Object.keys(previewBodyParams).length > 0
      ? Object.fromEntries(
          Object.entries(previewBodyParams).map(([k, v]) => [k, isNaN(Number(v)) ? v : Number(v)])
        )
      : null
  const isOk = result && result.status >= 200 && result.status < 300

  const pathParamNames = getPathParamNames(path)
  const pathOnlyParams: Param[] = [...pathParamNames]
    .filter((name) => !params?.some((p) => p.name === name))
    .map((name) => ({ name, required: true, type: "string", description: "" }))
  const allParams = [...pathOnlyParams, ...(params ?? [])]
  const missingRequired = allParams.some((p) => p.required && !values[p.name]?.trim())

  return (
    <div id={id} className="rounded-2xl border border-neutral-200 dark:border-neutral-800">
      {/* Header */}
      <div className="p-6 sm:p-8">
        <div className="mb-4 flex flex-wrap items-center gap-3">
          <span className="bg-primary-100 text-primary-700 dark:bg-primary-950 dark:text-primary-400 rounded-md px-2.5 py-0.5 font-mono text-sm font-semibold">
            {method}
          </span>
          <PathDisplay path={path} paramLinks={paramLinks} />
          <CopyButton text={BASE_URL + path} />
        </div>
        <h3 className="mb-2 text-xl font-semibold">{title}</h3>
        <p className="text-base text-neutral-500 dark:text-neutral-400">{description}</p>

        {note && (
          <div className="border-secondary-300 bg-secondary-50 text-secondary-800 dark:border-secondary-800 dark:bg-secondary-950/40 dark:text-secondary-300 mt-5 rounded-xl border px-4 py-3 text-sm">
            <span className="font-semibold">Hinweis: </span>
            {note}
          </div>
        )}
      </div>

      <div className="border-t border-neutral-200 dark:border-neutral-800" />

      {/* Parameters */}
      {params && params.filter((p) => !pathParamNames.has(p.name)).length > 0 && (
        <>
          <div className="p-6 sm:p-8">
            <p className="mb-4 text-xs font-semibold tracking-wider text-neutral-400 uppercase dark:text-neutral-500">
              Parameter
            </p>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead>
                  <tr className="text-xs font-semibold tracking-wider text-neutral-400 uppercase dark:text-neutral-500">
                    <th className="pr-6 pb-3">Name</th>
                    <th className="pr-6 pb-3">Pflicht</th>
                    <th className="pr-6 pb-3">Typ</th>
                    <th className="pr-6 pb-3">Beschreibung</th>
                    <th className="pr-6 pb-3">Werte</th>
                    <th className="pb-3">Default</th>
                  </tr>
                </thead>
                <tbody>
                  {params
                    .filter((p) => !pathParamNames.has(p.name))
                    .map((p) => (
                      <tr key={p.name} className="border-t border-neutral-100 dark:border-neutral-800/60">
                        <td className="py-3 pr-6 align-top">
                          <span className="font-mono text-sm text-neutral-900 dark:text-neutral-100">
                            {p.name}
                          </span>
                        </td>
                        <td className="py-3 pr-6 align-top">
                          {p.required ? (
                            <span className="bg-secondary-100 text-secondary-700 dark:bg-secondary-950 dark:text-secondary-400 rounded px-1.5 py-0.5 font-semibold">
                              ja
                            </span>
                          ) : (
                            <span className="text-neutral-500 dark:text-neutral-400">nein</span>
                          )}
                        </td>
                        <td className="py-3 pr-6 align-top text-neutral-500 dark:text-neutral-400">
                          {p.type}
                        </td>
                        <td className="py-3 pr-6 align-top whitespace-pre text-neutral-600 dark:text-neutral-400">
                          {p.description}
                          {p.hint && <span className="mt-1 block">{p.hint}</span>}
                        </td>
                        <td className="py-3 pr-6 align-top whitespace-pre text-neutral-500 dark:text-neutral-400">
                          {p.values ?? <span className="text-neutral-300 dark:text-neutral-700">—</span>}
                        </td>
                        <td className="py-3 align-top whitespace-pre text-neutral-500 dark:text-neutral-400">
                          {p.default ?? <span className="text-neutral-300 dark:text-neutral-700">—</span>}
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
          <div className="border-t border-neutral-200 dark:border-neutral-800" />
        </>
      )}

      {/* Response */}
      <div className="p-6 sm:p-8">
        <p className="mb-4 text-xs font-semibold tracking-wider text-neutral-400 uppercase dark:text-neutral-500">
          Antwort (200 OK)
        </p>
        {responseFields && responseFields.length > 0 && (
          <div className="mb-4 overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="text-xs font-semibold tracking-wider text-neutral-400 uppercase dark:text-neutral-500">
                  <th className="pr-6 pb-3">Feld</th>
                  <th className="pr-6 pb-3">Typ</th>
                  <th className="pb-3">Beschreibung</th>
                </tr>
              </thead>
              <tbody>
                {responseFields.map((f) => (
                  <tr key={f.name} className="border-t border-neutral-100 dark:border-neutral-800/60">
                    <td className="py-3 pr-6 align-top font-mono text-sm text-neutral-900 dark:text-neutral-100">
                      {f.name}
                    </td>
                    <td className="py-3 pr-6 align-top text-neutral-500 dark:text-neutral-400">{f.type}</td>
                    <td className="py-3 align-top text-neutral-600 dark:text-neutral-400">{f.description}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
        <CodeBlock>{responseExample}</CodeBlock>
      </div>

      <div className="border-t border-neutral-200 dark:border-neutral-800" />

      {/* Try it */}
      <div className="p-6 sm:p-8">
        <button
          onClick={() => {
            setTryOpen((o) => !o)
            setResult(null)
          }}
          className="text-primary-600 hover:text-primary-500 dark:text-primary-400 dark:hover:text-primary-300 flex cursor-pointer items-center gap-2 text-sm font-semibold transition-colors">
          <span
            className={`inline-block transition-transform duration-200 ${tryOpen ? "rotate-90" : "rotate-0"}`}>
            ▶
          </span>
          Ausprobieren
        </button>

        {tryOpen && (
          <div className="mt-5 space-y-4">
            {allParams.map((p) => (
              <div key={p.name}>
                <label className="mb-1.5 block text-sm font-medium text-neutral-700 dark:text-neutral-300">
                  <span className="font-mono">{p.name}</span>
                  {p.required && <span className="ml-1 text-red-500">*</span>}
                </label>
                <input
                  type={p.type === "integer" ? "number" : "text"}
                  value={values[p.name] ?? ""}
                  onChange={(e) => handleChange(p.name, e.target.value)}
                  placeholder={p.placeholder ?? p.name}
                  className="focus:border-primary-500 focus:ring-primary-500/20 w-full rounded-lg border border-neutral-300 bg-white px-3 py-2 font-mono text-sm text-neutral-800 transition-colors outline-none focus:ring-2 sm:max-w-sm dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-200"
                />
              </div>
            ))}

            {/* Request preview */}
            <div className="space-y-2 rounded-lg bg-neutral-50 px-3 py-3 dark:bg-neutral-900">
              <div>
                <div className="mb-1 flex items-center justify-between">
                  <p className="text-xs font-semibold tracking-wider text-neutral-400 uppercase">URL</p>
                  <CopyButton text={previewUrl} />
                </div>
                <p className="font-mono text-xs break-all text-neutral-600 dark:text-neutral-400">
                  {previewUrl}
                </p>
              </div>
              {previewBody && (
                <div>
                  <div className="mb-1 flex items-center justify-between">
                    <p className="text-xs font-semibold tracking-wider text-neutral-400 uppercase">Body</p>
                    <CopyButton text={JSON.stringify(previewBody)} />
                  </div>
                  <p className="font-mono text-xs text-neutral-600 dark:text-neutral-400">
                    {JSON.stringify(previewBody)}
                  </p>
                </div>
              )}
            </div>

            <button
              onClick={handleSend}
              disabled={loading || missingRequired}
              className="border-primary-600 hover:bg-primary-100 dark:hover:bg-primary-600/20 cursor-pointer rounded-full border bg-white px-5 py-2 text-sm font-medium text-neutral-800 transition-colors disabled:cursor-not-allowed disabled:opacity-50 dark:bg-neutral-950 dark:text-neutral-200">
              {loading ? "Wird gesendet…" : "Senden"}
            </button>

            {result && (
              <div>
                <div className="mb-2 flex items-center gap-2">
                  <span
                    className={`rounded-md px-2 py-0.5 font-mono text-sm font-semibold ${
                      isOk
                        ? "bg-green-100 text-green-700 dark:bg-green-950 dark:text-green-400"
                        : "bg-red-100 text-red-700 dark:bg-red-950 dark:text-red-400"
                    }`}>
                    {result.status === 0 ? "Fehler" : result.status}
                  </span>
                </div>
                <CodeBlock>{result.body}</CodeBlock>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
