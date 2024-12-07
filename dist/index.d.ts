import React from 'react';
import { Input as SUIInput } from 'semantic-ui-react';
import { Locale, SemanticDatepickerProps } from './types';
declare type SemanticDatepickerState = {
    isVisible: boolean;
    locale: Locale;
    selectedDate: Date | Date[] | null;
    selectedDateFormatted?: string;
    typedValue: string | null;
};
declare class SemanticDatepicker extends React.Component<SemanticDatepickerProps, SemanticDatepickerState> {
    static defaultProps: SemanticDatepickerProps;
    el: React.RefObject<HTMLDivElement>;
    inputRef: React.RefObject<SUIInput>;
    componentDidUpdate(prevProps: SemanticDatepickerProps): void;
    get isRangeInput(): boolean;
    get initialState(): {
        isVisible: boolean;
        locale: Locale;
        selectedDate: Date | Date[] | null;
        selectedDateFormatted: string | undefined;
        typedValue: null;
    };
    get dayzedProps(): {
        [x: string]: any;
    };
    get inputProps(): {
        placeholder: any;
    };
    get fieldProps(): {
        className: string | null;
    };
    get date(): Date | undefined;
    get locale(): Locale;
    get weekdays(): string[];
    state: {
        isVisible: boolean;
        locale: Locale;
        selectedDate: Date | Date[] | null;
        selectedDateFormatted: string | undefined;
        typedValue: null;
    };
    Component: React.ElementType;
    resetState: (event: any) => void;
    clearInput: (event: any) => void;
    mousedownCb: (mousedownEvent: any) => void;
    keydownCb: (keydownEvent: any) => void;
    close: () => void;
    focusOnInput: () => void;
    showCalendar: (event: any) => void;
    handleRangeInput: (newDates: any, event: any) => void;
    handleBasicInput: (newDate: any, event: any) => void;
    handleBlur: (event?: React.SyntheticEvent) => void;
    handleChange: (event: React.SyntheticEvent, { value }: {
        value: any;
    }) => void;
    handleKeyDown: (evt: any) => void;
    onDateSelected: (event: React.SyntheticEvent | undefined, dateOrDates: any) => void;
    render(): JSX.Element;
}
export default SemanticDatepicker;
