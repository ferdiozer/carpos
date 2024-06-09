var moment = require('moment');

const recipes = [
    { id: 1, hour2: 2 },
    { id: 2, hour2: 4 },
    { id: 3, hour2: 6 },
    { id: 4, hour2: 24 }
];

const vehicleTypes = [
    { id: 1, name: 'Otomobil' },
    { id: 2, name: 'Kamyonet' }
];

const recipe_price = [
    { vehicleType: vehicleTypes[0].id, recipe: recipes[0].id, price: 50 },
    { vehicleType: vehicleTypes[0].id, recipe: recipes[1].id, price: 100 },
    { vehicleType: vehicleTypes[0].id, recipe: recipes[2].id, price: 150 },
    { vehicleType: vehicleTypes[0].id, recipe: recipes[3].id, price: 200 },
    { vehicleType: vehicleTypes[1].id, recipe: recipes[0].id, price: 60 },
    { vehicleType: vehicleTypes[1].id, recipe: recipes[1].id, price: 110 },
    { vehicleType: vehicleTypes[1].id, recipe: recipes[2].id, price: 160 },
    { vehicleType: vehicleTypes[1].id, recipe: recipes[3].id, price: 210 },
];

const inOutCar = {
    in: new Date("2024-05-28T10:09:00.571Z"),
    out: new Date("2024-05-28T20:09:00.571Z"),
    vehicleType: 2,
    carPlate: '34HPD624'
};

const diffHours = moment(inOutCar.out).diff(moment(inOutCar.in), 'hours', true);

// Tarifeyi ve ücreti belirleme
let totalPrice = 0;
let remainingHours = diffHours;

// Tarifeleri en büyükten en küçüğe sıralama
const sortedRecipes = recipes.sort((a, b) => b.hour2 - a.hour2);

for (let i = 0; i < sortedRecipes.length; i++) {
    const recipe = sortedRecipes[i];
    const priceEntry = recipe_price.find(rp => rp.recipe === recipe.id && rp.vehicleType === inOutCar.vehicleType);

    if (priceEntry) {
        const fullPeriods = Math.floor(remainingHours / recipe.hour2);
        totalPrice += fullPeriods * priceEntry.price;
        remainingHours -= fullPeriods * recipe.hour2;
    }
}

console.log(`Toplam Ücret: ${totalPrice} TL`);


const fullPeriods = Math.floor(2 /60);
console.log("fullPeriods",fullPeriods);
