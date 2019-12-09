import React from "react";

jest.mock('react-dom', () => {
    return { render: jest.fn() };
});

import ReactDOM from 'react-dom';
import App from "./index";

describe("index", () => {

    it('renders without crashing', () => {
        const div = document.createElement('div');
        global.document.getElementById = (id) => id === 'root' && div
        expect(ReactDOM.render).toHaveBeenCalled();
    });

    afterAll(() => {
        jest.resetModule();
    });
});