import {
    StrictMode,
} from 'react';
import ReactDOM from 'react-dom';
import {
    BrowserRouter as Router,
} from 'react-router-dom';

import App from 'components/App';
import reportWebVitals from './reportWebVitals';

import 'assets/bulma/index.scss';
import 'assets/bulma/slider.scss';
import 'assets/styles/fonts.scss';
import 'assets/styles/main.scss';

ReactDOM.render(
    <StrictMode>
        <Router>
            <App />
        </Router>
    </StrictMode>,
    document.getElementById('paw-touch'),
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
