<template>
    <div class="create_quote">
      <div v-if="loading" class="loading">
        </div>
      <div v-else>
        <div v-show="successMessage != ''" class="success-message">
          {{successMessage}}
        </div>
        <div v-show="errorMessage != ''" class="error-message"> 
          {{errorMessage}}
        </div>
        <SfTabs :open-tab="1">
          <SfTab title="My quotes">
            <div v-if="products && products.length>0">
              <h3>Products</h3>
              <SfTable class="products">
                <SfTableHeading>
                  <SfTableHeader class="products__name">{{ $t('Product') }}</SfTableHeader>
                  <SfTableHeader>{{ $t('Orignal Unit Price') }}</SfTableHeader>
                  <SfTableHeader>{{ $t('Unit Price') }}</SfTableHeader>
                  <SfTableHeader>{{ $t('Quantity') }}</SfTableHeader>
                  <SfTableHeader>{{ $t('Subtotal') }}</SfTableHeader>
                  <SfTableHeader>{{ $t('Tax') }}</SfTableHeader>
                  <SfTableHeader>{{ $t('Total') }}</SfTableHeader>
                </SfTableHeading>
                <SfTableRow v-for="(item, i) in products" :key="i">
                  <SfTableData class="products__name">
                    <!-- <nuxt-link :to="'/p/'+orderGetters.getItemSku(item)+'/'+orderGetters.getItemSku(item)">
                      {{ orderGetters.getItemName(item) }}
                    </nuxt-link> -->
                    <p >
                        {{item.name}}
                    </p>
                  </SfTableData>
                  <SfTableData>
                    <p v-if="item.price"> 
                        ${{item.price.value.centAmount/100}}
                    </p>
                    <p v-else>
                      $0
                    </p>
                  </SfTableData>
                  <SfTableData>
                    <p v-if="item.price"> 
                        ${{item.price.value.centAmount/100}}
                    </p>
                    <p v-else>
                      $0
                    </p>
                  </SfTableData>
                  <SfTableData>
                    <p v-if="item.quantity"> 
                      {{item.quantity}}
                    </p>
                    <p v-else>
                      0
                    </p>
                  </SfTableData>
                  <SfTableData>
                    <p v-if="item.totalPrice"> 
                        ${{item.totalPrice.centAmount/100}}
                    </p>
                    <p v-else>
                      $0
                    </p>
                  </SfTableData>
                  <SfTableData>0</SfTableData>
                  <SfTableData>
  
                    <p v-if="item.totalPrice"> 
                        ${{item.totalPrice.centAmount/100}}
                    </p>
                    <p v-else>
                      $0
                    </p>
                  </SfTableData>
                </SfTableRow>
              </SfTable>
              <div>&nbsp;</div>
              <div>&nbsp;</div>
              <div v-if="!$apollo.loading" v-show="showButtons">
                <a class="button" :href="'#'" @click="createQuote(employeeId,email,companyId,currency)">Submit Quote</a>
                <span>&nbsp;&nbsp;</span>
                <a class="button" :href="'#'" @click="cancelQuote()">Cancel Quote</a>
                <!-- <span>&nbsp;&nbsp;</span>
                <a class="button" :href="'#'" @click="clearCart()">Clear Cart</a> -->
              </div>
            </div>

      
          </SfTab>
        </SfTabs>
        </div>
      </div>
      </template>
      
      <script>
      import {
        SfTabs,
        SfTable,
        SfButton,
        SfProperty,
        SfLink,
        SfArrow
      } from '@storefront-ui/vue';
      import { computed, ref, useRouter } from '@nuxtjs/composition-api';
      import {  useCart, cartGetters, useUser, userGetters } from '@vue-storefront/commercetools';
      import { onSSR } from '@vue-storefront/core';
      import { useShippingAddressQuote, useUiState } from '~/composables';
      import { CREATE_QUOTE_MUTATION ,GET_EMPLOYEE_DETAIL_QUERY,UPDATE_QUOTE_MUTATION} from '../graphql/queries/quotesQueries';
    

      
      export default  {
        name: 'QuotesList',
        props: ['quotes'],
        middleware: [
          'is-authenticated'
        ],
        data(){

          return{
            showButtons:true,
            successMessage:"",
            errorMessage:"",
            showSuccessMessage:false,
            showErrorMessage:false
          }
        },
        setup() {
          const currentQuote=ref(null);
          const { cart ,load,loading,clear,addItem,removeItem} = useCart();
          const user = useUser();
          const router = useRouter();
          const { toggleCartSidebar} = useUiState();
          
          const {load:loadCart} =useShippingAddressQuote();

          

          onSSR(async () => {
                await user.load();
                await load();

          });


          console.log("cart Me: "+ JSON.stringify(cart.value));

          const currentEmail = userGetters.getEmailAddress(user.user.value);
          const customerNumber = user.user.value;
  
          const tableHeaders = [
            'Quote Number',
            'Quote State',
            'Company Name',
            'Employee Email',
            'Total Price'
            ];

            // onSSR(async () => {
            //     await load();
            //     });

            const products = computed(() => cartGetters.getItems(cart.value));
            let currencyCode = ref('');

            if(products != null && products.value.length > 0){
              currencyCode = products.value[0].price.value.currencyCode;
            }else{
              router.push({path:"/"});
            }

            console.log("Product::: "+JSON.stringify(products));
            const clearCart = () =>{

              for (let i=0 ; i<products.value.length ; i++){
                removeItem({
                  product: {
                    id: products.value[i].id,
                  },
                });
            }
          }
  
            // const { user, register, login, loading } = useUser();
              
            return {
            tableHeaders,
            currentQuote,
            products,
            currencyCode,
            loading,
            currentEmail,
            customerNumber,
            clear,
            toggleCartSidebar,
            load,
            clearCart,
            loadCart
          };
        },
        methods :{
  
              async createQuote (employeeId,employeeEmail,companyId,currency) {

                // const data=  await this.loadCart("e0815b2a-3c6f-475b-aa5e-863c1b8faa17");

                // console.log("DAta:: "+JSON.stringify(data));
                // return;

                this.successMessage='';
                this.errorMessage='';
                this.showButtons = false;

                console.log("Products :: "+ JSON.stringify(this.products));

                // return false;

                  let lineItems = [];
                  for (var i=0 ;i < this.products.length ; i++) {

                    var prd= this.products[i];

                    let offerId = null;
                    if(prd.custom && prd.custom.customFieldsRaw){
                      offerId = prd.custom.customFieldsRaw.filter(cf => cf.name === 'offer_id')[0].value;
                    }else{
                      alert("Error Offer Id Missing!");
                      return false;
                    }

                    let priceAmount = prd.price.value.centAmount;
                    let currencyCode=prd.price.value.currencyCode;
                    let val ={ 
                      addLineItem: {
                          sku:prd.variant.sku,
                          quantity: parseInt(prd.quantity),
                          //price:{value:{centAmount:priceAmount,currencyCode}},
                          externalPrice:{centPrecision:{centAmount:priceAmount,currencyCode}},
                          custom:{typeKey:"line-item-type",
                            fields:[{"name":"offer_id","value":"\""+offerId+"\""}]}
                      }
                    }
                      lineItems.push(val);
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
                        //lineItems
                      }
                    } ;

                  let quoteId =null;
                  let version=null;
                  let error =false;
                  await this.$apollo.mutate({
                    mutation: CREATE_QUOTE_MUTATION,
                    variables: createQuoteDraft
                  }).then(res => { 
                    this.successMessage= "Qoute Created Successfully!";

                    console.log("rs:: "+JSON.stringify(res));
                    quoteId=res.data.createQuote.id;
                    version=res.data.createQuote.version;
                  }).catch((res) => {
                    alert('Error Occured!');
                    this.errorMessage= "Error Creating Quote!";
                    this.showButtons = true;
                    console.log("Error: "+JSON.stringify(res));
                    error = true;
                  });

                  const updatedQuote = await this.$vsf.$ct.api.addToCartWithMiraklPrice({
                      id:quoteId,
                      version:version,
                      actions: lineItems
                    });


                    console.log("updatedQuote :: " + JSON.stringify(updatedQuote));
                    
                  if(error){
                    return false;
                  }

                  version = updatedQuote.data.cart.version;
                  const actions = [
                    {
                      changeState :{
                        state:"submitted"
                      }
                    }
                  ];

                  let updateQuoteDraft = {
                    id:quoteId,
                    version,
                    actions
                  } ;

                  console.log("updateQuoteDraft"+ JSON.stringify(updateQuoteDraft));

                  await this.$apollo.mutate({
                    mutation: UPDATE_QUOTE_MUTATION,
                    variables: updateQuoteDraft,
                  },).then(res => {
                    // this.currentQuote = res.data.updateQuote;
                    this.successMessage= "Quote Submitted Successfully, Wait for Approval!";
                  }).catch((res) => {
                    this.errorMessage= "Error Submitting Quote!";
                    this.showButtons = true;
                  });
                  await this.clearCart();

                  console.log("T :: "+JSON.stringify(quoteId));

                  this.$router.push({path:'/q/'+quoteId});
                  return false;
              },
              cancelQuote(){
                this.loading = true;
                this.successMessage='';
                this.errorMessage='';
                this.showButtons = false;
                this.clearCart();
              }
        },
        async asyncData({ app, params ,loading,$vsf}) {
          const client = app.apolloProvider.defaultClient;
          const {data}= await $vsf.$ct.api.getMe({customer:true});

          if(data.me.activeCart == null){
            return;
          }
          const email = data.me.customer.email;
          const cartId = data.me.activeCart.id;
          const cartVersion = data.me.activeCart.version;
          console.log("Data : "+ JSON.stringify(email));

          const res = await client.query({
              query: GET_EMPLOYEE_DETAIL_QUERY,
              variables: {
                "limit": 10,
                "offset": 0,
                "where": "email=\""+email+"\""
              },
          });
          const results = res.data.employees.results;
          let currency=data.me.activeCart.lineItems[0].price.value.currencyCode;
          let employeeId="";
          let companyId="";

          if(results != null && results.length > 0){
             employeeId= results[0].id;
             companyId= results[0].customerGroup.key; 
          }
          return {
            currency,
            employeeId,
            companyId,
            email,
            cartId,
            cartVersion
          };
        },
        components: {
          SfTabs,
          SfTable,
          SfButton,
          SfProperty,
          SfLink,
          SfArrow
        }
      };
      </script>
      
      <style lang='scss' scoped>
      .pagination {
        padding-top: var(--spacer-base);
        display: flex;
        align-items: center;
        justify-content: center;
      }
      .pagination-count {
        padding: 0 var(--spacer-base);
      }
      .no-orders {
        &__title {
          margin: 0 0 var(--spacer-lg) 0;
          font: var(--font-weight--normal) var(--font-size--base) / 1.6 var(--font-family--primary);
        }
        &__button {
          --button-width: 100%;
          @include for-desktop {
            --button-width: 17,5rem;
          }
        }
      }
      .orders {
        @include for-desktop {
          &__element {
            &--right {
              --table-column-flex: 1;
              text-align: right;
            }
          }
        }
      }
      .all-orders {
        --button-padding: var(--spacer-base) 0;
      }
      .message {
        margin: 0 0 var(--spacer-xl) 0;
        font: var(--font-weight--light) var(--font-size--base) / 1.6 var(--font-family--primary);
        &__link {
          color: var(--c-primary);
          font-weight: var(--font-weight--medium);
          font-family: var(--font-family--primary);
          font-size: var(--font-size--base);
          text-decoration: none;
          &:hover {
            color: var(--c-text);
          }
        }
      }
      .product {
        &__properties {
          margin: var(--spacer-xl) 0 0 0;
        }
        &__property,
        &__action {
          font-size: var(--font-size--sm);
        }
        &__action {
          color: var(--c-gray-variant);
          font-size: var(--font-size--sm);
          margin: 0 0 var(--spacer-sm) 0;
          &:last-child {
            margin: 0;
          }
        }
        &__qty {
          color: var(--c-text);
        }
      }
      .products {
        --table-column-flex: 1;
        &__name {
          margin-right: var(--spacer-sm);
          @include for-desktop {
            --table-column-flex: 2;
          }
        }
      }
      .highlighted {
        box-sizing: border-box;
        width: 100%;
        background-color: var(--c-light);
        padding: var(--spacer-sm);
        --property-value-font-size: var(--font-size--base);
        --property-name-font-size: var(--font-size--base);
        &:last-child {
          margin-bottom: 0;
        }
        ::v-deep .sf-property__name {
          white-space: nowrap;
        }
        ::v-deep .sf-property__value {
          text-align: right;
        }
        &--total {
          margin-bottom: var(--spacer-sm);
        }
        @include for-desktop {
          padding: var(--spacer-xl);
          --property-name-font-size: var(--font-size--lg);
          --property-name-font-weight: var(--font-weight--medium);
          --property-value-font-size: var(--font-size--lg);
          --property-value-font-weight: var(--font-weight--semibold);
        }
      }
  
      h3,h5,p {
        margin-top: 2px;
        margin-bottom: 2px;
      }
      .handMouseOver {
       cursor: pointer; 
      }
      .right {
      display: block;
      float: right;
      width: 150px;
      border: 3px solid gray;
    }

    .button {
      border: 2px solid var(--c-primary);
      padding: 10px 20px;
      text-align: center;
      text-decoration: none;
      display: inline-block;
      font-size: 16px;
      margin-left: 20px;
      color: blue;
    }

    .button:hover  {
      background-color: var(--c-primary);
    }

    .success-message {
      background-color: var(--c-primary);
      color: white;
    }

    .error-message {
      background-color: blue;
      color: red;
    }
      </style>
      