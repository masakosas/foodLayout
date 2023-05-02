<template>
  <div class="modal"> 
    <div class="modal-content"> 
      <div class="modalimage">
        <img :src="selectedFood.logo ? selectedFood.logo : 'https://chocofood.kz/_nuxt/img/default_item.a3e53c0.svg'"
          :alt="selectedFood.title" class="modallogo" />
      </div>
      <div class="modalsection">
        <h3 class="modaltitle">{{ selectedFood.title }}</h3>
        <p class="modaldescription">{{ selectedFood.selling_text }}</p>
      </div> 
      <div class="modifybox" v-for="modification in selectedFood.modifications" :key="modification.id">
        <div class="modifytitle" v-if="modification.title">
          {{ modification.title }}
        </div>
        <div class="choicecontainer" v-if="modification.modification_choices && modification.modification_choices.length">
         <div class="choicebox" v-for="(choice, index) in modification.modification_choices" :key="choice.id">
    <div class="checkbox-block" @click="toggleCheckbox(index)">
      <input type="radio" class='checked' :checked="selectedChoice[index]" value='f' />
      <h1 class="choice-title" v-if="choice.title">{{ choice.title }}</h1>
      <h1 class="choice-price" v-if="choice.price !== null && choice.price !== undefined">(+ {{ choice.price || choice.price === 0 ? choice.price : '0' }} ₸)</h1>
    </div>
              
           </div>
          </div>
        </div>
      </div>

      <div class="pricecontainer">
        <button class="pricebox">
          <h1 class="dashtext">В корзину</h1>
          <h1 class="modalfoodprice">{{ selectedFood.price }} ₸</h1>
        </button>
      </div>

      <button class="modal-close" @click="closeModal">
    <div class='cancelbox'>
      <img class="cancelimg"
        src="https://static.vecteezy.com/system/resources/previews/009/344/496/non_2x/x-transparent-free-png.png"
        alt="">
    </div>
  </button>
    </div>

</template>

<script>
import "@/style/modal.css";
export default {
   data() {
    return {
      selectedChoice: [],
    }
  },
  name: "Modal",
  props: { 
    selectedFood: {
      type: Object,
      required: true,
    },
  }, 
  methods: {
    toggleCheckbox(index) {
      this.selectedChoice[index] = !this.selectedChoice[index];
    }, 
    closeModal() {
      this.$parent.closeModal();
    }
  }
}
;
</script> 
