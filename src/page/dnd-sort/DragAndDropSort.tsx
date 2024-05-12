import React, { useCallback, useEffect, useState } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGripVertical } from '@fortawesome/free-solid-svg-icons';
import { produce } from 'immer';

interface Props {
    values: string[];
    insertStyle?: 'box' | 'bar';
}

interface Item {
    value: string;
    initialIndex: number;
    dragging: boolean;
    yieldBefore: boolean;
    yieldAfter: boolean;
    backgroundColor: string;
}

const getColor = (length: number, index: number) => {
    return (192 + Math.floor(64 / length * (index + 1))).toString(16).padStart(2, '0');
    // return Math.floor(192 + Math.random() * 64).toString(16).padStart(2, '0');
};

const DragAndDropSort = ({values, insertStyle}: Props) => {
    const [items, setItems] = useState<Item[]>([]);

    useEffect(() => {
        setItems(values.map((value, index) => {
            const backgroundColor = '#' + [
                getColor(values.length, index),
                getColor(values.length, index),
                getColor(values.length, index),
            ].join('');
            
            return {
                value,
                initialIndex: index,
                dragging: false,
                yieldBefore: false,
                yieldAfter: false,
                backgroundColor,
            }
        }));
    }, [values]);

    const actualInsertStyle = insertStyle ?? 'bar';

    const [draggingIndex, setDraggingIndex] = useState<number>();
    const [yieldIndex, setYieldIndex] = useState<number>();

    const handleDragStart = useCallback((e: React.DragEvent, index: number) => {
        setItems(produce(draft => {
            draft[index].dragging = true;
        }));
        setDraggingIndex(index);
    }, [items, setItems, setDraggingIndex]);

    const handleDragEnter = useCallback((e: React.DragEvent, index: number) => {
        if(draggingIndex === undefined) return;
        if(index === draggingIndex) {
            setItems(produce(draft => {
                draft.forEach(it => {
                    it.yieldAfter = false;
                    it.yieldBefore = false;
                });
            }));

            setYieldIndex(undefined);
            return;
        };
        
        setItems(produce(draft => {
            draft.forEach(it => {
                it.yieldAfter = false;
                it.yieldBefore = false;
            });

            if(index > draggingIndex) {
                draft[index].yieldAfter = true;
            } else {
                draft[index].yieldBefore = true;
            }
        }));

        setYieldIndex(index);
    }, [items, setItems, setYieldIndex]);

    const handleDragEnd = useCallback((e: React.DragEvent, index: number) => {
        setItems(produce(draft => {
            draft[index].dragging = false;
            draft.forEach(it => {
                it.yieldAfter = false;
                it.yieldBefore = false;
            })
        }))
        setDraggingIndex(undefined);
    }, [setItems, setDraggingIndex]);

    const handleDrop = useCallback((e: React.DragEvent) => {
        if(draggingIndex === undefined) return;

        const index = draggingIndex;
        if(yieldIndex !== undefined) {
            setItems(produce(draft => {
                const detached = draft.splice(index, 1);
                if(index < yieldIndex) {
                    draft.splice(yieldIndex, 0,detached[0]);
                } else {
                    draft.splice(yieldIndex, 0,detached[0]);
                }

            }));
        }

        setItems(produce(draft => {
            draft.forEach(it => {
                it.dragging = false;
                it.yieldAfter = false;
                it.yieldBefore = false;
            })
        }));
        setYieldIndex(undefined);
    }, [items, setItems, yieldIndex, setYieldIndex, draggingIndex])

    return (
        <div
            className="flex flex-col space-y-4 border-solid border-rose-500 border rounded p-4"
            onDragOver={e => {
                e.preventDefault();
                e.dataTransfer.dropEffect = 'move';
                e.dataTransfer.effectAllowed = 'move';
            }}
            onDrop={handleDrop}
        >
            {items.map((item, index) => (
                <div key={index}>
                    {item.yieldBefore && (actualInsertStyle === 'box' ? (
                        <div className="w-100 rounded border-2 border-dashed mb-4 border-blue-300">
                            <span className="invisible">placeholder</span>
                        </div>
                    ) : (
                        <div className="w-100 h-2 rounded bg-sky-500 mb-4" />
                    ))}
                    <div
                        draggable="true"
                        className={`w-100 p-2 ${item.dragging ? 'opacity-50' : ''}`}
                        style={{
                            backgroundColor: item.backgroundColor
                        }}
                        onDragStart={e => handleDragStart(e, index)}
                        onDragEnd={e => handleDragEnd(e, index)}
                        onDragEnter={e => handleDragEnter(e, index)}
                    >
                        <FontAwesomeIcon
                            className="mr-2 cursor-grabbing"
                            icon={faGripVertical}

                        />
                        {item.value}
                    </div>
                    {item.yieldAfter && (actualInsertStyle === 'box' ? (
                        <div className="w-100 rounded border-2 border-dashed mt-4 border-blue-300">
                            <span className="invisible">placeholder</span>
                        </div>
                    ) : (
                        <div className="w-100 h-2 rounded bg-sky-500 mt-4" />
                    ))}
                </div>
            ))}
        </div>
    );
};

export default DragAndDropSort;