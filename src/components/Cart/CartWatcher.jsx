import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { sendCartData } from "../store/cart-actions";

const CartWatcher = () => {
  const dispatch = useDispatch();
  const cart = useSelector(state => state.cart);
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    if (!cart.isInitialized || !user) return;

    // ✅ SAVE CART PER USER
    dispatch(sendCartData(cart, user.username));
  }, [cart, dispatch, user]);

  return null;
};

export default CartWatcher;