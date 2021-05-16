import {
    autorun, spy, getDebugName, configure,
} from 'mobx';
import { mainCanvas } from 'aux/init';

configure({
    enforceActions: 'always',
    computedRequiresReaction: true,
    reactionRequiresObservable: true,
    observableRequiresReaction: true,
    // disableErrorBoundaries: true,
});

const onResize = (e: Event) => {
    const target = e.target as Window;
    // console.log('onResize ==>', e);
    mainCanvas.setWindowSize([target.innerWidth, target.innerHeight]);
    // console.log('%cmainCanvas', 'color: red', mainCanvas);
};

// autorun(() => {
//     console.log('autorun ==>', mainCanvas.getWindowSize);
// });

// spy((e) => {
//     // console.log('spy ==>', e);
//     if (e.type === 'action') {
//         console.log('spy ==>', getDebugName(mainCanvas, 'getWindowSize'));
//     }
// });

window.addEventListener('resize', onResize);

export default {};
