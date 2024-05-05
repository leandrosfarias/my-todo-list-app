import React, { createContext, useState } from 'react';

// interface IUser {
//     id: string;
//     name: string;
//     email: string;
//     todoLists: string[];
// }

// interface ITodLists {
//     todoLists: [];
// }

interface IGeneralContextType {
    todoLists: [];
    setTodoLists: (todoLists: []) => void;
}

export const GeneralContext = createContext<IGeneralContextType | undefined>(undefined);

export const GeneralProvider = ({ children }: { children: React.ReactNode }) => {

    const [todoLists, setTodoLists] = useState<[]>([]);

    return (
        <GeneralContext.Provider value={ { todoLists, setTodoLists } }>
            {children}
        </GeneralContext.Provider>
    );
};

export const useGeneral = () => {
    const context = React.useContext(GeneralContext);
    if (!context) {
        throw new Error('useGeneral deve ser usado dentro de um GeneralProvider');
    }
    return context;
}