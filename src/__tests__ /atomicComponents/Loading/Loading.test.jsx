import { render } from 'test-simple-env';
import Loading from 'atomicComponents/Loading/Loading';

describe('\'atomicComponents/Loading/Loading\' test suite', () => {

    test('Just simplest test', () => {
        render(<Loading />);
        const outerDiv = document.querySelector('.pt-loader-wrapper.is-active');
        const innerDiv = outerDiv.querySelector('.loader');

        expect(outerDiv).toBeInTheDocument();
        expect(innerDiv).toBeInTheDocument();
    });

});
