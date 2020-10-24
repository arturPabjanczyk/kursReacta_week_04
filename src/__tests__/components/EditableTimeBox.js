import React from "react";
import EditableTimeBox from "../../components/EditableTimeBox";
import {render} from '@testing-library/react'

describe('<EditableTimeBox />', () => {
    it('should fail for now', function () {
        const result = render(<EditableTimeBox />)
        expect(result).toEqual();
    });
})