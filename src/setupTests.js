// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom';
import 'jest-canvas-mock';

global.fetch = jest.fn(() => Promise.resolve({
    json: () => Promise.resolve({
        data: 'Any data',
    }),
    ok: true,
}));

beforeEach(() => {
    fetch.mockClear();
});

afterEach(() => {
    jest.clearAllMocks();
});
