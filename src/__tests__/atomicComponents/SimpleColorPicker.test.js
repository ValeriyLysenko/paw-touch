import { action } from 'mobx';
import { render, screen, fireEvent } from 'test-simple-env';
import userEvent from '@testing-library/user-event';
import { mainCanvas } from 'aux/init';
import SimpleColorPicker from 'atomicComponents/ColorPicker/SimpleColorPicker';

describe('\'atomicComponents/ColorPicker/SimpleColorPicker\' test suite', () => {

    const text = 'Brush color picker';

    test('Got proper label', () => {
        render(<SimpleColorPicker type="Brush" />);
        const label = screen.getByLabelText(text);
        expect(label).toBeInTheDocument();
    });

    test('Got input element with CSS class="is-link"', () => {
        render(<SimpleColorPicker type="Brush" />);
        const input = screen.getByLabelText(
            text,
            { selector: 'input' },
        );
        expect(input).toBeInTheDocument();
        expect(input).toHaveClass('is-link');
    });

    test('Color change handler test', () => {
        render(<SimpleColorPicker type="Brush" />);
        const input = document.querySelector('input[type="color"]');
        const expected = '#ff0000';

        fireEvent.change(input, {
            target: { value: '#ff0000' },
        });

        action('changeColorViaColorPickerAction', () => {
            expect(mainCanvas.activeTool.spec.color).toBe(expected);
        });

    });

});
