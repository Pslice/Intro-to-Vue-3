app.component('product-display', {
    template:
        /*html*/
        ` <h1>{{product}}</h1>
        <h3>{{title}}</h3>
        <p>{{description}}</p>
    <p>{{shipping}}</p>
    <p v-if="inStock > 10">In stock</p>
    <p v-else-if="inStock <=10 && inStock > 0">Almost out</p>
    <p v-else="inStock <= 0">Out of Stock</p>
    <li v-for="(detail, index) in details" :key="index">
      {{detail}}
    </li>
    <div class="color-circle" :class="{active:activeClass}" :style="{ backgroundColor:variant.color }"
      v-for="(variant, index) in variants" :key="variant.id" @mouseover="updateVariant(index)">
      {{variant.color}}</div>
    <div class="product-image">
      <img v-bind:src="image" :alt="description">
    </div>
    <button 
    class="button" 
    :class="{ disabledButton: !inStock }" 
    :disabled="!inStock" 
    v-on:click="addToCart">
    Add to Cart
  </button>`,
    data() {
        return {
            product: 'Socks',
            description: 'Soft socks',
            selectedVariant: 0,
            details: ['50% cotton', '30% wool', '20% polyester'],
            variants: [
                { id: 2234, color: 'green', variantImage: './assets/images/socks_green.jpg', quantity: 50 },
                { id: 2235, color: 'blue', variantImage: './assets/images/socks_blue.jpg', quantity: 0 },
            ],
            activeClass: false,
            brand: "Pat's socks"
        }
    },
    methods: {
        updateVariant(index) {
            this.selectedVariant = index;
            this.activeClass = true;
        },
        addToCart() {
            this.$emit('add-to-cart', this.variants[this.selectedVariant].id)
        }
    },
    computed: {
        title() {
            return `${this.product} by ${this.brand}`;
        },
        image() {
            return this.variants[this.selectedVariant].variantImage;
        },
        inStock() {
            return this.variants[this.selectedVariant].quantity;
        },
        shipping() {
            if (this.premium) {
                return "free";
            } else {
                return "2.99";
            }
        }

    }
})