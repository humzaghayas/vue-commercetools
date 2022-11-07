import { useContext,ssrRef} from '@nuxtjs/composition-api';

export const useCartMiraklPrice = () => {

    const context = useContext();
    const loading = ssrRef(false);
    const productPrices = ssrRef([]);

    const addProductToCart= async(params) =>{

        console.log("Params :: "+JSON.stringify(params));
        try{
            loading.value = true;
            const currency  = "USD";//context.config;

            params.currenctCode = currency;
            const cartDetails = await loadCurrentCart();

            const act = await createAddLineItemAction(params);
            const catParams = {
                id:cartDetails.id,
                version:cartDetails.version,
                actions: [act]
              }
            const cart= await context.$vsf.$ct.api.addToCartWithMiraklPrice( catParams);
            
            console.log('Current Cart  :: '+JSON.stringify(cart.data.cart));
            
            return cart.data.cart;
        }catch(error){
            console.log('error : '+JSON.stringify(error));
        }
        finally{
            loading.value = false;
        }
    };

    const loadCurrentCart = async () => {
        const { user, cart } = {user : null, cart : null};
        //console.log('Prices :::: Params :: ' + JSON.stringify(context));
        const { data: profileData } = await context.$vsf.$ct.api.getMe({ customer: false }, user);
      
        console.log("Create Cart :: "+ JSON.stringify(profileData));
        if (profileData.me.activeCart) {
          return profileData.me.activeCart;
        }
      
        const { data } = await context.$vsf.$ct.api.createCart({}, cart);

        console.log("Create Cart :: "+ JSON.stringify(data));
      
        return data.cart;
      };


      const createAddLineItemAction =async (params) => {
        //: {product,quantity,supplyChannel, distributionChannel}
          const priceAmount = params.externalPrice *100;
     
          return {
            addLineItem: {
              variantId: params.product.id,
              quantity: params.quantity,
              sku: params.product.sku,
              ...(params.supplyChannel && { supplyChannel: { id: params.supplyChannel }}),
              ...(params.distributionChannel && { distributionChannel: { id: params.distributionChannel }}),
              externalPrice:{centPrecision:{centAmount:priceAmount,currencyCode:params.currenctCode}},
              custom:{typeKey:"line-item-type",
                      fields:[{"name":"offer_id","value":"\""+params.offerId+"\""}]}
            }
          };
        };

    return {
        addProductToCart
    }
}



