import React from 'react';
import type { ReactNode } from 'react';
import {
  Form,
  Input,
  FormInputProps,
  FormFieldProps,
} from 'semantic-ui-react';
import { SemanticDatepickerProps } from '../types';
import CustomIcon from './icon';

type InputProps = FormInputProps & {
  clearIcon: SemanticDatepickerProps['clearIcon'];
  icon: SemanticDatepickerProps['icon'];
  isClearIconVisible: boolean;
  fieldProps: FormFieldProps;
  fieldRef: React.Ref<HTMLElement>;
  children?: React.ReactNode;
};

const inputData = {
  'data-testid': 'datepicker-input',
};

const style: React.CSSProperties = {
  position: 'relative',
};

// @ts-ignore
const CustomInput = React.forwardRef<Input, InputProps>((props, ref) => {
  const {
    clearIcon,
    error,
    icon,
    isClearIconVisible,
    label,
    onClear,
    onFocus,
    required,
    value,
    fieldProps,
    fieldRef,
    children,
    ...rest
  } = props;

  return (
    <React.Fragment>
      <Form.Field {...fieldProps} style={style} ref={fieldRef}>
        {label ? (
          <label htmlFor={rest.id as string | undefined}>{label as ReactNode}</label>
        ) : null}
        <Input
          {...rest}
          ref={ref}
          error={error}
          required={required}
          icon={
            <CustomIcon
              clearIcon={clearIcon}
              icon={icon}
              isClearIconVisible={isClearIconVisible}
              onClear={onClear}
              onClick={onFocus}
            />
          }
          input={inputData}
          onFocus={onFocus}
          value={value}
        />
        {children}
      </Form.Field>
    </React.Fragment>
  );
});

export default CustomInput;
