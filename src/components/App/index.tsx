import LayoutControls from 'components/LayoutControls';
import Navigation from 'components/Navigation';
import TimerMobX from 'components/Timer';
import Timer from 'components/Timer/Timer';
import TimerMobXStore from 'stores/TimerMobX';

import logo from 'assets/images/logo.svg';

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
        <section className="hero is-fullheight">

            <div className="hero-head">
                <Navigation />
            </div>

            <div className="hero-body">
                <div id="pt-canvas-container"><canvas /></div>
            </div>

            <div className="hero-foot">
                <LayoutControls />
            </div>

        </section>
    );
}

// <div className="App">
//     <header className="App-header">
//         <TimerMobX timer={timer} />
//         <Timer iniTimer={0} />
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//             {/* eslint-disable-next-line */}
//             Edit <code>src/App.tsx</code> and save to reload.
//         </p>
//         <a
//             className="App-link"
//             href="https://reactjs.org"
//             target="_blank"
//             rel="noopener noreferrer"
//         >
//             Learn React
//         </a>
//     </header>
// </div>

export default App;
