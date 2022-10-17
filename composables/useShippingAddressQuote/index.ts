import { useVSFContext } from '@vue-storefront/core';

const useShippingAddressQuote = () => {

  const {$ct } = useVSFContext(); 
  const load= async (cartId ) => {
    const { data} = await $ct.api.getCart(cartId);

    return data.cart;
  }

  return {
    load
  };
}


export default useShippingAddressQuote;
