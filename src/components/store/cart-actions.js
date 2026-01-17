import { cartActions } from './cartSlice';

const CART_API_URL = 'http://localhost:5000/api/cart';

/* 🔥 SAVE CART TO MONGODB */
export const sendCartData = (cart) => {
  const cleanedItems = cart.items.filter(item => item.quantity > 0);
  return async () => {
    try {
      await fetch(CART_API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        
        body: JSON.stringify({
          items: cleanedItems,
          totalQuantity: cleanedItems.reduce(
            (sum, item) => sum + item.quantity,
            0
          ),
        }),
      });
    } catch (error) {
      console.error('Saving cart failed', error);
    }
  };
};

/* 🔥 FETCH CART FROM MONGODB (ON REFRESH) */
export const fetchCartData = () => {
  return async (dispatch) => {
    try {
      const response = await fetch(CART_API_URL);
      const data = await response.json();

      dispatch(
        cartActions.replaceCart({
          items: data.items || [],
          totalQuantity: data.totalQuantity || 0,
        })
      );
    } catch (error) {
      console.error('Fetching cart failed', error);
    }
  };
};
