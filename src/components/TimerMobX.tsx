import { FC } from 'react';
import { observer } from 'mobx-react';

interface TimerMobXProps {
    timer: {
        secondsPassed: number,
    },
}

const TimerMobXView: FC<TimerMobXProps> = ({
    timer,
}) => (
    <span>
        Seconds passed:
        {timer.secondsPassed}
    </span>
);

export default observer(TimerMobXView);
