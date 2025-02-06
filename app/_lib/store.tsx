"use client";

import { Sneaker } from "@/components/ProductList";
import React, {
  createContext,
  useContext,
  useReducer,
  ReactNode,
  useEffect,
  useState,
} from "react";

export interface ICartProduct {
  product: Sneaker;
  quantity: number;
  size: string;
}

export interface CartState {
  items: ICartProduct[];
}

export enum CartActions {
  addToCart = "ADD_TO_CART",
  remove = "REMOVE_FROM_CART",
  updateQuantity = "UPDATE_QUANTITY",
  changeSize = "CHANGE_SIZE",
}

type CartAction =
  | {
      type: CartActions.addToCart;
      payload: { product: Sneaker; size: string; quantity: number };
    }
  | { type: CartActions.remove; payload: { id: number } }
  | {
      type: CartActions.updateQuantity;
      payload: { id: number; size: string; quantityChange: number };
    }
  | {
      type: CartActions.changeSize;
      payload: { id: number; size: string };
    };

const initialState: CartState = {
  items: [],
};

const CartContext = createContext<{
  state: CartState;
  dispatch: React.Dispatch<CartAction>;
}>({
  state: initialState,
  dispatch: () => null,
});

export const CartProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [state, dispatch] = useReducer(cartReducer, initialState);
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    const savedState = localStorage.getItem("cartState");
    if (savedState) {
      const parsedState: CartState = JSON.parse(savedState);
      parsedState.items.forEach((item) => {
        dispatch({
          type: CartActions.addToCart,
          payload: {
            product: item.product,
            size: item.size,
            quantity: item.quantity,
          },
        });
      });
    }
    setIsHydrated(true);
  }, []);

  useEffect(() => {
    if (state.items.length > 0 && isHydrated) {
      localStorage.setItem("cartState", JSON.stringify(state));
    }
  }, [state, isHydrated]);

  if (!isHydrated) {
    return null;
  }

  return (
    <CartContext.Provider value={{ state, dispatch }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  return useContext(CartContext);
};

const cartReducer = (state: CartState, action: CartAction): CartState => {
  switch (action.type) {
    case CartActions.addToCart:
      const existingItemIndex = state.items.findIndex(
        (item) => item.product.id === action.payload.product.id
      );

      // Если товар уже в корзине, увеличиваем его количество
      if (existingItemIndex !== -1) {
        const updatedItems = state.items.map((item, index) =>
          index === existingItemIndex
            ? {
                ...item,
                quantity: item.quantity + action.payload.quantity, // Увеличиваем количество
                size: action.payload.size,
              }
            : item
        );
        return { items: updatedItems };
      } else {
        // Если товар не в корзине, добавляем его
        return {
          items: [
            ...state.items,
            {
              product: action.payload.product,
              quantity: action.payload.quantity,
              size: action.payload.size,
            },
          ],
        };
      }

    case CartActions.remove:
      return {
        items: state.items.filter(
          (item) => !(item.product.id === action.payload.id)
        ),
      };

    case CartActions.updateQuantity:
      // Унифицированная логика для увеличения и уменьшения
      return {
        items: state.items.map((item) =>
          item.product.id === action.payload.id &&
          item.size === action.payload.size
            ? {
                ...item,
                quantity: item.quantity + action.payload.quantityChange,
              }
            : item
        ),
      };

    case CartActions.changeSize:
      return {
        items: state.items.map((item) =>
          item.product.id === action.payload.id
            ? { ...item, size: action.payload.size }
            : item
        ),
      };

    default:
      return state;
  }
};
