import { JSDOM } from 'jsdom';
import CanvasStore from 'stores/CanvasStore';
import {
    makeFirstUppercase, resizeCanvasToDisplaySize, http, getFormData, uniOnOpenHandler,
} from 'libs/lib';

describe("'libs/lib' test suite", () => {

    test.each([
        ['example', 'Example'],
        ['Example', 'Example'],
        ['eXAMPLE', 'EXAMPLE'],
        ['', ''],
        ['!', '!'],
        ['9', '9'],
        ['*', '*'],
    ])('makeFirstUppercase(str)', (given, expected) => {
        expect(makeFirstUppercase(given)).toBe(expected);
    });

    /**
     * TODO
     */
    test('getMaxWindowSize()', () => {
    });

    /**
     * TODO
     */
    test('isMaxWindowSize()', () => {
    });

    test('resizeCanvasToDisplaySize()', () => {
        /**
         * Preparations
         */
        const dom = new JSDOM('');
        const canvas1 = dom.window.document.createElement('canvas');
        const canvas2 = dom.window.document.createElement('canvas');

        canvas1.width = 300;
        canvas1.height = 150;
        Object.defineProperty(canvas1, 'clientWidth', { value: 1920 });
        Object.defineProperty(canvas1, 'clientHeight', { value: 1080 });

        canvas2.width = 1920;
        canvas2.height = 1080;
        Object.defineProperty(canvas2, 'clientWidth', { value: 1920 });
        Object.defineProperty(canvas2, 'clientHeight', { value: 1080 });

        /**
         * Testing
         */
        expect(resizeCanvasToDisplaySize(canvas1)).toBe(true);
        expect(resizeCanvasToDisplaySize(canvas2)).toBe(false);
    });

    test('http() - Success', async () => {
        const data = await http('any/url', {});
        const expected = {
            body: {
                data: 'Any data',
            },
            error: null,
        };

        expect(fetch).toHaveBeenCalledTimes(1);
        expect(data).toStrictEqual(expected);
    });

    test('http() - Error', async () => {
        fetch.mockImplementationOnce(() => Promise.reject('Some error has happened')); /* eslint-disable-line */

        const data = await http('any/url', {});
        const expected = {
            body: null,
            error: 'Some error has happened',
        };

        expect(fetch).toHaveBeenCalledTimes(1);
        expect(data).toStrictEqual(expected);
    });

    /**
     * TODO
     */
    test('canvasToBlob()', () => {
    });

    /**
     * TODO
     */
    test('sendBlobToServer()', () => {
    });

    /**
     * TODO
     */
    test('resizeImage()', () => {
    });

    /**
     * TODO
     */
    test('resizeImageToString()', () => {
    });

    /**
     * TODO
     */
    test('uniCloseHandler()', () => {
    });

    test('uniOnOpenHandler()', () => {
        const storeInst = new CanvasStore();
        const spec = {
            type: 'test-modal',
            parent: '',
            child: '',
        };
        const expected = {
            testModal: spec,
        };

        uniOnOpenHandler(
            storeInst,
            'testModal',
            spec,
        );

        expect(storeInst.modals).toStrictEqual(expected);
    });

    test('getFormData()', () => {
        /**
         * Preparations
         */
        const dom = new JSDOM('');
        const form = dom.window.document.createElement('form');

        const text = dom.window.document.createElement('input');
        text.name = 'title';
        text.type = 'text';
        text.value = 'Test text';

        const checkbox = dom.window.document.createElement('input');
        checkbox.name = 'isTest';
        checkbox.type = 'checkbox';
        checkbox.checked = true;

        const checkbox2 = dom.window.document.createElement('input');
        checkbox2.id = 'isTest2';
        checkbox2.type = 'checkbox';
        checkbox2.checked = false;

        const textarea = dom.window.document.createElement('textarea');
        textarea.name = 'descr';
        textarea.value = 'Test description';

        form.append(text, checkbox, checkbox2, textarea);

        /**
         * Testing
         */
        const expected = {
            title: 'Test text',
            isTest: true,
            isTest2: false,
            descr: 'Test description',
        };

        expect(getFormData(form)).toStrictEqual(expected);
    });
});
