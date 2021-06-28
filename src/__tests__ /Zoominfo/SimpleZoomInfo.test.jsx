import { runInAction } from 'mobx';
import userEvent from '@testing-library/user-event';
import {
    render, screen, waitFor,
} from 'test-app-env';
import { mainCanvas } from 'aux/init';
import { LayoutContextProvider } from 'aux/LayoutContext';
import SimpleZoomInfo from 'atomicComponents/ZoomInfo/SimpleZoomInfo';

describe('\'atomicComponents/ZoomInfo/SimpleZoomInfo\' test suite', () => {

    test('Have proper elements', () => {
        render(<SimpleZoomInfo />);

        const title = screen.getByText('Zoom size');
        const value = screen.getByText(/\d %/);
        const button = screen.getByText('Reset');

        expect(title).toBeInTheDocument();
        expect(value).toBeInTheDocument();
        expect(button).toBeInTheDocument();
    });

    test('Color change handler test', async () => {
        const ref = {
            current: document.createElement('canvas'),
        };

        render(
            <LayoutContextProvider value={{ canvasRef: ref }}>
                <SimpleZoomInfo />
            </LayoutContextProvider>,
        );

        const button = screen.getByText('Reset');

        await waitFor(() => {
            runInAction(() => {
                mainCanvas.setScaleZoom(
                    {
                        type: '+',
                    },
                    1.1,
                    [0.9091954022988505, 0.9090909090909091],
                );
            });
        });

        userEvent.click(button);

        runInAction(() => {
            const scale = mainCanvas.getScale;

            expect(scale.currentScale).toBe(1);
            expect(scale.scaleHistory).toStrictEqual([]);
            expect(scale.scaledPosRatio).toStrictEqual([]);
        });

    });

});
