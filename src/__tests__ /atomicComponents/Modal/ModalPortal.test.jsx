import { render, screen } from 'test-app-env';
import ModalPortal from 'atomicComponents/Modal/ModalPortal';

describe('\'atomicComponents/Modal/ModalPortal\' test suite', () => {

    test('Got basic props', () => {
        render(
            <ModalPortal>
                <p>Portal test</p>
            </ModalPortal>,
        );

        const modalWrapper = document.getElementById('pt-modals-wrapper');
        const modal = modalWrapper.querySelector('div');
        const text = screen.getByText('Portal test');

        expect(modalWrapper).toBeInTheDocument();
        expect(modal).toBeInTheDocument();
        expect(text).toBeInTheDocument();
    });

});
