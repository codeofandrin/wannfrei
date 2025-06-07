import { useRouter as useNextRouter, useSearchParams } from "next/navigation"
import { type NavigateOptions } from "next/dist/shared/lib/app-router-context.shared-runtime"

interface customPushParamsType {
    pathname: string
    query?: { key: string; value: string } | undefined
    options?: NavigateOptions | undefined
}

export default function useRouter() {
    const { push: nextPush, ...rest } = useNextRouter()
    const searchParams = useSearchParams()

    function customPush({ pathname, query, options }: customPushParamsType) {
        const params = new URLSearchParams(searchParams.toString())
        if (query) {
            params.set(query.key, query.value)
        }
        const queryParams = params.size > 0 ? `?${params.toString()}` : ""
        console.log(queryParams)
        nextPush(`${pathname}${queryParams}`, options)
    }

    return { ...rest, push: customPush }
}
