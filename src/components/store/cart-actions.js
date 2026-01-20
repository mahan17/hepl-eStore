import { cartActions } from "./cartSlice";

const CART_API_URL = "http://localhost:5000/api/cart";

/* 🔥 SAVE CART TO MONGODB (USER-BASED) */
export const sendCartData = (cart) => {
  return async () => {
    try {
      const storedUser = localStorage.getItem("user");
      const username = storedUser ? JSON.parse(storedUser).username : null;

      if (!username) return;

      const cleanedItems = cart.items.filter(item => item.quantity > 0);

      await fetch(CART_API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          items: cleanedItems,
        }),
      });
    } catch (error) {
      console.error("Saving cart failed", error);
    }
  };
};

/* 🔥 FETCH CART FROM MONGODB (USER-BASED) */
export const fetchCartData = () => {
  return async (dispatch) => {
    try {
      const storedUser = localStorage.getItem("user");
      const username = storedUser ? JSON.parse(storedUser).username : null;

      if (!username) {
        dispatch(cartActions.clearCart());
        return;
      }

      const response = await fetch(
        `${CART_API_URL}?username=${username}`
      );

      const data = await response.json();

      dispatch(
        cartActions.replaceCart({
          items: data.items || [],
          totalQuantity: data.totalQuantity || 0,
        })
      );
    } catch (error) {
      console.error("Fetching cart failed", error);
    }
  };
};
