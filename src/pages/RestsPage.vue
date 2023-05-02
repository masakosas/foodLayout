
    <script>
    import axios from "axios";
    import "@/style/main.css";
    import Modal from "@/components/Modal.vue"; 
    import { defineProps } from 'vue';
    import { serializeRestaurantData } from '@/serializers/RestaurantMain'; 
    import { serializeDeliveryData } from '@/serializers/RestaurantMain';
    import { serializeFoodTypes } from '@/serializers/RestaurantMain';

    
    export default {
      data() {
        return {
          isModalOpen: false,
          isLoading: true,
          restaurants: [],
          deliveries: [],
          foodTypes: [], 
          modifications: '',
          modification_choices: '',
          selectedFood: null,
        }
      },
      components: {
        Modal,
      }, 
      methods: { 
        async getRestaurants() { 
          const { id } = this.$route.params;
          const response = await axios.get(
            `https://chocofood.kz/fast-hermes/v1/delivery_area_content/restaurants/?offset=0&limit=1000&longitude=76.907176&latitude=43.237849`
          );
          const restaurantData = response.data.result.find(
            (data) => data.restaurant.id === parseInt(id)
          );
          const deliveryData = restaurantData.delivery; 
          const restaurant = serializeRestaurantData(restaurantData);
          const delivery = serializeDeliveryData(deliveryData);
         
            this.restaurants = [restaurant];
            this.isLoading = false;
            this.deliveries = [delivery]; 
            }, 
            openModal(food) {
            this.selectedFood = food;
            this.isModalOpen = true; 
            },
            closeModal() {
            this.selectedFood = null;
            this.isModalOpen = false; 
            } 
            },
            mounted() {
            this.getRestaurants();
            try {
            const id = this.$route.params.id; 
            axios.get(`https://chocofood.kz/extended_restaurants/${id}/`)
            .then(response => {
              this.foodTypes = serializeFoodTypes(response.data.food_types);
            })
            } catch (error) {
            console.log(error);
            }
            }
            };
    </script>

  <template>
    <div> 
      <div v-if="isLoading">Loading...</div>
      <div v-else>
        <div v-for="restaurant in restaurants" :key="restaurant.id">
          <a href="/home"> 
            <div class="imgbck">
              <img class="arrow" src="/images/backarrow.svg" alt="">
            </div>
          </a>
           <img class='find' src="https://www.pngall.com/wp-content/uploads/8/Search-PNG-File.png">
                <img class='heart' src="https://cdn-icons-png.flaticon.com/512/1077/1077035.png">
          <img :src="restaurant.image" class="mainImg" :alt="restaurant.title">
          <div v-for="(delivery, index) in deliveries" :key="delivery.id">

            <div class="restTitle">{{ restaurant.title }}</div>
            <div class="container">
              <div class="deliveryInfo">
                <img class="bagimage" src='/images/bag.png' alt="">
                <h2 class="delitext">{{ delivery.minCost }} ₸</h2>
              </div>
              <div class="deliveryInfo">
                <img :src="`/images/${restaurant.will_be_delivered_by}-icon.svg`" class="deliType" alt="">
                <h2 class="timeOfDelivery">{{ delivery.lowLimitMinutes }} - {{ delivery.upperLimitMinutes }} мин</h2>
              </div>
              <div class="deliveryInfo">
                <div class="rate"><img class="rateimg" src="/images/rating-icon.cb50369.svg" alt=""> {{ restaurant.rating }}
                </div>
              </div>
              <div class="deliveryInfo">
                <img class='info' src="https://www.freeiconspng.com/thumbs/info-icon/info-icon-32.png" alt="">
              </div>
            </div>
          </div>
          <hr class="hr">
</div>
</div>
    <div v-for="(foodType, index) in foodTypes" :key="index">
      <div v-for="food in foodType.foods" :key="food.id"></div>
      <div>
        <div class="foodTypes">
          <div class="productsContainer">
            <h2 class="mainTxt">{{ foodType.title }}</h2>
            <div>
              
              <modal 
                v-if="isModalOpen"
                :selected-food="selectedFood"
                />
              <div class="product" v-for="(food, index) in foodType.foods" :key="index" @click="openModal(food)"> 
                <div class="productImage">
                  <img :src="food.logo ? food.logo : 'https://chocofood.kz/_nuxt/img/default_item.a3e53c0.svg'"
                    :alt="food.title" class="foodlogo" />
                  <div class='dashContainer'>
                    <div class="dash">
                      <img class='plusImage' src="/images/pluss.svg" alt="">
                    </div>
                    <hr>
                  </div>
                </div>
                 <div class="productDescription">
              <h3 class="foodtitle">{{ food.title }} </h3>
              <p class="description">{{ food.selling_text }}</p>
              <p class="foodprice">{{ food.price }} ₸</p>
            </div>
          </div>
        </div>
      </div>
    </div>
      </div>
    </div> 
  </div>
    </template>

