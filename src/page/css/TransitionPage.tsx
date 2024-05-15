import React from 'react';
import Transition from './Transition';

const TransitionPage = () => {
    return (
        <div className="mt-8 space-y-4">
            <h1 className="text-3xl font-bold underline">Hover transition</h1>

            <Transition />
        </div>
    );
};

export default TransitionPage;