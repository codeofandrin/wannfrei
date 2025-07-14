import "vitest"

interface CustomMatchers<R = unknown> {
    toBeOneOfShort: (received) => R
}

declare module "vitest" {
    interface Matchers<T = any> extends CustomMatchers<T> {}
}
