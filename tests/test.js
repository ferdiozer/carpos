
var moment = require('moment');

const recipes = [
    {
        id: 1,
        hour2: 2,
    },
    {
        id: 2,
        hour2: 4
    },
    {
        id: 3,
        hour2: 6
    },
    {
        id: 4,
        hour2: 24
    }
]
const vehicleTypes = [
    {
        id: 1,
        name: 'Otobomil',
    },
    {
        id: 2,
        name: 'Kamyonet',
    }
]

const recipe_price = [
    {
        vehicleType: vehicleTypes[0].id,
        recipe: recipes[0].id,
        price: 50
    },
    {
        vehicleType: vehicleTypes[0].id,
        recipe: recipes[1].id,
        price: 100
    },
    {
        vehicleType: vehicleTypes[1].id,
        recipe: recipes[1].id,
        price: 100
    }
]


const inOutCar = {
    in: new Date("2024-05-28T10:09:00.571Z"),
    out: new Date("2024-05-28T12:09:00.571Z"),
    vehicleType: 1,
    carPlate: '34HPD624'
}

const diffHours = moment(inOutCar.out).diff(moment(inOutCar.in), 'hours', true)

//barem hesaplama
let recipe_price_selected = recipe_price[0]
for (let index = 0; index < recipe_price.length; index++) {
    const element = recipe_price[index];
    const recipe = recipes.findIndex(v => v.id == element.recipe) != -1 ? recipes[recipes.findIndex(v => v.id == element.recipe)] : null
    const { hour2 } = recipe
    let calculated_price = 0
    if (inOutCar.vehicleType == element.vehicleType && diffHours >= hour2) {
        recipe_price_selected = recipe_price[index]
        calculated_price = diffHours * recipe_price_selected.price
        console.log("OK", diffHours, calculated_price)
    }
    console.log("element", element, diffHours, recipe, diffHours, recipe_price_selected)

}

//recipes : saat aralıkları
//vehicleTypes : araç tipleri
//recipe_price : araç tipleri ve saat baremleriyle eşleştirip ücret tarifesi çıkarma datası
//inOutCar : çıkış yapan araç bilgisi