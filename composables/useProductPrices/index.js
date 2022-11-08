import { useContext,ssrRef} from '@nuxtjs/composition-api';

export const useProductPrices = (ids) => {

    const context = useContext();
    const loading = ssrRef(false);
    const productPrices = ssrRef([]);
    const lowestOffer =ssrRef(null);
    const otherOffers =ssrRef([]);
    let offerQty = ssrRef({});

    const getProductPrices= async(params) =>{

        try{
            loading.value = true;
           
            const auth =process.env.MIRAKL_AUTHORIZATION;

            context.$http.setHeader('Cache-Control', 'no-store');
            context.$http.setHeader('authorization', auth);
            //productPrices.value = await context.$http.$post('/product-prices-shopIds/',{"product_ids": params},{method:"POST"} );
            
            productPrices.value = await context.$http.$post('/product-prices/',{"product_ids": params},{method:"POST"} );

            // lowestOffer.value = computed(() => {
            //     if(productPrices?.value && productPrices?.value[0].offer){
            //      return productPrices?.value[0].offer[0];
            //     }
            //  });

            if(productPrices?.value && productPrices?.value[0].offer){
                lowestOffer.value =productPrices?.value[0].offer[0];

                if(productPrices?.value[0].offer.length > 1){
                    otherOffers.value = productPrices.value[0].offer.slice(1);
                }
            }
         
             //offerQty.value = computed(() =>{
               let q = {};
               if(productPrices?.value && productPrices?.value[0].offer){
                 for (var i=0 ;i<productPrices?.value[0].offer.length ; i++){
                   const o = productPrices?.value[0].offer[i];
                   q[o.offerId] = 1;
                 }
                 offerQty.value= q;
                }
            // });
            
        }catch(error){
            console.log('error 123: '+JSON.stringify(error));
        }
        finally{
            loading.value = false;
        }
    }

    return {
        getProductPrices,
        loading,
        productPrices,
        lowestOffer,
        otherOffers,
        offerQty
    }
}

