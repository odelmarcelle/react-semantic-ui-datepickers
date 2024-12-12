/// <reference types="react" />
import format from 'date-fns/format';
import { Props as DayzedProps, RenderProps } from 'dayzed';
import { FormInputProps, SemanticICONS, SemanticWIDTHS } from 'semantic-ui-react';
export declare type Object = {
    [key: string]: any;
};
export declare type Locale = {
    todayButton: string;
    nextMonth: string;
    previousMonth: string;
    nextYear: string;
    previousYear: string;
    weekdays: string[];
    months: string[];
};
export declare type LocaleOptions = 'bg-BG' | 'ca-ES' | 'cs-CZ' | 'de-DE' | 'el-GR' | 'en-US' | 'es-ES' | 'et-EE' | 'fi-FI' | 'fr-FR' | 'he-IL' | 'it-IT' | 'ja-JP' | 'ko-KR' | 'nb-NO' | 'nl-NL' | 'nn-NO' | 'pl-PL' | 'pt-BR' | 'ro-RO' | 'ru-RU' | 'sk-SK' | 'sv-SE' | 'tr-TR' | 'zh-CN';
export declare type PickedDayzedProps = Pick<DayzedProps, 'date' | 'maxDate' | 'minDate' | 'firstDayOfWeek' | 'showOutsideDays'>;
export declare type PickedFormInputProps = Pick<FormInputProps, 'autoFocus' | 'className' | 'disabled' | 'error' | 'iconPosition' | 'id' | 'label' | 'loading' | 'name' | 'placeholder' | 'size' | 'tabIndex' | 'transparent' | 'readOnly'>;
export declare type FnsFormatOptions = Parameters<typeof format>[2];
export declare type SemanticDatepickerProps = PickedDayzedProps & PickedFormInputProps & {
    allowOnlyNumbers: boolean;
    autoComplete?: string;
    clearOnSameDateClick: boolean;
    clearable: boolean;
    clearIcon?: SemanticICONS | React.ReactElement;
    filterDate: (date: Date) => boolean;
    format: string;
    displayFormat: string;
    formatOptions?: FnsFormatOptions;
    keepOpenOnClear: boolean;
    keepOpenOnSelect: boolean;
    icon?: SemanticICONS | React.ReactElement;
    inline: boolean;
    inverted: boolean;
    locale: LocaleOptions;
    onBlur: (event: React.SyntheticEvent) => void;
    onFocus: (event: React.SyntheticEvent) => void;
    onChange: (event: React.SyntheticEvent | undefined, data: SemanticDatepickerProps) => void;
    pointing: 'left' | 'right' | 'top left' | 'top right';
    required?: boolean;
    showToday: boolean;
    type: 'basic' | 'range';
    datePickerOnly: boolean;
    value: DayzedProps['selected'] | null;
    fieldClassName?: string;
    width?: SemanticWIDTHS;
};
export declare type BaseDatePickerProps = DayzedProps & {
    children: any;
};
export interface BasicDatePickerProps extends BaseDatePickerProps {
    clearOnSameDateClick?: boolean;
    onChange: (event: React.SyntheticEvent, date: Date | null) => void;
    selected: Date;
}
export interface RangeDatePickerProps extends BaseDatePickerProps {
    onChange: (event: React.SyntheticEvent, dates: Date[] | null) => void;
    selected: Date[];
}
export type { DayzedProps, RenderProps };