import {
    StrictMode,
} from 'react';
import {
    BrowserRouter as Router,
} from 'react-router-dom';
import { render } from '@testing-library/react';
import 'aux/listeners';
import { mainCanvas, canvasStoreDefaults, auxCanvas } from 'aux/init';
import { AppContextProvider } from 'aux/AppContext';
import App from 'components/App';

const AllTheProviders = ({ children }) => (
    <AppContextProvider value={{
        mainCanvas, canvasStoreDefaults, auxCanvas,
    }}
    >
        <StrictMode>
            <Router>
                <App>{children}</App>
            </Router>
        </StrictMode>
    </AppContextProvider>
);

const customRender = (ui, options) => render(ui, { wrapper: AllTheProviders, ...options });

// Re-export everything
export * from '@testing-library/react';

// Override render method
export { customRender as render };
