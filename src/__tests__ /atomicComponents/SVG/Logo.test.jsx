import { render } from 'test-simple-env';
import Logo from 'atomicComponents/SVG/Logo';

describe('\'atomicComponents/SVG/Logo\' test suite', () => {

    test('Got proper props', () => {
        const ref = {
            current: null,
        };

        render(<Logo
            cssClass="test-class"
            ref={ref}
        />);

        const svg = document.querySelector('svg');

        expect(svg).toHaveClass('test-class');
        expect(ref.current).toBe(svg);
    });

});
