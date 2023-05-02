export const serializeDelivery = (data = {}) => ({
  deliveryMinCost: data.delivery_min_cost,
  deliveryMaxCost: data.delivery_max_cost,
  lowLimitMinutes: data.low_limit_minutes,
  upperLimitMinutes: data.upper_limit_minutes, 
});

export const deserializeDelivery = (data = {}) => ({
  delivery_min_cost: data.deliveryMinCost,
  delivery_max_cost: data.deliveryMaxCost,
  low_limit_minutes: data.lowLimitMinutes,
  upper_limit_minutes: data.upperLimitMinutes,
});

export const serializeRestaurant = (data = {}) => ({
  id: data.id,
  title: data.title,
  state: data.state,
  image: data.image,
  rating: ( data.rating / 20)?.toFixed(1) || 0,
  willBeDeliveredBy: (data.will_be_delivered_by || '').toLowerCase(),
  cityId: data.city_id,
  stateWeight: data.state_weight,
});


export const deserializeRestaurant = (data = {}) => ({
  id: data.id,
  title: data.title,
  state: data.state,
  image: data.image,
  rating: data.rating,
  will_be_delivered_by: data.willBeDeliveredBy,
  city_id: data.cityId,
  state_weight: data.stateWeight,
});

export const serializeRestaurantMain = (restaurant = {}) => ({
  isTopRestaurant: restaurant.is_top_restaurant,
  delivery: serializeDelivery(restaurant.delivery),
  restaurant: serializeRestaurant(restaurant.restaurant),
})

export const serializeRestaurantsMainList = (list = []) => list.map(serializeRestaurantMain);

export const serializeRestaurantData = (data = {}) =>({
  id: data.restaurant.id,
  title:  data.restaurant.title,
  rating: ((data.restaurant.rating / 20) || 0).toFixed(1),
  image:  data.restaurant.image,
  will_be_delivered_by: (data.restaurant.will_be_delivered_by || '').toLowerCase()
});

export const deserializeRestaurantData = (serializedData = {}) => ({
  id: serializedData.id,
  title: serializedData.title,
  rating: serializedData.rating,
  image: serializedData.image,
  will_be_delivered_by: serializedData.will_be_delivered_by.toUpperCase()
});
export const serializeDeliveryData = (data = {}) => ({
lowLimitMinutes: data.low_limit_minutes,
  upperLimitMinutes: data.upper_limit_minutes,
    maxCost: data.delivery_max_cost,
      minCost: data.delivery_min_cost,
        description: data.description,
});

export const serializeFoodType = (foodType = {}) => ({
  title: foodType.title,
  logo: foodType.logo,
  foods: serializeFoods(foodType.foods), 
});

export const serializeFood = (food = {}) => ({
  title: food.title,
  selling_text: food.selling_text,
  price: food.price,
  logo: food.logo,
  modifications: food.modifications,
});

export const deserializeFoodType = (data = {}) => ({
  title: data.title,
  logo: data.logo,
  foods: data.foods.map(deserializeFood),
});

export const deserializeFood = (data = {}) => ({
  title: data.title,
  selling_text: data.selling_text,
  price: data.price,
  logo: data.logo,
});

const serializeFoods = (foods = []) => foods.map(serializeFood);
export const serializeFoodTypes = (foodTypes = []) => foodTypes.map(serializeFoodType);


export const deserializeFoodTypes = (serializedData = []) => serializedData.map(deserializeFoodType);
