import React from "react";
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import expect from 'expect';
import jestFetch from "jest-fetch-mock";

import {
    addConversion,
    fetchConversions,
    addConversionSuccess,
    addConversionPending,
    addConversionError,
    fetchConversionsSuccess,
    fetchConversionsPending,
    fetchConversionsError,

} from "./index";
import { ADD_CONVERSION_ERROR, FETCH_CONVERSIONS_ERROR } from "./actionTypes";

global.fetch = jestFetch;
const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe("actions", () => {

    describe("addConversion", () => {

        it('should add a conversion', async () => {

            const store = mockStore({});
            const message = "GABRIEL";
            const code = "";

            fetch.mockResponseOnce(JSON.stringify({ message, code, _id: "id" }));

            const expectedActions = [
                addConversionPending({ message, code }),
                addConversionSuccess({ message, code, _id: "id" })
            ];

            await store.dispatch(addConversion({ code, message }));

            expect(store.getActions()).toEqual(expectedActions);

        });

        it(`should return dispatch ${ADD_CONVERSION_ERROR} when fetch returns nok`, async () => {

            const store = mockStore({});
            const message = "GABRIEL";
            const code = "";
            const error = "Oops, algo de errado!";

            fetch.mockRejectOnce(JSON.stringify({}));

            const expectedActions = [
                addConversionPending({ message, code }),
                addConversionError({ error })
            ];

            await store.dispatch(addConversion({ code, message }));

            expect(store.getActions()).toEqual(expectedActions);

        });

        it(`should return dispatch ${ADD_CONVERSION_ERROR} when fetch fails`, async () => {

            const store = mockStore({});
            const message = "GABRIEL";
            const code = "";
            const error = "Oops, algo de errado!";

            fetch.mockResponseOnce(JSON.stringify({}), { status: 400 });

            const expectedActions = [
                addConversionPending({ message, code }),
                addConversionError({ error })
            ];

            await store.dispatch(addConversion({ code, message }));

            expect(store.getActions()).toEqual(expectedActions);

        });

    });

    describe("fetchConversions", () => {

        it('should fetch conversions', async () => {

            const store = mockStore({});
            const page = 0;
            const perPage = 5;
            const response = {
                page,
                perPage,
                total: 1,
                data: { message: "", code: "", _id: "id" }
            };

            fetch.mockResponseOnce(JSON.stringify(response));

            const expectedActions = [
                fetchConversionsPending({ page, perPage }),
                fetchConversionsSuccess(response)
            ];

            await store.dispatch(fetchConversions({ page, perPage }));
            expect(store.getActions()).toEqual(expectedActions);
        });

        it(`should return dispatch ${FETCH_CONVERSIONS_ERROR} when fetch fails`, async () => {

            const store = mockStore({});
            const page = 0;
            const perPage = 5;
            const error = "Oops, algo de errado!";

            fetch.mockRejectOnce({});

            const expectedActions = [
                fetchConversionsPending({ page, perPage }),
                fetchConversionsError({ error })
            ];

            await store.dispatch(fetchConversions({ page, perPage }));
            expect(store.getActions()).toEqual(expectedActions);

        });

        it(`should return dispatch ${FETCH_CONVERSIONS_ERROR} when fetch return nok`, async () => {

            const store = mockStore({});
            const page = 0;
            const perPage = 5;
            const error = "Oops, algo de errado!";

            fetch.mockResponseOnce(JSON.stringify({}), { status: 400 });

            const expectedActions = [
                fetchConversionsPending({ page, perPage }),
                fetchConversionsError({ error })
            ];

            await store.dispatch(fetchConversions({ page, perPage }));
            expect(store.getActions()).toEqual(expectedActions);

        });

    });

    afterAll(() => {
        jest.resetModule();
        global.fetch.mockClear();
        delete global.fetch;
        fetchMock.restore();
    });
});
