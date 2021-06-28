import { runInAction } from 'mobx';
import { render, screen } from 'test-simple-env';
import userEvent from '@testing-library/user-event';
import { mainCanvas } from 'aux/init';
import SimpleModal from 'atomicComponents/Modal/SimpleModal';

describe('\'atomicComponents/Modal/SimpleModal\' test suite', () => {

    const type = 'test-modal';
    const name = 'testModal';
    const onClickMock = jest.fn(() => true);

    test('Got basic props', () => {
        render(
            <SimpleModal
                closeHandler={onClickMock}
                spec={{ type, name }}
            >
                <p>Hello there!</p>
            </SimpleModal>,
        );

        const modal = document.querySelector('.modal');
        const text = screen.getByText('Hello there!');

        expect(modal).toBeInTheDocument();
        expect(text).toBeInTheDocument();

        const closeBtn = document.querySelector('.modal-close.is-large');

        userEvent.click(closeBtn);

        expect(onClickMock).toHaveBeenCalledTimes(1);
        expect(onClickMock.mock.results[0].value).toBe(true);
    });

    test('Modal is inactive', () => {
        render(<SimpleModal
            closeHandler={onClickMock}
            spec={{ type, name }}
        />);

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

        render(<SimpleModal
            closeHandler={onClickMock}
            spec={{ type, name }}
        />);

        const modal = document.querySelector('.modal.is-active');

        expect(modal).toBeInTheDocument();
    });

});
