import React from "react";
import Clock from "../../components/Clock"
import renderer from "react-test-renderer"

var clockRenderer = null;

describe('<Clock />', () => {
    describe('when given minutes and seconds (TestRenderer)', () => {
        beforeEach(() => {
            clockRenderer = renderer.create(
                <Clock minutes={10} seconds={20}/>
            )
        })
        it('should render a h2 element', () => {
            console.log(clockRenderer.toJSON());
            expect(clockRenderer.toJSON().type).toEqual("h2");
        });
        it('should set a Clock className', () => {
            expect(clockRenderer.toJSON().props).toMatchObject({"className": expect.stringMatching(/Clock/)});
        });
        it('should render time properly', () => {
            expect(clockRenderer.toJSON().children[1].children).toEqual(expect.arrayContaining(["10"]));
        });
    });
    it('should set className to empty string if not given anything else', () => {
        expect(<Clock minutes={10} seconds={20}/>)
            .toEqual(<Clock className="" minutes={10} seconds={20}/>)
    });
})