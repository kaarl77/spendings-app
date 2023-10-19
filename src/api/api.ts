import { Transaction } from "../custom-types/Transaction";
import { Category } from "../custom-types/Category";

type APIResponse = {
  transactions: Transaction[];
  categories: Category[];
};

export async function getTransactions(): Promise<Transaction[]> {
  try {
    const response = await fetch(
      "https://apex.oracle.com/pls/apex/spendigsapp/transactions/"
    );
    if (!response.ok) {
      throw new Error("Something went wrong");
    }
    const data = await response.json();
    // console.log(JSON.stringify(data));
    return data.items;
  } catch (error) {
    console.log(error);
    return [];
  }
}

export async function getCategories(): Promise<Category[]> {
  try {
    const response = await fetch(
      "https://apex.oracle.com/pls/apex/spendigsapp/categories/"
    );
    if (!response.ok) {
      throw new Error("Something went wrong here");
    }
    const data = await response.json();
    // console.log(JSON.stringify(data));
    return data.items;
  } catch (error) {
    console.log(error);
    return [];
  }
}

export async function updateTransaction(
  id: number,
  value: number,
  date: string,
  categoryId: number,
  note: string
): Promise<void> {
  const endpoint = "https://apex.oracle.com/pls/apex/spendigsapp/transactions/";
  const queryParams = new URLSearchParams({
    id: id.toString(),
    value: value.toString(),
    date: date,
    categoryId: categoryId.toString(),
    note: note,
  });

  const finalEndpoint = `${endpoint}?${queryParams.toString()}`;
  const response = await fetch(finalEndpoint, {
    method: "PUT",
  });

  console.log(finalEndpoint);

  const responseData = await response.text();

  if (!response.ok) {
    try {
      const errorData = JSON.parse(responseData);
      throw new Error(`Failed to update transaction: ${"a"}`);
    } catch (jsonError) {
      throw new Error(
        `Failed to update transaction. Variables ${id}, ${value}, ${date}, ${categoryId}, ${note}.\n Final endpoint: ${finalEndpoint}\n`
      );
    }
  }

  try {
    const json = JSON.parse(responseData);
    // return json; // or handle the JSON data as needed
  } catch (jsonError) {
    throw new Error(`Unexpected server response: ${responseData}`);
  }
}

export async function postTransaction(
  id: number,
  value: number,
  date: string,
  categoryId: number,
  note: string
): Promise<void> {
  const endpoint = "https://apex.oracle.com/pls/apex/spendigsapp/transactions/";
  const queryParams = new URLSearchParams({
    id: id.toString(),
    value: value.toString(),
    date: date,
    categoryId: categoryId.toString(),
    note: note,
  });

  const finalEndpoint = `${endpoint}?${queryParams.toString()}`;
  const response = await fetch(finalEndpoint, {
    method: "POST",
  });

  const responseData = await response.text();

  if (!response.ok) {
    try {
      const errorData = JSON.parse(responseData);
      throw new Error(`Failed to create transaction: ${"a"}`);
    } catch (jsonError) {
      throw new Error(
        `Failed to update transaction. Variables ${id}, ${value}, ${date}, ${categoryId}, ${note}.\n Final endpoint: ${finalEndpoint}\n`
      );
    }
  }

  try {
    const json = JSON.parse(responseData);
    // return json; // or handle the JSON data as needed
  } catch (jsonError) {
    throw new Error(`Unexpected server response: ${responseData}`);
  }
}

export async function deleteTransaction(id: number): Promise<void> {
  const endpoint = "https://apex.oracle.com/pls/apex/spendigsapp/transactions/";
  const queryParams = new URLSearchParams({
    id: id.toString(),
  });

  const response = await fetch(`${endpoint}?${queryParams.toString()}`, {
    method: "DELETE",
  });

  const responseData = await response.text();

  if (response.status === 204) {
    try {
      const errorData = JSON.parse(responseData);
      throw new Error(`Failed to delete transaction: ${"a"}`);
    } catch (jsonError) {
      throw new Error(
        `Failed to delete transaction. Server response: ${responseData}`
      );
    }
  }

  try {
    const json = JSON.parse(responseData);
    // return json; // or handle the JSON data as needed
  } catch (jsonError) {
    throw new Error(`Unexpected server response: ${responseData}`);
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
