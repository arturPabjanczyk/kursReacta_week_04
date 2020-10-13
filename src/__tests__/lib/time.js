import {getMinutesAndSecondsFromDurationInSeconds} from "../../lib/time"

describe("getMinutesAndSecondsFromDurationInSeconds", () => {
    it("returns 0 minutes and 30 seconds for 30 second duration", () => {
        expect(
            getMinutesAndSecondsFromDurationInSeconds(30)
        ).toEqual([0,30])
    })

    it("returns 30 seconds for 30 second duration", () => {
        expect(
            getMinutesAndSecondsFromDurationInSeconds(30)[1]
        ).toBe(30)
    })

    it("returns 0 minutes for 30 second duration", () => {
        expect(
            getMinutesAndSecondsFromDurationInSeconds(30)[0]
        ).toBe(0)
    })

    it("returns 2 minutes and 20 seconds for 140 second duration", () => {
        expect(
            getMinutesAndSecondsFromDurationInSeconds(140)
        ).toEqual([2,20])
    })
})