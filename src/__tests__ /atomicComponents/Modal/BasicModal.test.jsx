import { runInAction } from 'mobx';
import { render, screen } from 'test-simple-env';
import userEvent from '@testing-library/user-event';
import { mainCanvas } from 'aux/init';
import BasicModal from 'atomicComponents/Modal/BasicModal';

describe('\'atomicComponents/Modal/BasicModal\' test suite', () => {

    const type = 'test-modal';
    const name = 'testModal';
    const onClickMock = jest.fn(() => true);

    test('Got basic props', () => {
        render(
            <BasicModal
                title="Test title"
                closeHandler={onClickMock}
                spec={{ type, name }}
            >
                <p>Hello there!</p>
            </BasicModal>,
        );

        const modal = document.querySelector('.modal');
        const text = screen.getByText('Hello there!');
        const title = screen.getByText('Test title');

        expect(modal).toBeInTheDocument();
        expect(text).toBeInTheDocument();
        expect(title).toBeInTheDocument();

        const closeBtn = document.querySelector('.delete');
        const closeBtn2 = screen.getByText('Close');

        userEvent.click(closeBtn);
        userEvent.click(closeBtn2);

        expect(onClickMock).toHaveBeenCalledTimes(2);
        expect(onClickMock.mock.results[0].value).toBe(true);
    });

    test('Modal is inactive', () => {
        render(
            <BasicModal
                title="Test title"
                closeHandler={onClickMock}
                spec={{ type, name }}
            >
                <p>Hello there!</p>
            </BasicModal>,
        );

        const modal = document.querySelector('.modal.is-active');

        expect(modal).not.toBeInTheDocument();
    });

    test('Modal is active', () => {
        runInAction(() => {
            mainCanvas.setModals(name, {
                type,
                parent: '',
                child: '',
            });
        });

        render(
            <BasicModal
                title="Test title"
                closeHandler={onClickMock}
                spec={{ type, name }}
            >
                <p>Hello there!</p>
            </BasicModal>,
        );

        const modal = document.querySelector('.modal.is-active');

        expect(modal).toBeInTheDocument();
    });

});
