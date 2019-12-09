import expect from 'expect';
import { conversionReducer } from './conversionReducer';
import { addConversionSuccess, addConversionPending, addConversionError } from "../actions";
import {
    ADD_CONVERSION_SUCCESS,
    ADD_CONVERSION_ERROR,
    ADD_CONVERSION_PENDING
} from "../actions/actionTypes";

describe("conversionReducer", () => {
    describe('INITIAL_STATE', () => {
        it('should return correct initial state', () => {
            const action = {};
            const initialState = {
                code: "",
                message: "",
                pending: false,
                error: null
            };
            expect(conversionReducer(undefined, action)).toEqual(initialState);
        });
    });

    describe(`${ADD_CONVERSION_SUCCESS}`, () => {
        it('should return correct success state', () => {
            const conversion = {
                _id: "teste",
                code: "8",
                message: "G"
            };
            const action = addConversionSuccess(conversion);
            const { _id, ...state } = conversion;
            expect(conversionReducer(undefined, action)).toEqual({
                ...state,
                pending: false,
                error: null
            });
        });
    });

    describe(`${ADD_CONVERSION_PENDING}`, () => {
        it('should return correct pending state', () => {
            const conversion = {
                _id: "teste",
                code: "8",
                message: "G"
            };
            const action = addConversionPending(conversion);
            const { _id, ...state } = conversion;
            expect(conversionReducer(undefined, action)).toEqual({
                ...state,
                pending: true,
                error: null
            });
        });
    });

    describe(`${ADD_CONVERSION_ERROR}`, () => {
        it('should return correct error state', () => {
            const error = "Oops! Algo deu errado."
            const action = addConversionError({ error });
            expect(conversionReducer(undefined, action)).toEqual({
                code: "",
                message: "",
                pending: false,
                error: error
            });
        });
    });
});