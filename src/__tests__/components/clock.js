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
        it('shouls render properly', () => {
            expect(clockRenderer.toJSON().type).toMatchSnapshot();
        });
    });
    it('should set className to empty string if not given anything else', () => {
        expect(<Clock minutes={10} seconds={20}/>)
            .toEqual(<Clock className="" minutes={10} seconds={20}/>)
    });
})