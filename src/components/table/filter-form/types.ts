import React from "react";
import { ColSize } from "antd/es/grid/col";

export type FilterFieldType = 'input' | 'date-range' | 'date' | 'select' | 'remote-select';

export type ColSpanType = number | string;
export type BreakpointsSpan = {
    xs?: ColSpanType | ColSize;
    sm?: ColSpanType | ColSize;
    md?: ColSpanType | ColSize;
    lg?: ColSpanType | ColSize;
    xl?: ColSpanType | ColSize;
    xxl?: ColSpanType | ColSize;
};

export interface IFilterFieldConfig {
    name: string;
    getChangeAdditionalParams?: (selectedOption: any) => any;
    idFieldName?: string,
    displayFieldName?: string;
    options?: React.ReactNode[],
    optionsURL?: string;
    placeholder?: string,
    title: string;
    required?: boolean;
    maxTagCount?: number;
    mode?: string;
    span?: number | BreakpointsSpan,
    type?: FilterFieldType
}

export type FilterFieldsConfig = IFilterFieldConfig[];
