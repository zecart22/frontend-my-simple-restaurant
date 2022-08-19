import { createContext, ReactNode } from "react";
import { useState, useEffect } from "react";
import { api } from "../../services";

interface Order {
  id: string;
  table: number;
  status: boolean;
  draft: boolean;
  isDelivery: boolean;
  name: string;
  created_at: string;
  updated_at: string;
}

interface OrderProviderProps {
  children: ReactNode;
}

interface OrderProviderData {
  order: Order[];
}

export const OrderContext = createContext<OrderProviderData>(
  {} as OrderProviderData
);

export const OrdersProvider = ({ children }: OrderProviderProps) => {
  const [orderData, setOrderData] = useState([]);

  const user_id = localStorage.getItem("@AcessUserID");
  const token = localStorage.getItem("@AcessToken");

  useEffect(() => {
    api
      .get(`/orders/list`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        setOrderData(response.data);
      })
      .catch((err) => console.log(err));
  }, []);
  const order = orderData;
  return (
    <OrderContext.Provider value={{ order }}>{children}</OrderContext.Provider>
  );
};
