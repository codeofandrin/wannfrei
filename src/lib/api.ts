import axios, { AxiosResponse } from "axios"

import { URL } from "@/utils/constants"

interface APIErrorDataType {
    status_code: number
    msg: string
}

interface APIRequestResponseType {
    isError: boolean
    errorData: APIErrorDataType | null
    successData: any | null
}

const client = axios.create({
    baseURL: URL.apiBaseUrl
})

async function request(
    method: string,
    url: string,
    data?: Record<string, any>,
    headers?: Record<string, any>
): Promise<APIRequestResponseType> {
    const config = { method, url, data, headers }

    let isError = false
    let response: AxiosResponse | null = null
    try {
        response = await client.request(config)
    } catch (err: any) {
        isError = true
        response = err.response
    }

    let errorData: APIErrorDataType | null = null
    if (isError) {
        if (response && response.status >= 400 && response.status < 500) {
            errorData = {
                status_code: response.status,
                msg: response.data["msg"]
            }
        }
    }

    return { isError, errorData, successData: response?.data }
}

export async function getCantonMunics(canton: string): Promise<APIRequestResponseType> {
    return await request("GET", `/munics/cantons/${canton}`)
}

export async function getNationalHolidays(year: number | null = null): Promise<APIRequestResponseType> {
    const payload = { year }
    const headers = { "Content-Type": "application/json" }

    return await request("GET", "/holidays/national", payload, headers)
}

export async function getCantonHolidays(
    cantonID: string,
    year: number | null = null
): Promise<APIRequestResponseType> {
    const payload = { canton: cantonID, year }
    const headers = { "Content-Type": "application/json" }
    return await request("GET", `/holidays/cantons/${cantonID}`, payload, headers)
}

export async function getMunicHolidays(
    cantonID: string,
    municID: string,
    year: number | null = null
): Promise<APIRequestResponseType> {
    const payload = { canton: cantonID, munic: municID, year }
    const headers = { "Content-Type": "application/json" }
    return await request("GET", `/holidays/cantons/${cantonID}/munics/${municID}`, payload, headers)
}
