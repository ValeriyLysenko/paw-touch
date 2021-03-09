import {
    FC,
    useState,
    useCallback,
} from 'react';

interface TimerProps {
    iniTimer: number,
}

const Timer: FC<TimerProps> = ({
    iniTimer,
}) => {
    const [timer, increaseTimer] = useState(iniTimer);
    const onClickIncreaseTimer = useCallback(() => {
        increaseTimer((prevTimer) => prevTimer + 1);
    }, []);

    return (
        <div className="timer-block">
            <div>
                Already clicked:
                {timer}
            </div>
            <button onClick={onClickIncreaseTimer}>
                Click me!
            </button>
        </div>
    );
};

export default Timer;
