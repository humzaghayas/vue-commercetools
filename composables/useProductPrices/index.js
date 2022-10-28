import { useContext,ssrRef} from '@nuxtjs/composition-api';

export const useProductPrices = (ids) => {

    const context = useContext();
    const loading = ssrRef(false);
    const productPrices = ssrRef([]);

    const getProductPrices= async(params) =>{

        console.log('Prices :::: Params :: '+ JSON.stringify(params));
        try{
            loading.value = true;
            context.$http.setHeader('authorization', 'secure');

            const auth =process.env.MIRAKL_AUTHORIZATION;

            if(process.client){
                console.log("client side!");
            }

            console.log('secure');
            context.$http.setHeader('Cache-Control', 'no-store');
            productPrices.value = await context.$http.$post('/product-prices/',{"product_ids": params},{method:"POST"} );
            
            console.log('proces val :: '+JSON.stringify(productPrices.value));
        }catch(error){
            console.log('error : '+JSON.stringify(error));
        }
        finally{
            loading.value = false;
        }
    }

    return {
        getProductPrices,
        loading,
        productPrices
    }
}

