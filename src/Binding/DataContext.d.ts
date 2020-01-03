import React from 'react';
export declare const DataContext: React.Context<{
    value: any;
    update: (dataContext: any) => void;
}>;
interface DataContextProps {
    children: any;
    initContext: any;
}
export declare function DataContextProvider(props: DataContextProps): JSX.Element;
export {};
