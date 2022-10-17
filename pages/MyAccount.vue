<template>
  <div id="my-account">
    <SfBreadcrumbs
      class="breadcrumbs desktop-only"
      :breadcrumbs="breadcrumbs"
    />
    <SfContentPages
      v-e2e="'my-account-content-pages'"
      title="My Account"
      :active="activePage"
      class="my-account"
      @click:change="changeActivePage"
    >
      <SfContentCategory title="Personal Details">
        <SfContentPage title="My profile">
          <MyProfile />
        </SfContentPage>

        <SfContentPage title="Shipping details">
          <ShippingDetails />
        </SfContentPage>

        <SfContentPage title="Billing details">
          <BillingDetails />
        </SfContentPage>

        <SfContentPage title="My newsletter">
          <MyNewsletter />
        </SfContentPage>

        <SfContentPage title="My quotes">
          <MyQuotes :customerEmail="email"/>
        </SfContentPage>



        <template v-if="isAdmin">
          <SfContentPage title="Quotes approval" >
            <QuotesApproval :companyId="companyId"/>
          </SfContentPage>

          <SfContentPage title="My employees">
            <MyEmployees :customerGroupId="customerGroupId"/>
          </SfContentPage>

        </template>
      </SfContentCategory>

      <SfContentCategory title="Order details">
        <SfContentPage title="Order history" >
          <OrderHistory />
        </SfContentPage>
      </SfContentCategory>

      <SfContentPage title="Log out" />
    </SfContentPages>
  </div>
</template>
<script>
import { SfBreadcrumbs, SfContentPages } from '@storefront-ui/vue';
import { computed, onBeforeUnmount, useRoute, useRouter } from '@nuxtjs/composition-api';
import { useUser } from '@vue-storefront/commercetools';
import MyProfile from './MyAccount/MyProfile';
import ShippingDetails from './MyAccount/ShippingDetails';
import BillingDetails from './MyAccount/BillingDetails';
import MyNewsletter from './MyAccount/MyNewsletter';
import OrderHistory from './MyAccount/OrderHistory';
import MyQuotes from './MyAccount/MyQuotes';
import QuotesApproval from './MyAccount/QuotesApproval';
import MyEmployees from './MyAccount/MyEmployees';

import {
  mapMobileObserver,
  unMapMobileObserver
} from '@storefront-ui/vue/src/utilities/mobile-observer.js';

import {ALL_QUOTES_QUERY ,GET_SUBMITTED_QUOTES,ALL_EMPLOYEES_QUERY} from '../graphql/queries/quotesQueries'

export default {
  name: 'MyAccount',
  components: {
    SfBreadcrumbs,
    SfContentPages,
    MyProfile,
    ShippingDetails,
    BillingDetails,
    MyNewsletter,
    OrderHistory,
    MyQuotes,
    QuotesApproval,
    MyEmployees
},
  middleware: [
    'is-authenticated'
  ],
  setup(props, context) {
    const route = useRoute();
    const router = useRouter();

    const { logout ,user} = useUser();
    const isMobile = computed(() => mapMobileObserver().isMobile.get());
    const activePage = computed(() => {
      const { pageName } = route.value.params;

      console.log("Humza : "+pageName);

      if (pageName) {
        console.log("Humza 1 : "+(pageName.charAt(0).toUpperCase() + pageName.slice(1)).replace('-', ' '));
        return (pageName.charAt(0).toUpperCase() + pageName.slice(1)).replace('-', ' ');
      } else if (!isMobile.value) {
        return 'My profile';
      } else {
        return '';
      }
    });

    const changeActivePage = async (title) => {
      if (title === 'Log out') {
        await logout();

        user;
        router.push(context.root.localePath({ name: 'home' }));
        return;
      }

      const slugifiedTitle = (title || '').toLowerCase().replace(' ', '-');
      const transformedPath = `/my-account/${slugifiedTitle}`;
      const localeTransformedPath = context.root.localePath(transformedPath);

      router.push(localeTransformedPath);
    };

    onBeforeUnmount(() => {
      unMapMobileObserver();
    });

    const email= computed(() => userGetters.getEmailAddress(user.value));

    return { changeActivePage, activePage,email };
  },

  data() {
    return {
      breadcrumbs: [
        {
          text: 'Home',
          route: { link: '#' }
        },
        {
          text: 'My Account',
          route: { link: '#' }
        }
      ]
    };
  },
  async asyncData({ app, params ,loading,$vsf}) {
        const client = app.apolloProvider.defaultClient;


        const {data}= await $vsf.$ct.api.getMe({customer:true});
        const email = data.me.customer.email;
        const {isAdmin,companyId,customerGroupId}= await $vsf.$ct.api.isAdmin({email});
        
        console.log("IS ADMIN :: "+JSON.stringify(isAdmin));
        console.log("Company Id :: "+JSON.stringify(companyId));
        console.log("customer grp id :: "+JSON.stringify(customerGroupId));

        
        console.log("IS ADMIN :: "+JSON.stringify(customerGroupId));
        return {
            //quotes,
            // adminQuotes:adminQuotes.quotes,
            isAdmin,
            companyId,
            email,
            customerGroupId
        };
    },
};
</script>

<style lang='scss' scoped>
#my-account {
  box-sizing: border-box;
  @include for-desktop {
    max-width: 1240px;
    margin: 0 auto;
  }
}
.my-account {
  @include for-mobile {
    --content-pages-sidebar-category-title-font-weight: var(
      --font-weight--normal
    );
    --content-pages-sidebar-category-title-margin: var(--spacer-sm)
      var(--spacer-sm) var(--spacer-sm) var(--spacer-base);
  }
  @include for-desktop {
    --content-pages-sidebar-category-title-margin: var(--spacer-xl) 0 0 0;
  }
}
.breadcrumbs {
  margin: var(--spacer-base) 0 var(--spacer-lg);
}
</style>
