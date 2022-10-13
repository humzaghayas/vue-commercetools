<template>
  <div>
    <div v-if="$apollo.loading" class="loading">
      </div>
    <div v-else>
      <h1>Quotes Summary</h1>

      <div class="right" v-if="quote.quoteState === 'initial' || quote.quoteState === 'submitted'">
        <span class="handMouseOver" @click="updateQuoteStatus('submitted',quote.id,quote.version)" v-if="quote.quoteState === 'initial'">
          Submit
        </span>
        <span class="handMouseOver" @click="updateQuoteStatus('approved',quote.id,quote.version)" v-else-if="quote.quoteState === 'submitted'">
          Activate
        </span>
        <span>&nbsp;&nbsp;|&nbsp;&nbsp;</span>
        <span class="handMouseOver" @click="updateQuoteStatus('declined',quote.id,quote.version)">Decline</span>
      </div>
    
    <div>&nbsp;</div>
    <a :href="'/quotes'">Back To Quotes</a>
    <div>&nbsp;</div>
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

  <div>
    <h5>Employee</h5>
    <div>
      <p>
        Employee Email: {{quote.employeeEmail}}
      </p>
      <p>
        Company Name: {{quote.company.name}}
      </p>
    </div>
  </div>
  <div>&nbsp;</div>
  <table width="100%">
    <tr>
      <th width="20%">Prodct</th>
      <th width="10%">Orignal Unit Price</th>
      <th width="20%">Unit Price</th>
      <th width="10%">Qty</th>
      <th width="10%">Subtotal</th>
      <th width="10%">Tax</th>
      <th width="10%">Total</th>
      <th width="10%">Actions</th>
    </tr>
    <tr v-for="prd in quote.lineItems" :key="prd.variant.sku" >
      <td width="20%" style="text-align: center;">
        <p v-for="name in prd.nameAllLocales" :key="name.locale" v-show="name.locale === 'en'">
            {{name.value}}
        </p>
      </td>
      <td width="10%" style="text-align: center;">
        <p v-if="prd.price"> 
            ${{prd.price.value.centAmount/100}}
        </p>
        <p v-else>
           $0
        </p>
      </td>
      <td width="20%" style="text-align: center;">
        <p v-if="prd.price"> 
            ${{prd.price.value.centAmount/100}}
        </p>
        <p v-else>
           $0
        </p>
      </td>
      <td width="10%" style="text-align: center;">
        <p v-if="prd.quantity"> 
            {{prd.quantity}}
        </p>
        <p v-else>
           0
        </p>

      </td>
      <td width="10%" style="text-align: center;">
        <p v-if="prd.totalPrice"> 
            ${{prd.totalPrice.centAmount/100}}
        </p>
        <p v-else>
           $0
        </p>
      </td>
      <td width="10%" style="text-align: center;">$0</td>
      <td width="10%" style="text-align: center;">

        <p v-if="prd.totalPrice"> 
            ${{prd.totalPrice.centAmount/100}}
        </p>
        <p v-else>
           $0
        </p>
      </td>
      <td width="10%" style="text-align: center;"></td>
    </tr>
  </table>

</div>
  </div>
</template>
<script>

import gql from 'graphql-tag'
import SfAccordion from '@storefront-ui/vue/src/components/organisms/SfAccordion/SfAccordion.vue';

const UPDATE_QUOTE_MUTATION = gql`
  mutation UPDATE_QUOTE_MUTATION($id:String!,$version:Long!,$actions:[QuoteUpdateAction!]!){
    updateQuote(id:$id,version:$version,actions:$actions){
      id
      version
      employeeEmail
    }
  }
  `;

const QUOTE_BY_ID_QUERY = gql`
query QUOTE_BY_ID_QUERY($id:String!){
  quote(id:$id){
    id
    version
    employeeEmail
    company{
      name
    }
    quoteState
    quoteNumber
    
    amountDiscount{
      currencyCode
      currencyCode
    }
    percentageDiscount
    
    originalTotalPrice{
      currencyCode
      centAmount
    }
    
    totalPrice{
      currencyCode
      centAmount
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

export default {
    async asyncData({ app, params ,loading}) {
        const client = app.apolloProvider.defaultClient;
        const { quoteId } = params;
        const res = await client.query({
            query: QUOTE_BY_ID_QUERY,
            variables: {
                id: quoteId
            },
        });
        const { quote } = res.data;
        return {
            quote,
        };
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
        }).then(() => { 
          window.location.reload();
         }).catch((res) => {
          alert('Error Occured!')
        });

        return false;

       }
    },
    components: { SfAccordion }
}
  </script>

<style scoped>

.rheight{
  height: 20px;
}
  .line{
    border-top: 5px solid black;
  }
  .left {
    float: left;
    width: 200px;
    margin: auto;
    border: 3px solid gray;
  }

  h5 {
    margin-top: 2px;
    margin-bottom: 2px;
  }

  p {
    margin-top: 0px;
    margin-bottom: 0px;
  }
  .right {
    display: block;
    float: right;
    width: 150px;
    border: 3px solid gray;
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

  .handMouseOver {
     cursor: pointer; 
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