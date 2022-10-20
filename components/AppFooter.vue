<template>
  <SfFooter :column="4" multiple class="footer" id="footer">
     <!-- <SfFooterColumn > -->
      <!-- <SfList>
        <SfListItem
          v-for="item in aboutUs"
          :key="item"
          >
          <SfMenuItem
            :label="$t(item)"
          />
        </SfListItem>
      </SfList> -->
       <SfImage src="/icons/footer-logo.svg" alt="Vue Storefront Next" class="sf-footer__logo-image dr-footer-logo"/>
    <!-- </SfFooterColumn> -->
    <SfFooterColumn :title="$t('API')">
       <SfList>
        <SfListItem >
          Active Pharmaceutical Ingredients
        </SfListItem>
        <SfListItem >
        The Dr. Reddy’s API business is a leading manufacturer and supplier of high quality affordable Active Pharmaceutical Ingredients (API) to leading generic formulations manufacturers across the world, enabling them to accelerate access to affordable medicines for patients worldwide.
        </SfListItem>
      </SfList>
      <!-- <p>Active Pharmaceutical Ingredients
The Dr. Reddy’s API business is a leading manufacturer and supplier of high quality affordable Active Pharmaceutical Ingredients (API) to leading generic formulations manufacturers across the world, enabling them to accelerate access to affordable medicines for patients worldwide.</p> -->
      <!-- <SfList>
        <SfListItem
          v-for="item in aboutUs"
          :key="item"
          >
          <SfMenuItem
            :label="$t(item)"
          />
        </SfListItem>
      </SfList> -->
    </SfFooterColumn>
    <SfFooterColumn :title="$t('Company')">
         <SfList>
        <SfListItem
  
        >
      Resources
        </SfListItem>
         <SfListItem
  
        >
      Privacy Policy
        </SfListItem>
      </SfList>
      <!-- <SfList>
        <SfListItem
          v-for="item in departments"
          :key="item"
        >
          <SfMenuItem
            :label="$t(item)"
          />
        </SfListItem>
      </SfList> -->
    </SfFooterColumn>
    <SfFooterColumn :title="$t('')">
       <SfList  class="footer-company">
        <SfListItem
  
        >
       Cookie Policy
        </SfListItem>
         <SfListItem
  
        >
      Terms Of Use
        </SfListItem>
      </SfList>
      <!-- <SfList>
        <SfListItem
          v-for="item in help"
          :key="item"
        >
          <SfMenuItem
            :label="$t(item)"
          />
        </SfListItem>
      </SfList> -->
    </SfFooterColumn>
    <div id="footer-contact">
    <SfFooterColumn :title="$t('Contact Us')">
       <SfList>
        <SfListItem
  
        >
       api@drreddys.com
        </SfListItem>
         <SfListItem
  
        >
       +91 40 49002253
        </SfListItem>
      </SfList>
      <!-- <SfList>
        <SfListItem
          v-for="item in paymentsDelivery"
          :key="item"
        >
          <SfMenuItem
            :label="$t(item)"
          />
        </SfListItem>
      </SfList> -->
    </SfFooterColumn>
    </div>
    <!-- <SfFooterColumn title="Social">
      <div class="footer__socials">
        <SfImage class="footer__social-image" v-for="item in social" :key="item" :src="'/icons/'+item+'.svg'" :alt="item" width="32" height="32" />
      </div>
    </SfFooterColumn> -->
  </SfFooter>
</template>

<script>
import { SfFooter, SfList, SfImage, SfMenuItem  } from '@storefront-ui/vue';

export default {
  components: {
    SfFooter,
    SfList,
    SfImage,
    SfMenuItem,
   
  },
  data() {
    return {
      aboutUs: ['Who we are', 'Quality in the details', 'Customer Reviews'],
      departments: ['Women fashion', 'Men fashion', 'Kidswear', 'Home'],
      help: ['Customer service', 'Size guide', 'Contact us'],
      paymentsDelivery: ['Purchase terms', 'Guarantee'],
      social: ['facebook', 'pinterest', 'google', 'twitter', 'youtube'],
      isMobile: false,
      desktopMin: 1024
    };
  }
};
</script>

<style lang="scss">
// #footer{
.sf-list .sf-list__item {
    margin: 0;
    margin: var(--list-item-margin, 0);
    padding: 0;
    padding: var(--list-item-padding, 0);
    color: whitesmoke;
    // color: var(--c-text);
    // color: var(--list-item-color, var(--c-text));
    border: solid var(--c-light);
    border: var(--list-item-border, var(--list-item-border-style, solid) var(--list-item-border-color, var(--c-light)));
    border-width: 0;
    border-width: var(--list-item-border-width, 0);
    font: var(--font-weight--normal) var(--font-size--base)/1.4 var(--font-family--secondary);
    font: var(--list-item-font, var(--list-item-font-weight, var(--font-weight--normal)) var(--list-item-font-size, var(--font-size--base))/var(--list-item-font-line-height, 1.4) var(--list-item-font-family, var(--font-family--secondary)));
}

.footer {
  background-color: #5F4BA0;
  margin-bottom: 3.75rem;
  @include for-desktop {
    margin-bottom: 0;
  }
  &__socials {
    display: flex;
    justify-content: space-between;
    margin: 0 auto var(--spacer-lg);
    padding: var(--spacer-base) var(--spacer-xl);
    @include for-desktop {
      justify-content: flex-start;
      padding: var(--spacer-xs) 0;
      margin: 0 auto;
    }
  }
  &__social-image {
    margin: 0 var(--spacer-2xs) 0 0;
  }
}
.sf-footer{
  padding: 0px
}
.sf-footer-column {
    // margin: 0 0 var(--spacer-xl) 0;
    // padding: var(--spacer-sm) 0;
    /* background: var(--c-secondary); */
      background: #5F4BA0;
    font-weight: var(--font-weight--normal);
    margin-right: 50px;
}
.dr-footer-logo{
      width: 150px;
    margin-right: 70px;
    margin-top: 80px;
}
.sf-footer__container {
    box-sizing: border-box;
    display: flex;
    flex-direction: row;
    margin: 10px
    /* flex: 1; */
    /* flex-direction: column; */
}
.footer-company{
  margin-top:67px
}
.sf-footer-column__title {
    color: var(--c-white);
    display: flex;
    /* justify-content: space-between; */
    /* align-items: center; */
    width: 100%;
    border: 0;
    background: #5F4BA0;
    padding: var(--spacer-base);
    /* background: var(--c-secondary); */
    /* text-transform: uppercase; */
    font: var(--font-weight--medium) var(--h5-font-size)/1.4 var(--font-family--secondary);
    font: var(--footer-column-title-font, var(--footer-column-title-font-weight, var(--font-weight--medium)) var(--footer-column-title-font-size, var(--h5-font-size))/var(--footer-column-title-font-line-height, 1.4) var(--footer-column-title-font-family, var(--font-family--secondary)));
    cursor: default;
        margin-left: -13px;
        font-weight: 700;
        font-size: 30px;
        text-transform: capitalize;
}
#footer-contact{
.sf-footer-column__title {
  width: 207px;
}
}
// .sf-list__item{
//   max-width: 325px;
// }
.sf-footer {
  @include for-desktop {
    // border-top: var(--spacer-xs) solid var(--c-primary);
    padding-bottom: 0;
    margin-top: var(--spacer-2xl);
  }
  &__container {
    margin: var(--spacer-sm);
    @include for-desktop {
      // max-width: 69rem;
      // margin: 0 auto;
    }
  }
}
// }
</style>
