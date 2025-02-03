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
  increase = "INCREASE_QUANTITY",
  decrease = "DECREASE_QUANTITY",
  changeSize = "CHANGE_SIZE",
}

type CartAction =
  | {
      type: CartActions.addToCart;
      payload: { sneaker: Sneaker; size: string; quantity: number };
    }
  | { type: CartActions.remove; payload: { id: number } }
  | { type: CartActions.increase; payload: { id: number } }
  | { type: CartActions.decrease; payload: { id: number } }
  | { type: CartActions.changeSize; payload: { id: number; size: string } };

const initialState: CartState = {
  items: [],
};

const loadState = (): CartState => {
  if (typeof window !== "undefined" && window.localStorage) {
    const savedState = localStorage.getItem("cartState");
    if (savedState) {
      return JSON.parse(savedState);
    }
  }
  return initialState;
};

const CartContext = createContext<{
  state: CartState;
  dispatch: React.Dispatch<CartAction>;
}>({
  state: loadState(),
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
            sneaker: item.product,
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
        (item) =>
          item.product.id === action.payload.sneaker.id &&
          item.size === action.payload.size
      );
      if (existingItemIndex !== -1) {
        const updatedItems = [...state.items];
        updatedItems[existingItemIndex].quantity += action.payload.quantity;
        return { items: updatedItems };
      } else {
        return {
          items: [
            ...state.items,
            {
              product: action.payload.sneaker,
              quantity: action.payload.quantity,
              size: action.payload.size,
            },
          ],
        };
      }

    case CartActions.remove:
      return {
        items: state.items.filter(
          (item) => item.product.id !== action.payload.id
        ),
      };

    case CartActions.increase:
      return {
        items: state.items.map((item) =>
          item.product.id === action.payload.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        ),
      };

    case CartActions.decrease:
      return {
        items: state.items.map((item) =>
          item.product.id === action.payload.id && item.quantity > 1
            ? { ...item, quantity: item.quantity - 1 }
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
