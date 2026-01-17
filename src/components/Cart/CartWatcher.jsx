import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { sendCartData } from "../store/cart-actions";

const CartWatcher = () => {
  const dispatch = useDispatch();
  const cart = useSelector(state => state.cart);

  useEffect(() => {
    // ❌ DO NOT SAVE UNTIL CART IS RESTORED
    if (!cart.isInitialized) return;

    dispatch(sendCartData(cart));
  }, [cart, dispatch]);

  return null;
};

export default CartWatcher;
