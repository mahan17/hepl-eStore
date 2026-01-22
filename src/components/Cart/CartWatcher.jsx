import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserCart } from "../store/cartSlice";

const CartWatcher = () => {
  const dispatch = useDispatch();
  const username = useSelector(state => state.login.username);
  const isLoggedIn = useSelector(state => state.login.isLoggedIn);

  useEffect(() => {
    if (isLoggedIn && username) {
      dispatch(fetchUserCart(username));
    }
  }, [dispatch, isLoggedIn, username]);

  return null;
};

export default CartWatcher;
