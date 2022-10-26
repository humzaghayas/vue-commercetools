<template>
  <div id="home">
    <LazyHydrate when-idle>
      <SfHero class="hero">
        <SfHeroItem
          v-for="(hero, i) in heroes"
          :key="i"
          :title="hero.title"
          :description="hero.description"
          :button-text="hero.buttonText"
          :link="hero.buttonLink"
          :subtitle="hero.subtitle"
          :background="hero.background"
          :image="hero.image"
          :class="hero.className"
        />
      </SfHero>
    </LazyHydrate>

    <!-- who we are -->
    <LazyHydrate when-visible>
      <div class="similar-products">
        <SfHeading title="Who we are" :level="2"/>
        <nuxt-link :to="localePath('/c/women')" class="smartphone-only">
          {{ $t('See all') }}
        </nuxt-link>
      </div>
    </LazyHydrate>

    <LazyHydrate when-visible>
      <SfBannerGrid :banner-grid="1" class="banner-grid" id="home-banner-grid">
        <template v-for="item in banners" v-slot:[item.slot]>
          <SfBanner
            :key="item.slot"
            :title="item.title"
            :subtitle="item.subtitle"
            :description="item.description"
            :button-text="item.buttonText"
            link=""
            :image="item.image"
            
          />
          <!-- :class="item.class" -->
        </template>
      </SfBannerGrid>
    </LazyHydrate>

    <!-- Our Therapeutic Categories -->
    <LazyHydrate when-visible>
      <div class="similar-products">
        <SfHeading title="Our Therapeutic Categories" :level="2"/>
        <nuxt-link :to="localePath('/c/women')" class="smartphone-only">
          {{ $t('See all') }}
        </nuxt-link>
      </div>
    </LazyHydrate>
    <LazyHydrate when-visible>
      <SfBannerGrid :banner-grid="1" class="banner-grid" id="home-banner-grid">
        <template v-for="item in therapeutics" v-slot:[item.slot]>
          <SfBanner
            :key="item.slot"
            :title="item.title"
            :subtitle="item.subtitle"
            :description="item.description"
            :button-text="item.buttonText"
            link=""
            :image="item.image"
            
          />
          <!-- :class="item.class" -->
        </template>
      </SfBannerGrid>
    </LazyHydrate>
    <!-- <LazyHydrate when-visible>
        <SfCarousel class="carousel" :settings="{ peek: 16, breakpoints: { 1023: { peek: 0, perView: 2 } } }">
          <template #prev="{go}">
            <SfArrow
              aria-label="prev"
              class="sf-arrow--left sf-arrow--long"
              @click="go('prev')"
            />
          </template>
          <template #next="{go}">
            <SfArrow
              aria-label="next"
              class="sf-arrow--right sf-arrow--long"
              @click="go('next')"
            />
          </template>
          <SfCarouselItem class="carousel__item" v-for="(banner, i) in banners" :key="i" id="home-carousel-one">
            <SfCard
              :image=banner.image
              :imageWidth="288"
              :imageHeight="189"
              :title=banner.title
              :titleLevel="3"
              :description=banner.description
              link=""
              :buttonText=banner.buttonText
            />
          </SfCarouselItem>
        </SfCarousel>
    </LazyHydrate> -->

    <LazyHydrate when-visible>
      <div class="similar-products">
        <SfHeading title="Products" :level="2"/>
        <nuxt-link :to="localePath('/c/women')" class="smartphone-only">
          {{ $t('See all') }}
        </nuxt-link>
      </div>
    </LazyHydrate>

    <LazyHydrate when-visible>
        <SfCarousel class="carousel" :settings="{ peek: 16, breakpoints: { 1023: { peek: 0, perView: 2 } } }">
          <template #prev="{go}">
            <SfArrow
              aria-label="prev"
              class="sf-arrow--left sf-arrow--long"
              @click="go('prev')"
            />
          </template>
          <template #next="{go}">
            <SfArrow
              aria-label="next"
              class="sf-arrow--right sf-arrow--long"
              @click="go('next')"
            />
          </template>
        
          <SfCarouselItem class="carousel__item" v-for="(product, i) in products" :key="i" id="home-carousel-two">
            <SfProductCard
              :title="product.title"
              :image="product.image"
              :regular-price="product.price.regular"
              :max-rating="product.rating.max"
              :score-rating="product.rating.score"
              :show-add-to-cart-button="true"
              :is-on-wishlist="product.isInWishlist"
              :link="localePath({ name: 'home' })"
              class="carousel__item__product"
              @click:wishlist="toggleWishlist(i)"
            />
          </SfCarouselItem>
        
        </SfCarousel>
    </LazyHydrate>

    

    <!-- <LazyHydrate when-visible>
      <SfCallToAction
        title="Subscribe to Newsletters"
        button-text="Subscribe"
        description="Be aware of upcoming sales and events. Receive gifts and special offers!"
        image="/homepage/newsletter.webp"
        class="call-to-action"
      >
        <template #button>
          <SfButton
            class="sf-call-to-action__button"
            data-testid="cta-button"
            @click="toggleNewsletterModal"
          >
            {{ $t('Subscribe') }}
          </SfButton>
        </template>
      </SfCallToAction>
    </LazyHydrate> -->

    <LazyHydrate when-visible>
      <NewsletterModal @email-submitted="onSubscribe" />
    </LazyHydrate>

    <!-- <LazyHydrate when-visible>
      <InstagramFeed />
    </LazyHydrate> -->

  </div>
</template>
<script>
import {
  SfHero,
  SfBanner,
  SfCallToAction,
  SfSection,
  SfCarousel,
  SfProductCard,
  SfImage,
  SfBannerGrid,
  SfHeading,
  SfArrow,
  SfButton,
  SfCard
} from '@storefront-ui/vue';
import { ref, useContext } from '@nuxtjs/composition-api';
import InstagramFeed from '~/components/InstagramFeed.vue';
import NewsletterModal from '~/components/NewsletterModal.vue';
import LazyHydrate from 'vue-lazy-hydration';
import { useUiState } from '../composables';
import cacheControl from './../helpers/cacheControl';
import { createClient } from '~/plugins/contentful.js';
const client = createClient();

export default {
  name: 'Home',
  middleware: cacheControl({
    'max-age': 60,
    'stale-when-revalidate': 5
  }),
  components: {
    InstagramFeed,
    SfHero,
    SfBanner,
    SfCallToAction,
    SfSection,
    SfCarousel,
    SfProductCard,
    SfImage,
    SfBannerGrid,
    SfHeading,
    SfArrow,
    SfButton,
    SfCard,
    NewsletterModal,
    LazyHydrate
  },
  setup() {
    const { $config } = useContext();
    const { toggleNewsletterModal } = useUiState();
    const products = ref([
      {
        title: 'Cream Beach Bag',
        image: '/homepage/productA.webp',
        price: { regular: '50.00 $' },
        rating: { max: 5, score: 4 },
        isInWishlist: true
      },
      {
        title: 'Cream Beach Bag',
        image: '/homepage/productB.webp',
        price: { regular: '50.00 $' },
        rating: { max: 5, score: 4 },
        isInWishlist: false
      },
      {
        title: 'Cream Beach Bag',
        image: '/homepage/productC.webp',
        price: { regular: '50.00 $' },
        rating: { max: 5, score: 4 },
        isInWishlist: false
      },
      {
        title: 'Cream Beach Bag',
        image: '/homepage/productA.webp',
        price: { regular: '50.00 $' },
        rating: { max: 5, score: 4 },
        isInWishlist: false
      },
      {
        title: 'Cream Beach Bag',
        image: '/homepage/productB.webp',
        price: { regular: '50.00 $' },
        rating: { max: 5, score: 4 },
        isInWishlist: false
      },
      {
        title: 'Cream Beach Bag',
        image: '/homepage/productC.webp',
        price: { regular: '50.00 $' },
        rating: { max: 5, score: 4 },
        isInWishlist: false
      },
      {
        title: 'Cream Beach Bag',
        image: '/homepage/productA.webp',
        price: { regular: '50.00 $' },
        rating: { max: 5, score: 4 },
        isInWishlist: false
      },
      {
        title: 'Cream Beach Bag',
        image: '/homepage/productB.webp',
        price: { regular: '50.00 $' },
        rating: { max: 5, score: 4 },
        isInWishlist: false
      }
    ]);
    const heroes = [
      {
        title: 'Colorful summer dresses are already in store',
        subtitle: 'SUMMER COLLECTION 2019',
        background: '#eceff1',
        image: '/homepage/bannerH.webp'
      },
      {
        title: 'Colorful summer dresses are already in store',
        subtitle: 'SUMMER COLLECTION 2019',
        background: '#efebe9',
        image: '/homepage/bannerA.webp',
        className:
          'sf-hero-item--position-bg-top-left sf-hero-item--align-right'
      },
      {
        title: 'Colorful summer dresses are already in store',
        subtitle: 'SUMMER COLLECTION 2019',
        background: '#fce4ec',
        image: '/homepage/bannerB.webp'
      }
    ];
    const banners = [
      {
        slot: 'banner-A',
        subtitle: 'Dresses',
        title: 'Cocktail & Party',
        description:
          'Find stunning women\'s cocktail dresses and party dresses. Stand out in lace and metallic cocktail dresses from all your favorite brands.',
        buttonText: 'Shop now',
        image: {
          mobile: $config.theme.home.bannerA.image.mobile,
          desktop: $config.theme.home.bannerA.image.desktop
        },
        class: 'sf-banner--slim desktop-only',
        link: $config.theme.home.bannerA.link
      },
      {
        slot: 'banner-B',
        subtitle: 'Dresses',
        title: 'Linen Dresses',
        description:
          'Find stunning women\'s cocktail dresses and party dresses. Stand out in lace and metallic cocktail dresses from all your favorite brands.',
        // buttonText: 'Shop now',
        image: $config.theme.home.bannerB.image,
        class: 'sf-banner--slim banner-central desktop-only',
        // link: $config.theme.home.bannerB.link
      },
      {
        slot: 'banner-C',
        subtitle: 'T-Shirts',
        title: 'The Office Life',
        image: $config.theme.home.bannerC.image,
        class: 'sf-banner--slim banner__tshirt',
        link: $config.theme.home.bannerC.link
      },
      {
        slot: 'banner-D',
        subtitle: 'Summer Sandals',
        title: 'Eco Sandals',
        image: $config.theme.home.bannerD.image,
        class: 'sf-banner--slim',
        link: $config.theme.home.bannerD.link
      }
    ];

    const onSubscribe = (emailAddress) => {
      console.log(`Email ${emailAddress} was added to newsletter.`);
      toggleNewsletterModal();
    };

    const toggleWishlist = (index) => {
      products.value[index].isInWishlist = !products.value[index].isInWishlist;
    };

    return {
      toggleWishlist,
      toggleNewsletterModal,
      onSubscribe,
      // banners,
      // heroes,
      // products
    };
  },
  asyncData(){
    return Promise.all([
    client.getEntries({
        'content_type': 'banner',
        order: '-sys.createdAt'
        }),
    client.getEntries({
            'content_type': 'contentTile',
            order: '-sys.createdAt'
        }),
    client.getEntries({
        'content_type': 'middleBanner',
        order: '-sys.createdAt'
    }),
    client.getEntries({
        'content_type': 'middleBanner',
        order: '-sys.createdAt'
    }),

        
    ]).then(
      ([ctfHeroes, ctfBanners, middleBanners,ourTherapeutic]) =>{

        // console.log("Heroes " + JSON.stringify(ctfHeroes.items));
        // console.log("middleBanner " + JSON.stringify(middleBanners.items));

        const banners = [];
        const heroes  = [];
        const products = [];
        const therapeutics = [];
        const jfu = ctfBanners.items.filter(item=>item.fields.title.includes("Just for you"));
        const ctfHItems = ctfHeroes.items;
        const ctfMiddleBanners = middleBanners.items.filter(item=>item.fields.subtitle.includes("WWA"));
        const ctfOurTherapeutic = ourTherapeutic.items.filter(item=>item.fields.subtitle.includes("therapeutics"));
        // console.log("JFU:"+JSON.stringify(jfu));

        for(let i in jfu){
          const p ={
            title: jfu[i].fields.primaryText.content[0].content[0].value,
            image: jfu[i].fields.media?.fields?.file?.url,
            price: { regular: '' },
            rating: { max: 5, score: 4 },
            isInWishlist: true
          }
          products.push(p);
        }

        for(let i in ctfMiddleBanners){
          const b = {
                slot: ctfMiddleBanners[i].fields.slot,
                // subtitle: ctfMiddleBanners[i].fields.subtitle,
                title: ctfMiddleBanners[i].fields.title,
                description:ctfMiddleBanners[i].fields.description,
                buttonText: ctfMiddleBanners[i].fields.buttonText,
                image: ctfMiddleBanners[i].fields.image?.fields?.file?.url,
                class: ctfMiddleBanners[i].fields.class,//'sf-banner--slim banner__tshirt',
                // link: ctfMiddleBanners[i].fields.image?.fields?.file?.url
          }
          banners.push(b);
        }

        for(let i in ctfOurTherapeutic){
          const t = {
                slot: ctfOurTherapeutic[i].fields.slot,
                // subtitle: ctfMiddleBanners[i].fields.subtitle,
                title: ctfOurTherapeutic[i].fields.title,
                description:ctfOurTherapeutic[i].fields.description,
                buttonText: ctfOurTherapeutic[i].fields.buttonText,
                image: ctfOurTherapeutic[i].fields.image?.fields?.file?.url,
                class: ctfOurTherapeutic[i].fields.class,//'sf-banner--slim banner__tshirt',
                // link: ctfMiddleBanners[i].fields.image?.fields?.file?.url
          }
          therapeutics.push(t);
        }

        for(let i in ctfHItems){
          const h ={
            title: ctfHItems[i].fields.title,
            subtitle: ctfHItems[i].fields.subtitle,
            description: ctfHItems[i].fields.description,
            buttonText: ctfHItems[i].fields.buttonText,
            buttonLink: ctfHItems[i].fields.buttonLink,
            background: '#eceff1',
            image: ctfHItems[i].fields.image?.fields.file.url
          }

          heroes.push(h)
        }

        // console.log("Banners :");console.log(banners);
        // console.log("Heroes:" );console.log(heroes)

         return {
          heroes,
          banners,
          products,
          therapeutics
         }

      }
    )

  }
};
</script>

<style lang="scss" scoped>
#home{
  ::v-deep{ 

    .sf-hero-item__button a{
      background-color: #f0504b;
      border-radius: 30px;
      padding: 20px 40px;
    }
  }
}
#home-banner-grid{
  ::v-deep{ 
 .sf-button.color-secondary {
    --button-background: #5F4BA0;
}
.sf-banner{
  --banner-wrapper-width:81%;
  align-items: center;
  height: 200px;
}
.sf-banner__wrapper{
  align-content: center;
  align-items: center;
  width: 60%;
}
.sf-banner__wrapper h1{
  align-items: center;
  align-content: space-around;
  margin-left: 46px;
  
}
.sf-button.color-secondary{
  --button-background:none;
  border:1px solid white;
  border-radius: 30px;
}

.sf-banner-grid__col .sf-banner {
  opacity: 0.7;
}

.sf-banner-grid__col .sf-banner:hover {
    // background: -moz-radial-gradient(center,ellipse cover,rgba(0,0,0,0) 0%,rgba(0,0,0,0.7) 100%);
    // background: -webkit-radial-gradient(center,ellipse cover,rgba(0,0,0,0) 0%,rgba(0,0,0,0.7) 100%);
    opacity: 1;
}
.sf-banner__title {
  color: #fff;
  margin: auto auto auto 0px;
  width: 100%;
  line-height: normal;
  min-height: 26px;
  font-size: 18px;
  font-weight: bold;

}
 }
}
#home-carousel-one{
::v-deep{ 
 .sf-card__action {
    position: absolute;
    left: 50%;
    transform: translate(-50%, -1.5625rem);
    background-color: #5F4BA0;
}
 }
}
#home-carousel-two{
::v-deep{ 
 .sf-rating__icon {
    --icon-size: 0.875rem;
    --icon-color: #5F4BA0;
    /* --icon-color: var(--c-primary); */
    --icon-color-negative: var(--c-gray-variant);
}
.sf-rating__icon--negative{
   --icon-color: var(--c-gray-variant);
 
} 
.sf-circle-icon{
  --button-background: #5F4BA0;
}
.sf-product-card__image-wrapper{
  height: 200px;
}
.sf-product-card{

}

 }
}

#home {
  box-sizing: border-box;
  padding: 0 var(--spacer-sm);
  @include for-desktop {
    max-width: 1240px;
    padding: 0;
    margin: 0 auto;
  }

}

.hero {
  margin: var(--spacer-xl) auto var(--spacer-lg);
  --hero-item-background-position: center;
  @include for-desktop {
    // margin: var(--spacer-xl) auto var(--spacer-2xl);
  }
  .sf-hero-item {
    &:nth-child(even) {
      --hero-item-background-position: left;
      @include for-mobile {
        --hero-item-background-position: 30%;
        ::v-deep .sf-hero-item__subtitle,
        ::v-deep .sf-hero-item__title {
          text-align: right;
          width: 100%;
          padding-left: var(--spacer-sm);
        }
      }
    }
  }
  .sf-hero-item__wrapper {
    height: 200px;
  }
  ::v-deep .sf-hero__control {
    &--right, &--left {
      display: none;
    }
  }
}

.banner-grid {
  --banner-container-width: 50%;
  margin: var(--spacer-xl) 0;
  ::v-deep .sf-link:hover {
    color: var(--c-white);
  }
  @include for-desktop {
    // margin: var(--spacer-2xl) 0;
    ::v-deep .sf-link {
      --button-width: auto;
      text-decoration: none;
    }
  }
}

.banner {
  &__tshirt {
    background-position: left;
  }
  &-central {
    @include for-desktop {
      --banner-container-flex: 0 0 70%;
    }
  }
}

.similar-products {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-bottom: var(--spacer-2xs);
  --heading-padding: 0;
  border-bottom: 1px var(--c-light) solid;
  @include for-desktop {
    border-bottom: 0;
    justify-content: center;
    padding-bottom: 0;
  }
}

.call-to-action {
  background-position: right;
  margin: var(--spacer-xs) 0;
  @include for-desktop {
    margin: var(--spacer-xl) 0 var(--spacer-2xl) 0;
  }
}

.carousel {
    margin: 0 calc(0 - var(--spacer-sm)) 0 0;
  @include for-desktop {
    margin: 0;
  }
  &__item {
    margin: 1.375rem 0 2.5rem 0;
    @include for-desktop {
      margin: var(--spacer-xl) 0 var(--spacer-xl) 0;
    }
    &__product {
      --product-card-add-button-transform: translate3d(0, 30%, 0);
    }
  }
  ::v-deep .sf-arrow--long .sf-arrow--right {
    --arrow-icon-transform: rotate(180deg);
     -webkit-transform-origin: center;
     transform-origin: center;
  }
}


</style>
