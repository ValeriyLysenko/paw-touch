import { render, screen } from 'test-simple-env';
import userEvent from '@testing-library/user-event';
import SimpleControl from 'atomicComponents/Control/SimpleControl';

describe('\'atomicComponents/Control/SimpleControl\' test suite', () => {

    test('Got all possible outer props', () => {
        const onClickMock = jest.fn(() => true);

        render(<SimpleControl
            callback={onClickMock}
            text="Test button"
            role="button"
            ariaLabel="Cool test button"
            cssClass="test-class"
            type="button"
            dataType="test-type"
            disabled
        />);

        const button = screen.getByText('Test button');

        expect(button).toBeInTheDocument();
        // We can't call function while element is disabled.
        // So, we just check it status.
        expect(jest.isMockFunction(onClickMock)).toBe(true);
        expect(button).toHaveClass('test-class');
        expect(button).toHaveAttribute('role', 'button');
        expect(button).toHaveAttribute('aria-label', 'Cool test button');
        expect(button).toHaveAttribute('type', 'button');
        expect(button).toHaveAttribute('data-type', 'test-type');
        expect(button).toBeDisabled();
    });

    test('Got all possible outer props (except \'disabled\')', () => {
        const onClickMock = jest.fn(() => true);

        render(<SimpleControl
            callback={onClickMock}
            text="Test button"
            role="button"
            ariaLabel="Cool test button"
            cssClass="test-class"
            type="button"
            dataType="test-type"
        />);

        const button = screen.getByText('Test button');

        expect(button).toBeInTheDocument();

        userEvent.click(button);

        expect(onClickMock).toHaveBeenCalledTimes(1);
        expect(onClickMock.mock.results[0].value).toBe(true);

        expect(button).toHaveClass('test-class');
        expect(button).toHaveAttribute('role', 'button');
        expect(button).toHaveAttribute('aria-label', 'Cool test button');
        expect(button).toHaveAttribute('type', 'button');
        expect(button).toHaveAttribute('data-type', 'test-type');
        expect(button).not.toBeDisabled();
    });

    test('Without outer props)', () => {
        const onClickMock = jest.spyOn(console, 'log');

        render(<SimpleControl />);

        const button = screen.getByText('Default text');

        expect(button).toBeInTheDocument();

        userEvent.click(button);

        expect(onClickMock).toHaveBeenCalledTimes(1);
        expect(onClickMock.mock.results[0].value).toBe(undefined);

        expect(button).not.toHaveClass();
        expect(button).not.toHaveAttribute('role');
        expect(button).toHaveAttribute('aria-label', 'Button');
        expect(button).toHaveAttribute('type', 'button');
        expect(button).not.toHaveAttribute('data-type');
        expect(button).not.toBeDisabled();
    });

});
