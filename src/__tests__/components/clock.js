import React from "react";
import Clock from "../../components/Clock"

describe('<Clock />', () => {
    it('should set className to empty string if not given anything else', function () {
        expect(<Clock minutes={10} seconds={20}/>)
            .toEqual(<Clock className="" minutes={10} seconds={20} />)
    });
})