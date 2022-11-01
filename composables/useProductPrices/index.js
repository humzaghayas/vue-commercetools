import { useContext,ssrRef} from '@nuxtjs/composition-api';

export const useProductPrices = (ids) => {

    const context = useContext();
    const loading = ssrRef(false);
    const productPrices = ssrRef([]);

    const getProductPrices= async(params) =>{

        console.log('Prices :::: Params :: '+ JSON.stringify(params));
        try{
            loading.value = true;
           
            const auth =process.env.MIRAKL_AUTHORIZATION;

            context.$http.setHeader('Cache-Control', 'no-store');
            context.$http.setHeader('authorization', auth);
            productPrices.value = await context.$http.$post('/product-prices-shopIds/',{"product_ids": params},{method:"POST"} );
            
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

