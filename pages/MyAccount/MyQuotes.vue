<template>
  <div >
    <div v-if="$apollo.loading" class="loading">
      </div>
    <div v-else>
      <SfTabs :open-tab="1">
        <SfTab title="My quotes">
          <div v-if="currentQuote">
            <SfButton class="sf-button--text all-orders" @click="currentQuote = null">All Quotes</SfButton>
            <div
                v-e2e="'order-details'"
                class="highlighted highlighted--total"
              >

              <div class="right" v-if="currentQuote.quoteState === 'initial' || currentQuote.quoteState === 'submitted'">
                <span class="handMouseOver" @click.stop="updateQuoteStatus('submitted',currentQuote.id,currentQuote.version)" v-if="currentQuote.quoteState === 'initial'">
                  Submit
                </span>
                <span class="handMouseOver" @click.stop="updateQuoteStatus('approved',currentQuote.id,currentQuote.version)" v-else-if="currentQuote.quoteState === 'submitted'">
                  Activate
                </span>
                <span>&nbsp;&nbsp;|&nbsp;&nbsp;</span>
                <span class="handMouseOver" @click.stop="updateQuoteStatus('declined',currentQuote.id,currentQuote.version)">Decline</span>
              </div>

              <table style="width:500px">
                <tr>
                  <td valign="top">
                      <div>
                        <h5>State</h5>
                          {{currentQuote.quoteState}}
                      </div>
                </td>
                <td valign="top">
                  <div>
                      <table>
                        <tr>
                          <td><h5>Original Total</h5></td>
                          <td style="margin-left:10px;">
                            <p v-if="currentQuote.totalPrice"> 
                              ${{currentQuote.totalPrice.centAmount/100}}
                            </p>
                            <p v-else>
                              $0
                            </p>
                          </td>
                        </tr>
                        <tr>
                          <td><h5>Discount</h5></td>
                          <td style="margin-left:10px;">
                            <p v-if="currentQuote.amountDiscount"> 
                              {{currentQuote.amountDiscount.centAmount/100}}
                            </p>
                            <p v-else>
                              $0
                            </p>
                          </td>
                        </tr>
                        <tr>
                          <td class="line"><h5>Fianl Total</h5></td>
                          <td style="margin-left:10px;"> 
                            <p v-if="currentQuote.totalPrice"> 
                              ${{currentQuote.totalPrice.centAmount/100}}
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
                :value="currentQuote.employeeEmail"
                class="sf-property--full-width property"
              />
            <SfProperty
                name="Company Name"
                :value="currentQuote.company.name"
                class="sf-property--full-width property"
              />
            </div>

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
              <SfTableRow v-for="(item, i) in currentQuote.lineItems" :key="i">
                <SfTableData class="products__name">
                  <!-- <nuxt-link :to="'/p/'+orderGetters.getItemSku(item)+'/'+orderGetters.getItemSku(item)">
                    {{ orderGetters.getItemName(item) }}
                  </nuxt-link> -->
                  <p v-for="(name1, k)  in item.nameAllLocales" :key="k" v-show="name1.locale === 'en'">
                      {{name1.value}}
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
          <div v-else>
            <p class="message">
              {{ $t('Details and status orders') }}
            </p>

                      
            <div v-if="quotes.results.length === 0" class="no-orders">
              <p class="no-orders__title">{{ $t('You currently have no orders') }}</p>
              <SfButton class="no-orders__button">{{ $t('Start shopping') }}</SfButton>
            </div>
            <SfTable v-else class="orders">
              <SfTableHeading>
                <SfTableHeader
                  v-for="tableHeader in tableHeaders"
                  :key="tableHeader"
                >{{ tableHeader }}</SfTableHeader>
                <SfTableHeader class="orders__element--right" />
              </SfTableHeading>
              <SfTableRow v-for="quote in quotes.results" :key="quote.id">
                <SfTableData v-e2e="'quote-number'">{{ quote.quoteNumber}}</SfTableData>
                <SfTableData v-e2e="'quote-state'">{{ quote.quoteState }}</SfTableData>
                <SfTableData v-e2e="'quote-company-name'">{{ quote.company.name }}</SfTableData>
                <SfTableData v-e2e="'quote-totalPrice'">
                  <p v-if="quote.totalPrice"> 
                      {{ quote.totalPrice.centAmount/100 }} - {{quote.totalPrice.currencyCode}}
                  </p>
                  <p v-else>
                      0
                  </p>
                </SfTableData>
                <SfTableData class="orders__view orders__element--right">
                  <SfButton class="sf-button--text desktop-only" @click="currentQuote = quote">
                    {{ $t('View details') }}
                  </SfButton>
                </SfTableData>
              </SfTableRow>
            </SfTable>
            <!-- <div
              v-e2e="'order-history-pagination'"
              class="pagination"
              v-if="orders.length < totalOrders"
            >
              <SfArrow
                aria-label="prev"
                class="sf-arrow--left sf-arrow--transparent"
                :disabled="offset === 0"
                @click="goPrev(offset)"
              />
              <div
                v-e2e="'order-history-pagination-count'"
                class="pagination-count"
              >
                {{ orders.length > 1 ? `${offset + 1} - ` : "" }} {{ offset + orders.length }}
                <strong>of</strong> {{ totalOrders }}
              </div>
              <SfArrow
                aria-label="next"
                class="sf-arrow--right sf-arrow--transparent"
                :disabled="(offset + orders.length) === totalOrders"
                @click="goNext(offset)"
              />
            </div> -->
          </div>
        </SfTab>
        <SfTab title="Returns">
          <p class="message">
            This feature is not implemented yet! Please take a look at
            <br />
            <SfLink class="message__link" href="#">https://github.com/DivanteLtd/vue-storefront/issues</SfLink>
            for our Roadmap!
          </p>
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
    import { computed, ref } from '@nuxtjs/composition-api';
    import gql from 'graphql-tag'
    //import { useUser } from '@vue-storefront/commercetools';
  
      const ALL_QUOTES_QUERY = gql`
      query GET_ALL_QUOTES{
      quotes{
          count
          total
          results{
          id
          version
          employeeEmail
          quoteState
          quoteNumber
          percentageDiscount
          totalPrice{
              centAmount,
              currencyCode
          }
          company{
              id,
              name
          }
          lineItems{
            quantity
            price{
              value{
                currencyCode
                centAmount
              }
            }
            originalPrice{
              centAmount
              currencyCode
            }
            totalPrice{
              centAmount
              currencyCode
            }
            nameAllLocales{
              locale
              value
            }
            variant{
              sku
              price{
                value{
                  centAmount
                  currencyCode
                }
              }
            }
          }
          }
      }
      }
      `;

      const UPDATE_QUOTE_MUTATION = gql`
        mutation UPDATE_QUOTE_MUTATION($id:String!,$version:Long!,$actions:[QuoteUpdateAction!]!){
          updateQuote(id:$id,version:$version,actions:$actions){
            id
            version
            employeeEmail
            quoteState
            quoteNumber
            percentageDiscount
            totalPrice{
                centAmount,
                currencyCode
            }
            company{
                id,
                name
            }
            lineItems{
              quantity
              price{
                value{
                  currencyCode
                  centAmount
                }
              }
              originalPrice{
                centAmount
                currencyCode
              }
              totalPrice{
                centAmount
                currencyCode
              }
              nameAllLocales{
                locale
                value
              }
              variant{
                sku
                price{
                  value{
                    centAmount
                    currencyCode
                  }
                }
              }
            }
          }
        }
        `;
    
    export default  {
      name: 'QuotesList',

      setup() {
        const currentQuote=ref(null);

        const tableHeaders = [
          'Quote Number',
          'Quote State',
          'Company Name',
          'Employee Email',
          'Total Price'
          ];

          // const { user, register, login, loading } = useUser();
            
          return {
          tableHeaders,
          currentQuote,
          // register,
          // login,
          // loading,
          // firstName: user.value,
        };
      },
      apollo: {
          quotes: {
          query: ALL_QUOTES_QUERY,
          prefetch: true,
          },
      },
      methods :{

        updateQuoteStatus(status,id,ver) {
          const version = Number(ver);
          const actions = [
            {
              changeState :{
                state:status
              }
            }
          ];

          let updateQuoteDraft = {
            id,
            version,
            actions
          } ;

          console.log(updateQuoteDraft);
          
          this.$apollo.mutate({
            mutation: UPDATE_QUOTE_MUTATION,
            variables: updateQuoteDraft
          }).then((res) => { 

            window.location.reload();
          }).catch((res) => {
            alert('Error Occured!')
          });

          return false;
        }
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
    </style>
    