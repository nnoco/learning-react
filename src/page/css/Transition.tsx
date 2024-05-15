import React from 'react';
import { PiTerminalWindow } from 'react-icons/pi'
import style from './Transition.module.css';

const Transition = () => {
    return (
        <div className={`rounded bg-blue-500 ${style.Transition}`}>
            <PiTerminalWindow /> Hello
        </div>
    );
};

export default Transition;