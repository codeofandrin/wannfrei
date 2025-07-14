import { expect, test } from "vitest"

import { munics } from "@/utils/constants"
import municHolidays from "@/data/municHolidays"

test("all munics in munic holidays", () => {
    for (const canton in munics) {
        const cantonMunics = munics[canton as keyof typeof munics]
        for (const cantonMunic in cantonMunics) {
            expect.soft(canton).toBeOneOfShort(Object.keys(municHolidays))
            expect.soft(cantonMunic).toBeOneOfShort(Object.keys(municHolidays[canton]))
        }
    }
})
