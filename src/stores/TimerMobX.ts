import { makeAutoObservable } from 'mobx';

interface Timer2Inf {
    secondsPassed: number,
    increaseTimer: Function,
}

class TimerMobXStore implements Timer2Inf {
    secondsPassed = 0;

    constructor() {
        makeAutoObservable(this);
    }

    increaseTimer() {
        this.secondsPassed += 1;
    }
}

export default TimerMobXStore;
