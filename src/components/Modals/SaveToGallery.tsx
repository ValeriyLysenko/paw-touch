import { FC } from 'react';
import modalComponent from 'hocs/modalComponent';

interface Props {}

const SaveToGallery: FC<Props> = () => {

    console.log();
    return (
        <div className="modal">
            Hello Dolly!!!
        </div>
    );
};

export default modalComponent(SaveToGallery);
