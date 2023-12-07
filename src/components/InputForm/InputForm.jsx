
import React from 'react';
import { WrapperInputStyle } from './style';

const InputForm = (props) => {
    const { placeholder = 'Nhập text', value, onChange, ...rest } = props;

    const handleOnchangeInput = (e) => {
        if (onChange) {
            onChange(e.target.value);
        }
    };

    return (
        <WrapperInputStyle placeholder={placeholder} value={value} {...rest} onChange={handleOnchangeInput} />
    );
};

export default InputForm;
