import { useCart } from "../store";
import { CartActions, Sneaker } from "../types";

export const useCartActions = () => {
  const { dispatch } = useCart();

  const onAddToCart = (product: Sneaker, size: string, quantity: number) => {
    dispatch({
      type: CartActions.addToCart,
      payload: { product, size, quantity },
    });
  };

  const onDecrease = (id: number) => {
    dispatch({
      type: CartActions.updateQuantity,
      payload: { id, quantityChange: -1 },
    });
  };

  const onIncrease = (id: number) => {
    dispatch({
      type: CartActions.updateQuantity,
      payload: { id, quantityChange: 1 },
    });
  };

  const changeSize = (id: number, size: string) => {
    dispatch({
      type: CartActions.changeSize,
      payload: { id, size },
    });
  };

  const deleteItem = (id: number) => {
    dispatch({ type: CartActions.remove, payload: { id } });
  };

  const deleteAll = () => {
    dispatch({ type: CartActions.deleteAll });
  };

  return {
    onDecrease,
    onIncrease,
    changeSize,
    deleteItem,
    onAddToCart,
    deleteAll,
  };
};
