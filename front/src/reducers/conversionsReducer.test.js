import expect from 'expect';
import { conversionsReducer } from './conversionsReducer';
import { fetchConversionsSuccess, fetchConversionsPending, fetchConversionsError, addConversionSuccess } from "../actions";
import {
    ADD_CONVERSION_SUCCESS,
    FETCH_CONVERSIONS_SUCCESS,
    FETCH_CONVERSIONS_ERROR,
    FETCH_CONVERSIONS_PENDING
} from "../actions/actionTypes";

describe("conversionsReducer", () => {
    describe('INITIAL_STATE', () => {
        it('should return correct initial state', () => {
            const action = {};
            const initialState = {
                page: 0,
                perPage: 5,
                total: 0,
                data: [],
                pending: false,
                error: null
            };
            expect(conversionsReducer(undefined, action)).toEqual(initialState);
        });
    });

    describe(`${FETCH_CONVERSIONS_SUCCESS}`, () => {
        it('should return correct success state', () => {
            const params = {
                data: [{
                    _id: "teste",
                    code: "8",
                    message: "G"
                }],
                total: 1
            };
            const state = {
                ...params,
                page: 0,
                perPage: 5,
                pending: false,
                error: null
            };
            const action = fetchConversionsSuccess(params);
            expect(conversionsReducer(undefined, action)).toEqual(state);
        });
    });

    describe(`${FETCH_CONVERSIONS_PENDING}`, () => {
        it('should return correct pending state', () => {
            const params = {
                page: 0,
                perPage: 5
            };
            const action = fetchConversionsPending(params);
            expect(conversionsReducer(undefined, action)).toEqual({
                ...params,
                pending: true,
                error: null,
                data: [],
                total: 0
            });
        });
    });

    describe(`${FETCH_CONVERSIONS_ERROR}`, () => {
        it('should return correct error state', () => {
            const error = "Oops! Algo deu errado."
            const state = {
                data: [],
                page: 0,
                perPage: 5,
                total: 0,
                pending: false,
                error: error
            };
            const action = fetchConversionsError({ error });
            expect(conversionsReducer(undefined, action)).toEqual(state);
        });
    });

    describe(`${ADD_CONVERSION_SUCCESS}`, () => {
        it('should add a new conversion to data array', () => {
            const conversion = {
                _id: "teste",
                code: "8",
                message: "G"
            };
            const state = {
                data: [conversion],
                page: 0,
                perPage: 5,
                total: 1,
                error: null,
                pending: false
            };
            const action = addConversionSuccess(conversion);
            expect(conversionsReducer(undefined, action)).toEqual(state);
        });
    });
});