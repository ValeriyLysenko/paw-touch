import { FC } from 'react';
import modalComponent from 'hocs/modalComponent/_index';
import SimpleControl from 'atomicComponents/Control/SimpleControl';
import { uniCloseHandler } from 'libs/lib';

interface Props {}

const SaveToGallery: FC<Props> = () => (
    <form className="">
        <div className="block">
            <input className="input" type="text" placeholder="Title" />
        </div>
        <div className="block">
            <textarea className="textarea" placeholder="Description" />
        </div>
    </form>
);

const Controls = () => (
    <>
        <SimpleControl {...{
            cssClass: 'button is-warning',
            ariaLabel: 'Close modal',
            callback: uniCloseHandler,
            text: 'Cancel',
        }}
        />
    </>
);

export default modalComponent(SaveToGallery, {
    type: 'basic',
    modalSpec: {
        title: 'Save to gallery',
        Controls,
    },
});
