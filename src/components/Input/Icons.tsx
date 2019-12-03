import React from 'react';

export type IconProps = {
    dataTestId?: string;
};
export function ErrorIcon({ dataTestId = 'input-error-icon' }: IconProps): JSX.Element {
    return (
        <svg data-testid={dataTestId} width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="7.5" cy="7.5" r="6" stroke="#F44444" strokeWidth="3" />
            <line x1="2.93934" y1="11.9393" x2="11.9393" y2="2.93934" stroke="#F44444" strokeWidth="3" />
        </svg>
    );
}

export function SuccessIcon({ dataTestId = 'input-success-icon' }: IconProps): JSX.Element {
    return (
        <svg data-testid={dataTestId} width="15" height="11" viewBox="0 0 15 11" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M2 4.72222L6.17241 9L13 2" stroke="#15D747" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    );
}

export function SearchIcon({ dataTestId = 'input-search-icon' }: IconProps): JSX.Element {
    return (
        <svg data-testid={dataTestId} width="17" height="16" viewBox="0 0 17 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="6" cy="6" r="5.25" stroke="#7E8996" strokeWidth="1.5" />
            <line x1="9.53033" y1="9.46967" x2="15.5303" y2="15.4697" stroke="#7E8996" strokeWidth="1.5" />
        </svg>
    );
}
