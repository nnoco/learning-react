import React, { useState } from 'react';
import DragAndDropSort from './DragAndDropSort';
import { produce } from 'immer';

const DragAndDropSortPage = () => {
    const [mode, setMode] = useState<'bar' | 'box'>('bar');
    const [values, setValues] = useState<string[]>([
        '나라의 말이 중국과 달라',
        '문자와 서로 통하지 아니하므로,',
        '이런 까닭으로 어리석은 백성이 이르고자 하는 바가 있어도',
        '마침내 제 뜻을 능히 펴지 못하는 사람이 많으니라.',
        '내가 이를 위하여 가엾게 여겨',
        '새로 스물여덟 자를 만드니',
        '사람마다 하여금 쉽게 익혀 날로 쓰기 편하게 하고자 할 따름이니라.',
    ]);

    const [input, setInput] = useState<string>('');

    return (
        <div className="space-y-4">
            <h1 className="text-3xl font-bold underline">Drag and Drop Sort</h1>

            <div className="flex space-x-4">
                <label>
                    <input type="radio" className="form-radio" checked={mode === 'bar'} onChange={e => setMode('bar')}/>
                    Bar
                </label>
                <label>
                    <input type="radio" className="form-radio" checked={mode === 'box'} onChange={e => setMode('box')}/>
                    Box
                </label>
            </div>

            <div>
                <input
                    type="text"
                    className="form-input w-full"
                    value={input}
                    onChange={e => setInput(e.target.value)}
                    onKeyUp={e => {
                        if(e.key === 'Enter') {
                            if(input) {
                                setValues(produce(draft => {
                                    draft.push(input);
                                }));
                                setInput('');
                            }
                        }
                    }}
                    placeholder="입력 후 엔터를 입력하세요."
                />
            </div>

            <DragAndDropSort
                values={values}
                insertStyle={mode}
            />
        </div>
    );
};

export default DragAndDropSortPage;