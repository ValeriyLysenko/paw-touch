import { runInAction } from 'mobx';
import { render, screen, fireEvent } from 'test-simple-env';
import { mainCanvas } from 'aux/init';
import SimpleSlider from 'atomicComponents/Slider/SimpleSlider';

describe('\'atomicComponents/Slider/SimpleSlider\' test suite', () => {

    const text = 'Brush size';

    test('Got proper props', () => {
        render(<SimpleSlider
            type="Brush"
            step={1}
            min={0}
            max={100}
            value={40}
        />);

        const label = screen.getByLabelText(text);
        const input = screen.getByLabelText(
            text,
            { selector: 'input' },
        );
        const output = screen.getByLabelText(
            text,
            { selector: 'output' },
        );

        expect(label).toBeInTheDocument();
        expect(input).toBeInTheDocument();
        expect(output).toBeInTheDocument();
        expect(output).toHaveValue('40');
        expect(input).toHaveClass('slider');
        expect(input).toHaveClass('is-link');
        expect(input).toHaveAttribute('step', '1');
        expect(input).toHaveAttribute('min', '0');
        expect(input).toHaveAttribute('max', '100');
        expect(input).toHaveAttribute('value', '40');
    });

    test('Slider value change handler test', () => {
        render(<SimpleSlider
            type="Brush"
            step={1}
            min={0}
            max={100}
            value={40}
        />);

        const input = document.querySelector('input[type="range"]');
        const expected = '50';

        fireEvent.change(input, {
            target: { value: expected },
        });

        runInAction(() => {
            const activeTool = mainCanvas.getActiveTool;
            expect(activeTool.spec.size).toBe(+expected);
        });

    });

});
