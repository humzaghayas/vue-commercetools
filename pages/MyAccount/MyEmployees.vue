<template>
    <div >
        <h1>My Employees</h1>
      <div v-if="$apollo.queries.employees.loading" class="loading">
        </div>
      <div v-else>
        <SfTabs :open-tab="1">
          <SfTab title="My employees">
            <div v-if="currentEmployee">
              <SfButton class="sf-button--text all-orders" @click="currentEmployee = null">All Employees</SfButton>
              <div
                  v-e2e="'order-details'"
                  class="highlighted highlighted--total"
                >
  
                <table style="width:500px">
                    <tr>
                      <td valign="top">
                            <div>
                               <h5>Salutation</h5>
                                {{currentEmployee.salutation}}
                            </div>
                      </td>
                  
                      <td valign="top">
                            <div>
                               <h5>Vat Id</h5>
                                {{currentEmployee.vatId}}
                            </div>
                      </td>
                  
                      <td valign="top">
                            <div>
                               <h5>Amount Extended</h5>
                                {{currentEmployee.amountExpended.centAmount/100}}
                            </div>
                      </td>
                  
                      <td valign="top">
                            <div>
                               <h5>Title</h5>
                                {{currentEmployee.title}}
                            </div>
                      </td>
                  
                      <td valign="top">
                            <div>
                               <h5>Email State</h5>
                                <p v-if="currentEmployee.isEmailVerified">
                                    Verified
                                </p>
                                <p v-else>
                                    Not Verified
                                </p>
                            </div>
                      </td>
                    </tr>
                    <tr v-for="address in currentEmployee.addresses" :key="address.id">
                        <th>Address</th>
                          <td valign="top">
                                <div>
                                   <h5>Street Name</h5>
                                    {{address.streetName}}
                                </div>
                          </td>
                          <td valign="top">
                                <div>
                                   <h5>Street Number</h5>
                                    {{address.streetNumber}}
                                </div>
                          </td>
                          <td valign="top">
                                <div>
                                   <h5>Region</h5>
                                    {{address.region}}
                                </div>
                          </td>
                          <td valign="top">
                                <div>
                                   <h5>City</h5>
                                    {{address.city}}
                                </div>
                          </td>
                          <td valign="top">
                                <div>
                                   <h5>State</h5>
                                    {{address.state}}
                                </div>
                          </td>
                          <td valign="top">
                                <div>
                                   <h5>Country</h5>
                                    {{address.country}}
                                </div>
                          </td>
                          <td valign="top">
                                <div>
                                   <h5>Postal Code</h5>
                                    {{address.postalCode}}
                                </div>
                          </td>
                          <!-- <tr v-if="address.contactInfo">
            <td valign="top">
                <div>
                   <h5>Phone</h5>
                    {{address.contactInfo.phone}}
                </div>
          </td>
          <td valign="top">
                <div>
                   <h5>Mobile</h5>
                    {{address.contactInfo.mobile}}
                </div>
          </td>
          <td valign="top">
                <div>
                   <h5>Email</h5>
                    {{address.contactInfo.email}}
                </div>
          </td>
          <td valign="top">
                <div>
                   <h5>Fax</h5>
                    {{address.contactInfo.fax}}
                </div>
          </td>
          </tr> -->
                    </tr>
                </table>
            </div>
              <div>
                <h3>Employee</h3>
                <SfProperty
                  name="Employee Email"
                  :value="currentEmployee.email"
                  class="sf-property--full-width property"
                />
              <SfProperty
                  name="Company Name"
                  :value="currentEmployee.customerGroup.name"
                  class="sf-property--full-width property"
                />
              </div>
  
            </div>
            <div v-else>
              <p class="message">
                 List of All Employees 
              </p>
                        
              <div v-if="employees.results.length === 0" class="no-orders">
                <p class="no-orders__title">{{ $t('You currently have no orders') }}</p>
                <!-- <SfButton class="no-orders__button">{{ $t('Start shopping') }}</SfButton> -->
              </div>
              <SfTable v-else class="orders">
                <SfTableHeading>
                  <SfTableHeader
                    v-for="tableHeader in tableHeaders"
                    :key="tableHeader"
                    
                  >{{ tableHeader }}</SfTableHeader>
                  <SfTableHeader class="orders__element--right" />
                </SfTableHeading>
                <SfTableRow v-for="employee in employees.results" :key="employee.id">
                  <SfTableData v-e2e="'employee-first-name'">{{ employee.firstName}}</SfTableData>
                  <SfTableData v-e2e="'employee-last-name'">{{ employee.lastName }}</SfTableData>
                  <SfTableData v-e2e="'employee-company-name'">{{ employee.customerGroup.name }}</SfTableData>
                  <SfTableData v-e2e="'employee-email'">{{ employee.email }}</SfTableData>
                  <SfTableData v-e2e="'employee-expended-amount'">
                    <p v-if="employee.amountExpended"> 
                        {{ employee.amountExpended.centAmount/100 }} - {{employee.amountExpended.currencyCode}}
                    </p>
                    <p v-else>
                        0
                    </p>
                  </SfTableData>
                  <SfTableData class="orders__view orders__element--right">
                    <SfButton class="sf-button--text desktop-only" @click="currentEmployee = employee">
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
          <SfTab title="Add Employee">
            <form  class="form" @submit.prevent="addEmployeeData"> 
                <div class="form__horizontal">
                   <div class="form-element">
                    
                    <SfInput
                        value=""
                        v-model="emp.email"
                        type="select"
                        name="name"
                        label="Email"
                        required
                    />

                    <SfInput
                        v-model="emp.firstName"
                        name="name"
                        label="First Name"
                        type="select"
                        required
                    />

                    <SfInput
                        v-model="emp.lastName"
                        name="lastName"
                        label="Last Name"
                        required
                    />

                    <SfInput
                        v-model="emp.password"
                        type="password"
                        name="password"
                        label="Password"
                        required
                    />
                    


                    <!-- Multiple -->
                    <select v-model="emp.selectedRoles" multiple>
                      <option value="b2b-company-admin">b2b-company-admin</option>
                      <option value="b2b-company-employee">b2b-company-employee</option>
                    </select>

                   </div>
                </div>
                                
                <div class="button">
                    <!-- <button class="submit" type="submit">Sign up here</button> -->
                    <SfButton
                        class="form__button"
                        >
                        Submit
                    </SfButton>
                </div>
            </form>
            
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
      import SfInput from '@storefront-ui/vue/src/components/atoms/SfInput/SfInput.vue';
      import { useUser, userGetters } from '@vue-storefront/commercetools';

    //   const customerGroup = userGetters.getCustomerGroup();

    import {ADD_EMPLOYEE_MUTATION,ALL_EMPLOYEES_QUERY} from '../../graphql/queries/quotesQueries'

    export default  {
        name: 'EmployeesList',
        props: ['customerGroupId'],
        setup() {
          const currentEmployee=ref(null);
          
          console.log("My Employees Component")
        //   console.log("My Employees"+this.employees)

          const tableHeaders = [
            'First Name',
            'Last Name',
            'Company Name',
            'Email',
            'Amount Expended'
            ];
            // const { user, register, login, loading } = useUser();.
            // const addEmployeeData = ({ form, onComplete, onError }) => formHandler(() => console.log("Add Employee Form Value"+form.value), onComplete, onError);
            return {
            tableHeaders,
            currentEmployee,            
            // register,
            // login,
            // loading,
            // firstName: user.value,
          };
        },
        components: {
            SfTabs,
            SfTable,
            SfButton,
            SfProperty,
            SfLink,
            SfArrow,
            SfInput
        },
        data() {
                   return{
                        emp:{
                              firstName:'',
                              email:'',
                              lastName:'',
                              password:'',
                              selectedRoles:[]
                        },
                      limitQ:10,
                      offsetQ:0,
                  }
            },
        apollo:{
          employees: {
            query: ALL_EMPLOYEES_QUERY,
            // Reactive parameters
            variables () {

              const whereCG="customerGroup(id=\""+this.customerGroupId+"\")";
              return {
                limit:this.limitQ,
                offset:this.offsetQ,
                where: whereCG
              }
            }
          }
        },
        methods:{
            addEmployeeData(){
                // e.preventDefault();
                // console.log(this.email);
                // console.log(this.password);
                // console.log(this.firstName);
                // console.log(this.lastName);
                


                const addEmployeeDraft = {
                    firstName:this.emp.firstName,
                    lastName:this.emp.lastName,
                    password:this.emp.password,
                    email:this.emp.email,
                    roles:this.emp.selectedRoles,
                    customerGroup:{
                        id: "ebdf0b35-9397-484b-a1ac-9ffbf11be366"
                    }
                }

                console.log(addEmployeeDraft);


                this.$apollo.mutate({
                    mutation: ADD_EMPLOYEE_MUTATION,
                    variables: addEmployeeDraft
                }).then((res)=>{
                    window.location.reload();
                    console.log("Employee Created"+res)
                }).catch((err)=>{
                    console.log("Error in Employee create Mutation"+err);
                });

                

            }
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
      