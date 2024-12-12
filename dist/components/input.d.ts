import React from 'react';
import { FormInputProps, FormFieldProps } from 'semantic-ui-react';
import { SemanticDatepickerProps } from '../types';
declare type InputProps = FormInputProps & {
    clearIcon: SemanticDatepickerProps['clearIcon'];
    icon: SemanticDatepickerProps['icon'];
    isClearIconVisible: boolean;
    fieldProps: FormFieldProps;
    fieldRef: React.Ref<HTMLElement>;
    children?: React.ReactNode;
};
declare const CustomInput: React.ForwardRefExoticComponent<Pick<InputProps, keyof FormInputProps> & React.RefAttributes<Input>>;
export default CustomInput;
