import {
    configure, autorun,
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
    // !May be remove later
    // !TODO be remove later
    mainCanvas.setWindowSize([target.innerWidth, target.innerHeight]);
    // console.log('%cmainCanvas', 'color: red', mainCanvas);
};

const onKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'Control') mainCanvas.setAuxDataCtrlKey(true);
};

const onKeyUp = (e: KeyboardEvent) => {
    if (e.key === 'Control') mainCanvas.setAuxDataCtrlKey(false);
};

autorun(() => {
    const thisItems = mainCanvas.getThis;
    console.log('autorun ==>', thisItems);
    localStorage.setItem('paw-touch', JSON.stringify(thisItems));
});

// spy((e) => {
//     // console.log('spy ==>', e);
//     if (e.type === 'action') {
//         // console.log('spy ==>', getDebugName(mainCanvas, 'getWindowSize'));
//         console.log('spy ==>', e);
//     }
// });

document.addEventListener('keydown', onKeyDown);
document.addEventListener('keyup', onKeyUp);
window.addEventListener('resize', onResize);

export default {};
