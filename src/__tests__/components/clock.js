import React from "react";
import Clock from "../../components/Clock"
import ReactDOM from "react-dom"

var root = null;

describe('<Clock />', () => {
    describe('when given minutes and seconds', () => {
        beforeEach(() => {
            root = document.createElement("div");
            ReactDOM.render(
                <Clock minutes={10} seconds={20}/>, root
            )
        })
        it('should render a h2 element', () => {
            expect(root.childNodes[0].nodeName).toEqual("H2")
        });
        it('should set a Clock className', () => {
            expect(root.childNodes[0].className).toMatch(/Clock/)
        });
        it('should render time properly', () => {
            expect(root.childNodes[0].textContent).toMatch(/10:20/)
        });
    });
    it('should set className to empty string if not given anything else', function () {
        expect(<Clock minutes={10} seconds={20}/>)
            .toEqual(<Clock className="" minutes={10} seconds={20}/>)
    });
})