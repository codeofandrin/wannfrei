import { expect, test } from "vitest"

import { staticPageMunics, munics } from "@/utils/constants"

test("all staticPageMunics in munics", () => {
    const allMunics = []
    for (const canton in munics) {
        const cantonMunics = munics[canton as keyof typeof munics]
        for (const cantonMunic in cantonMunics) {
            allMunics.push(cantonMunic)
        }
    }

    for (const staticPageMunic of staticPageMunics) {
        expect.soft(staticPageMunic).toBeOneOfShort(allMunics)
    }
})
