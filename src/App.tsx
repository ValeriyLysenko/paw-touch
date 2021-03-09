import logo from './logo.svg';
import './App.css';
import './app.scss';
import Timer from './Timer';
import TimerMobX from './components/TimerMobX';
import TimerMobXStore from './stores/TimerMobX';

const timer = new TimerMobXStore();
let loop = 0;
const interval = setInterval(() => {
    if (loop === 10) {
        clearInterval(interval);
        return false;
    }
    timer.increaseTimer();
    loop++;
}, 1000);

function App() {
    return (
        <div className="App">
            <header className="App-header">
                <TimerMobX timer={timer} />
                <Timer iniTimer={0} />
                <img src={logo} className="App-logo" alt="logo" />
                <p>
                    {/* eslint-disable-next-line */}
                    Edit <code>src/App.tsx</code> and save to reload.
                </p>
                <a
                    className="App-link"
                    href="https://reactjs.org"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    Learn React
                </a>
            </header>
        </div>
    );
}

export default App;
