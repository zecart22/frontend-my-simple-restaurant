import { createContext, ReactNode, useCallback } from "react";
import { useState, useEffect } from "react";
import { api } from "../../services";

interface Category {
  name: string;
  id: string;
}

interface CategoryProviderProps {
  children: ReactNode;
}

interface CategoryProviderData {
  category: Category[];
}

export const CategoryContext = createContext<CategoryProviderData>(
  {} as CategoryProviderData
);

export const CategoriesProvider = ({ children }: CategoryProviderProps) => {
  const [categoryData, setCategoryData] = useState([]);

  const token = localStorage.getItem("@AcessToken");

  const loadCategory = useCallback(async () => {
    try {
      const response = await api.get(`/categories_list`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setCategoryData(response.data);
    } catch (err) {
      console.log(err);
    }
  }, []);

  useEffect(() => {
    loadCategory();
  }, []);

  const category = categoryData;
  return (
    <CategoryContext.Provider value={{ category }}>
      {children}
    </CategoryContext.Provider>
  );
};
