import React, {ReactNode, useState} from "react";
import {Transaction} from "../../custom-types/Transaction";
import {Category} from "../../custom-types/Category";

type TransactionFields = {
  value: number;
  note: string;
  date: string;
  categoryId: number;
}

type GlobalContextType = {
  transactions: Transaction[];
  setTransactions: (transactions: Transaction[]) => void;
  categories: Category[];
  setCategories: (categories: Category[]) => void;
  addTransaction: (transactionFields: TransactionFields) => void;
  editTransaction: (transaction: Transaction) => void
}

const globalContextInitialState: GlobalContextType = {
  transactions: [],
  setTransactions: () => {
  },
  categories: [],
  setCategories: () => {
  },
  addTransaction: () => {
  },
  editTransaction: () => {
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
    },
    addTransaction: transactionFields => {
      const transaction:Transaction={
        id: transactions.length,
        note: transactionFields.note,
        date: transactionFields.date,
        value: transactionFields.value,
        categoryId: transactionFields.categoryId,

      }
      setTransactions((transactions) => [...transactions, transaction])
    },
    editTransaction: transaction => {
      const transactionToBeModifiedIndex = transactions.findIndex((t) => t === transaction);
      const transactionsBeforeTarget = [...transactions].slice(0, transactionToBeModifiedIndex);
      const transactionsAfterTarget = [...transactions].slice(transactionToBeModifiedIndex + 1);
      setTransactions((transactions) => [...transactionsBeforeTarget, transaction, ...transactionsAfterTarget]);
    }
  }

  return (
    <GlobalContext.Provider value={context}>
      {children}
    </GlobalContext.Provider>
  )
}