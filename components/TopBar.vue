<template>
  <SfTopBar class="topbar">
    <!-- <template #left>
        <SfButton class="sf-button--text">{{ $t('Help & FAQs') }}</SfButton>
      </template> -->
    <template #center>
        <!-- <p>{{ $t('Download') }}</p> -->
        <p>{{ $t('Meet with our product experts in one-on-one virtual sessions') }} </p>
        <SfButton class="topbar__button sf-button--text">{{ $t('Set Up a Meeting') }}</SfButton>
      </template>
      <!-- <template #right>
        <StoreLocaleSelector />
    </template> -->
  </SfTopBar>
</template>

<script>
import { SfButton, SfTopBar } from '@storefront-ui/vue';
import StoreLocaleSelector from './StoreLocaleSelector';

export default {
  components: {
    SfTopBar,
    SfButton,
    StoreLocaleSelector
  }
};

</script>
<style lang="scss" scoped>
.topbar {
  position: relative;
  background: linear-gradient(to right,#6940b7 0%,#33c8f5 100%);
  padding: 10px 0px;
  z-index: 2;
  &__button {
    margin: 0 0 0 var(--spacer-xs);
    background-color: #f0504b;
    border-radius: 30px;
    padding: 10px 30px;
    font-weight: bold;
    animation: shake 1s cubic-bezier(0.36,0.07,0.19,0.97) both;
  }
}
.topbar p{
  color: #fff;
  font-size: 18px;

}
</style>
