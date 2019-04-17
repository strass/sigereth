/** @jsx jsx */
import { jsx } from '@emotion/core';
import { FunctionComponent } from 'react';
import { times } from 'lodash';

const getMarker = (type: 'circle' | 'square', filled: boolean) => {
    switch (true) {
        case type === 'square':
            return filled ? '■' : '□';
        case type === 'circle':
        default:
            return filled ? '●' : '○';
    }
};

const DotScale: FunctionComponent<{
    current: number;
    total: number;
    onChangeRating: (newValue: number) => void;
    type?: 'circle' | 'square';
}> = ({ current, total, onChangeRating, type = 'circle' }) => (
    <ul css={{ listStyle: 'none', display: 'inline-flex', margin: 0, padding: 0 }}>
        {times(total, i => (
            <li key={i} onClick={() => onChangeRating(i + 1)} css={{ cursor: 'pointer' }}>
                {getMarker(type, current > i)}
            </li>
        ))}
    </ul>
);

export default DotScale;
