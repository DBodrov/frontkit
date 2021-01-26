import { Spinner } from '../Spinner';
import { Button, StyleTypeProp } from './Button';
import React from 'react';

interface LoadingButtonProps extends Omit<React.ComponentProps<typeof Button>, 'children'> {
    loading: boolean;
    text: string;
}

export function LoadingButton({ loading, text, disabled, styleType, dataTestId, ...rest }: LoadingButtonProps): JSX.Element {
    return (
        <Button
            disabled={loading || disabled}
            dataTestId={dataTestId}
            styleType={loading ? StyleTypeProp.WhiteBodyWithBorder : styleType}
            {...rest}
        >
            {!loading && text}
            {loading && <Spinner style={{ padding: '2px' }} />}
        </Button>
    );
}
