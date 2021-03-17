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
        <section className="hero is-success is-fullheight">

            <div className="hero-head">
                <header className="navbar">
                    <div className="container">
                        <div className="navbar-brand">
                            <a className="navbar-item">
                                <img src="https://bulma.io/images/bulma-type-white.png" alt="Logo" />
                            </a>
                            <span className="navbar-burger" data-target="navbarMenuHeroC">
                                <span />
                                <span />
                                <span />
                            </span>
                        </div>
                        <div id="navbarMenuHeroC" className="navbar-menu">
                            <div className="navbar-end">
                                <a className="navbar-item is-active">
                                    Home
                                </a>
                                <a className="navbar-item">
                                    Examples
                                </a>
                                <a className="navbar-item">
                                    Documentation
                                </a>
                                <span className="navbar-item">
                                    <a className="button is-success is-inverted">
                                        <span className="icon">
                                            <i className="fab fa-github" />
                                        </span>
                                        <span>Download</span>
                                    </a>
                                </span>
                            </div>
                        </div>
                    </div>
                </header>
            </div>

            <div className="hero-body">
                <canvas id="main-canvas" />
            </div>

            <div className="hero-foot">
                <nav className="tabs is-boxed is-fullwidth">
                    <div className="container">
                        <ul>
                            <li className="is-active"><a>Overview</a></li>
                            <li><a>Modifiers</a></li>
                            <li><a>Grid</a></li>
                            <li><a>Elements</a></li>
                            <li><a>Components</a></li>
                            <li><a>Layout</a></li>
                        </ul>
                    </div>
                </nav>
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
