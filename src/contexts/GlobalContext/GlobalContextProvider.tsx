import React, {ReactNode, useState} from "react";
import {Transaction} from "../../custom-types/Transaction";
import {Category} from "../../custom-types/Category";

type GlobalContextType = {
    transactions: Transaction[];
    setTransactions: (transactions: Transaction[]) => void;
    categories: Category[];
    setCategories: (categories: Category[]) => void;

}

const globalContextInitialState: GlobalContextType = {
    transactions: [],
    setTransactions: () => {
    },
    categories: [],
    setCategories: () => {
    },
};

interface Props {
    children: ReactNode;
}

export const GlobalContext = React.createContext<GlobalContextType>(globalContextInitialState);

export function GlobalContextProvider(props: Props) {
    const {children} = props;

    const [transactions, setTransactions] = useState<Transaction[]>([]);
    const [categories, setCategories] = useState<Category[]>([]);

    const context: GlobalContextType = {
        transactions,
        categories,
        setTransactions: transactions => {
            setTransactions(transactions)
        },
        setCategories: categories => {
            setCategories(categories)
        }
    }

    return (
        <GlobalContext.Provider value={context}>
            {children}
        </GlobalContext.Provider>
    )
}