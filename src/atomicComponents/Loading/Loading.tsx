import { FC } from 'react';

interface Props {}

const Loading: FC<Props> = () => (
    <div className="pt-loader-wrapper is-active">
        <div className="loader" />
    </div>
);

export default Loading;
