<template>
    <div>
      <!-- <p v-if="$fetchState.pending">
        <span class="loading"></span>
      </p>
      <p v-else-if="$fetchState.error">Error while fetching </p> -->

      <SfLoader :class="{ loading }" :loading="loading">
            <div class="products" v-if="!loading">
              <div>&nbsp;</div>
                <a :href="'/quotes'">Back To Quotes</a>
              <div>&nbsp;</div>
              <div>&nbsp;</div>
              <div>&nbsp;</div>

              <transition-group
                v-if="isCategoryGridView"
                appear
                name="products__slide"
                tag="div"
                class="products__grid"
              >
                <SfProductCard
                  v-e2e="'category-product-card'"
                  v-for="(product, i) in products"
                  :key="productGetters.getSlug(product)"
                  :style="{ '--index': i }"
                  :title="productGetters.getName(product)"
                  :image="productGetters.getCoverImage(product)"
                  :regular-price="$n(productGetters.getPrice(product).regular, 'currency')"
                  :special-price="productGetters.getPrice(product).special && $n(productGetters.getPrice(product).special, 'currency')"
                  :max-rating="5"
                  :score-rating="productGetters.getAverageRating(product)"
                  :show-add-to-cart-button="true"
                  :link="localePath(`/p/${productGetters.getId(product)}/${productGetters.getSlug(product)}`)"
                  class="products__product-card"
                />
              </transition-group>
              
              <transition-group
                v-else
                appear
                name="products__slide"
                tag="div"
                class="float-container"
              >

                    <div class="float-child" v-for="product in products" :key="productGetters.getSlug(product)">
                      <!-- <SfProductCard
                        v-e2e="'category-product-card'"
                        v-for="(product, i) in products"
                        class="products__product-card-horizontal"
                        :key="productGetters.getSlug(product)"
                        :style="{ '--index': i }"
                        :title="productGetters.getName(product)"
                        :description="productGetters.getDescription(product)"
                        :image="productGetters.getCoverImage(product)"
                        :regular-price="$n(productGetters.getPrice(product).regular, 'currency')"
                        :special-price="productGetters.getPrice(product).special && $n(productGetters.getPrice(product).special, 'currency')"
                        :max-rating="5"
                        :score-rating="3"
                        :qty="1"
                        :link="localePath(`/p/${productGetters.getId(product)}/${productGetters.getSlug(product)}`)"
                        @input="productsQuantity[product._id] = $event"
                      /> -->

                      <h5>{{productGetters.getName(product)}}</h5>

                      <div style="image-st">
                        <img :src="productGetters.getCoverImage(product)" alt="" width="100%" height="100%">

                      </div>
                      <h5>{{productGetters.getSku(product)}}</h5>

                      {{productGetters.getPrice(product).special && $n(productGetters.getPrice(product).special, 'currency')}}

                      <div>&nbsp;</div>
                      <input :id="'qty_'+productGetters.getSku(product)" 
                            name="skuQuantity" 
                            v-model="skuQuantity[productGetters.getSku(product)]"/>&nbsp;&nbsp;

                     </div>
              
              </transition-group>
            </div>
          </SfLoader>
          <div>&nbsp;</div>
          <div>&nbsp;</div>
          <div>&nbsp;</div>

          <button @click="createQuote()">Create Quote</button>

        <br/>
        {{skuQuantity}}
          
       </div>
  </template>
  <script lang="ts">
  import gql from 'graphql-tag'

  const CREATE_QUOTE_MUTATION = gql`
  mutation CREATE_QUOTE_MUTATION($draft:CreateQuoteDraft!){
    createQuote(draft:$draft){
      employeeId
      employeeEmail
    }
  }
  `;

import {
  SfProductCard,
  SfProductCardHorizontal,
  SfLoader,
} from '@storefront-ui/vue';
import { productGetters, useProduct } from '@vue-storefront/commercetools';
import { onSSR } from '@vue-storefront/core';
import type { ProductsSearchParams } from '@vue-storefront/commercetools';

export default {

  data(){
    return {
      skuQuantity:{},
      isCategoryGridView:false
    }
  },
    setup() {
        const { products, search,loading } = useProduct("test");
        const searchParams: ProductsSearchParams = { page: 1, perPage: 5,
          catId:"06630bbd-9483-415d-b607-30d2424f9c45"};
        onSSR(async () => {
            await search(searchParams);
        });

        return {
            products,
            productGetters,
            loading
        };
    },
    methods :{
       createQuote () {

        let currency="USD";
        let employeeEmail="humza.ghayas@royalcyber.com";
        let employeeId="1132ee81-116c-4cd5-b982-3faab4a3d4b0";
        let companyId="9e7e7700-3f38-11ed-920a-5ffc1af93431";

        let lineItems:any = [];

        for (var sku in this.skuQuantity) {
          if (this.skuQuantity.hasOwnProperty(sku)) {

            if( this.skuQuantity[sku] !== undefined && this.skuQuantity[sku] > 0){
              let val ={ 
                    sku,
                    quantity: parseInt(this.skuQuantity[sku]) 
                }
                lineItems.push(val);
            }
          }
      }

      if(lineItems.length == 0){
        alert('Please add some items!');
        return false;
      }


        let createQuoteDraft = {"draft":{
              currency,
              employeeEmail,
              employeeId,
              companyId,
              lineItems
            }
          } ;

        console.log(createQuoteDraft);
        this.$apollo.mutate({
          mutation: CREATE_QUOTE_MUTATION,
          variables: createQuoteDraft
        }).then(() => { 
          this.$router.push({path:'/quotes'});
         }).catch((res) => {
          alert('Error Occured!')
        });

        return false;
      }
    },
    components: { SfProductCardHorizontal, SfProductCard, SfLoader }
}
  </script>
  <style scoped>
  
  table, th, td {
    border: 1px solid black;
  }
  
  li {
    margin-bottom: 0.5rem;
  }
  li:first-letter {
    text-transform: uppercase;
  }
  .loading {
    display: inline-block;
    width: 1.5rem;
    height: 1.5rem;
    border: 4px solid rgba(9, 133, 81, 0.705);
    border-radius: 50%;
    border-top-color: #158876;
    animation: spin 1s ease-in-out infinite;
  }
  @keyframes spin {
    to {
      -webkit-transform: rotate(360deg);
    }
  }
  
  p {
      margin-top: 0px;
      margin-bottom: 0px;
    }

    .float-container {
      width: 100%;
    border: 3px solid #fff;
    padding: 20px;
}

.float-child {
    width: 25%;
    /* float: left;*/ 
    padding: 10px;
    border: 2px solid red;
}
.image-st{
  padding-top: 10px;
  padding-bottom: 2px;
}
h5 {
  margin-top: 0px;
    margin-bottom: 0px;
}

a:link {
    color: blue;
  }

  a:visited {
    color: blue;
  }

  a:hover  {
    color: red;
  }
  </style>

  