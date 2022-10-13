<template>
    <div >
      <div v-if="$apollo.loading" class="loading">
        </div>
      <div v-else>
            <div v-if="quote">
            <h3>Quote Summary</h3>
              <table style="width:500px">
                <tr>
                  <td valign="top">
                      <div>
                        <h5>State</h5>
                          {{quote.quoteState}}
                      </div>
                </td>
                <td valign="top">
                  <div>
                      <table>
                        <tr>
                          <td><h5>Original Total</h5></td>
                          <td style="margin-left:10px;">
                            <p v-if="quote.totalPrice"> 
                              ${{quote.totalPrice.centAmount/100}}
                            </p>
                            <p v-else>
                              $0
                            </p>
                          </td>
                        </tr>
                        <tr>
                          <td><h5>Discount</h5></td>
                          <td style="margin-left:10px;">
                            <p v-if="quote.amountDiscount"> 
                              {{quote.amountDiscount.centAmount/100}}
                            </p>
                            <p v-else>
                              $0
                            </p>
                          </td>
                        </tr>
                        <tr>
                          <td class="line"><h5>Fianl Total</h5></td>
                          <td style="margin-left:10px;"> 
                            <p v-if="quote.totalPrice"> 
                              ${{quote.totalPrice.centAmount/100}}
                            </p>
                            <p v-else>
                              $0
                            </p>
                          </td>
                        </tr>
                      </table>
                  </div>
                  </td>
                </tr>
              </table>
          </div>
            <div>
              <h3>Employee</h3>
              <SfProperty
                name="Employee Email"
                :value="quote.employeeEmail"
                class="sf-property--full-width property"
              />
            <SfProperty
                name="Company Name"
                :value="quote.company.name"
                class="sf-property--full-width property"
              />
            </div>
            <div>&nbsp;</div>
            <div>&nbsp;</div>
              <SfTable class="quote">
                <SfTableHeading>
                  <SfTableHeader class="products__name">{{ $t('Product') }}</SfTableHeader>
                  <SfTableHeader>{{ $t('Orignal Unit Price') }}</SfTableHeader>
                  <SfTableHeader>{{ $t('Unit Price') }}</SfTableHeader>
                  <SfTableHeader>{{ $t('Quantity') }}</SfTableHeader>
                  <SfTableHeader>{{ $t('Subtotal') }}</SfTableHeader>
                  <SfTableHeader>{{ $t('Tax') }}</SfTableHeader>
                  <SfTableHeader>{{ $t('Total') }}</SfTableHeader>
                </SfTableHeading>
                <SfTableRow v-for="(item, i) in quote.lineItems" :key="i">
                  <SfTableData class="products__name">
                    <p v-for="name in item.nameAllLocales" :key="name.locale" v-show="name.locale === 'en'">
                        {{name.value}}
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
      // import { computed, ref, useRouter } from '@nuxtjs/composition-api';
      // import {  useCart, cartGetters, useUser, userGetters } from '@vue-storefront/commercetools';
      // import { onSSR } from '@vue-storefront/core';
      // import { useUiState } from '~/composables';
      import { GET_QUOTE_BY_ID } from '../../graphql/queries/quotesQueries';
    

      
      export default  {
        name: 'QuotesSummary',
        middleware: [
          'is-authenticated'
        ],
        // data(){

        //   return{
        //     showButtons:true,
        //     successMessage:"",
        //     errorMessage:"",
        //     showSuccessMessage:false,
        //     showErrorMessage:false
        //   }
        // },
        async asyncData({ app, params ,loading,$vsf}) {
          const client = app.apolloProvider.defaultClient;
          console.log("Context:: "+JSON.stringify(params));

          const {quoteId} = params;

         const quote = await client.query({
            query: GET_QUOTE_BY_ID,
            variables: {id:quoteId}
          })

          return {
            quote:quote.data.quote
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
      border: 2px solid #04AA6D;
      padding: 10px 20px;
      text-align: center;
      text-decoration: none;
      display: inline-block;
      font-size: 16px;
      margin-left: 20px;
      color: blue;
    }

    .button:hover  {
      background-color: #04AA6D;
    }

    .success-message {
      background-color: green;
      color: white;
    }

    .error-message {
      background-color: blue;
      color: red;
    }
      </style>
      