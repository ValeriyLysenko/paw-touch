import {
    StrictMode,
} from 'react';
import ReactDOM from 'react-dom';

import App from 'components/App';
import reportWebVitals from './reportWebVitals';

import 'assets/bulma/index.scss';
import 'assets/styles/fonts.scss';
import 'assets/styles/main.scss';

ReactDOM.render(
    <StrictMode>
        <App />
    </StrictMode>,
    document.getElementById('root'),
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
