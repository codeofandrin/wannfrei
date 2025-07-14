import { expect } from "vitest"
import { format } from "pretty-format"

expect.extend({
    toBeOneOfShort(received, expected) {
        const pass = expected.includes(received)
        const maxLen = 10
        const previewArr = expected.slice(0, maxLen)
        const preview = format(previewArr, { maxDepth: 1, min: false })
        const more = expected.length > maxLen ? `…(+${expected.length - maxLen} more)` : ""

        return {
            pass,
            message: () => {
                const passedMessage = `Expected value not to be in list`
                const failedMessage = `Expected value to be one of:\n${preview}${more}\n\nReceived:\n"${received}"`

                return pass ? passedMessage : failedMessage
            }
        }
    }
})
