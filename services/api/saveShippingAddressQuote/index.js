 
const saveShippingAddressQuote = async (context, params, customQuery) => {
  //const { locale, acceptLanguage, currency } = context.config;

  let quoteId = false;
  if(params){
    quoteId = params.quoteId;
  }

  const cart = await context.$ct.api.getCart(quoteId);

  // JSON.stringify("CART :: "+ JSON.stringify(cart));

    // const cartResponse = await context.$ct.api.updateCart({
    //   id: cart.id,
    //   version: cart.version,
    //   actions: [
    //     cartActions.setShippingMethodAction(),
    //     cartActions.setShippingAddressAction(shippingDetails)
    //   ]
    // }, customQuery);

    // context.cart.setCart(cartResponse.data.cart);
    return {cart1:quoteId};
  }


module.exports ={saveShippingAddressQuote}
