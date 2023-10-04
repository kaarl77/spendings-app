import { Transaction } from "../custom-types/Transaction";
import { Category } from "../custom-types/Category";

type APIResponse = {
  transactions: Transaction[];
  categories: Category[];
};

export async function getTransactions(): Promise<Transaction[]> {
  // return new Promise((resolve, reject) => {
  //   setTimeout(() => {
  //     resolve(transactions);
  //   }, 200);
  // });

  try {
    const response = await fetch(
      "https://apex.oracle.com/pls/apex/spendigsapp/transactions/"
    );
    if (!response.ok) {
      throw new Error("Something went wrong");
    }
    const data = await response.json();
    console.log(JSON.stringify(data));
    return data.items;
  } catch (error) {
    console.log(error);
    return [];
  }
}

export async function getCategories(): Promise<Category[]> {
  // const categories: Category[] = [
  //   {
  //     id: 0,
  //     name: "rent/subscriptions",
  //     icon: "subscription.png",
  //   },
  //   {
  //     id: 1,
  //     name: "restaurant",
  //     icon: "restaurant.png",
  //   },
  //   {
  //     id: 2,
  //     name: "transport",
  //     icon: "transport.png",
  //   },
  //   {
  //     id: 3,
  //     name: "personal",
  //     icon: "personal.png",
  //   },
  // ];
  // return new Promise((resolve, reject) => {
  //   setTimeout(() => {
  //     resolve(categories);
  //   }, 200);
  // })
  try {
    const response = await fetch(
      "https://apex.oracle.com/pls/apex/spendigsapp/categories/"
    );
    if (!response.ok) {
      throw new Error("Something went wrong here");
    }
    const data = await response.json();
    console.log(JSON.stringify(data));
    return data.items;
  } catch (error) {
    console.log(error);
    return [];
  }
}

export async function getBoth(): Promise<APIResponse> {
  return new Promise((resolve, reject) => {
    Promise.all([getTransactions(), getCategories()]).then((value) => {
      resolve({
        transactions: value[0],
        categories: value[1],
      });
    });
  });
}
