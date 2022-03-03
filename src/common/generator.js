const firstNames = require('../mock/names.js')
const lastNames = require('../mock/names.js')
const addresses = require('../mock/addresses.js')

const getRandomNumber = (minNum, maxNum) => Math.floor(Math.random() * ((maxNum + 1) - minNum)) + minNum
const getRandomName = () => {
    const englishLetters = "abcdefghijklmnopqrstuvwxyz"
    const russianLetters = "абвгдеёжзиклмнопрстуфхцчшщъьэюя"
    const letters = [englishLetters, russianLetters]
    const randomLetter = letters[getRandomNumber(0, 1)]
    let newName = ''
    while ( newName.length < getRandomNumber(5, 15) ) {
        newName += randomLetter[Math.floor(Math.random() * randomLetter.length)]
    }
    return newName
}

const generateProduct = (productsStorage) => {
    const randomProduct = {
        caption: getRandomName(),
        availableAmount: getRandomNumber(1, 5),
        price: getRandomNumber(100, 5000)
    }
    productsStorage.get('add')(randomProduct)
}


const emulateShopping = (productsStorage, ordersStorage, customersStorage) => {
    const newUser = {
        firstName: firstNames[getRandomNumber(0, firstNames.length - 1)],
        lastName: lastNames[getRandomNumber(0, firstNames.length - 1)]
    }
    customersStorage.get('add')(newUser)
    const lengOfProducts = productsStorage.get('findAll')().length
    const lastTenProducts = productsStorage.get('findAll')(lengOfProducts - 10, 10)
    const productFromLastTen = lastTenProducts[getRandomNumber(0, 9)]
    if (!productFromLastTen) {
        console.log('Нет доступных товаров')
        return 'Нет доступных товаров'
    } else if (productFromLastTen.availableAmount < 1) {
        console.log(`Товар ${productFromLastTen.caption} закончился`)
        return `Товар ${productFromLastTen.caption} закончился`
    } else {
        const lengOfUsers = customersStorage.get('findAll')().length
        const lastUser = customersStorage.get('findAll')(lengOfUsers - 1, 1)

        const newOrder = {
            productId: productFromLastTen.id,
            customerId: lastUser.id,
            amount: getRandomNumber(1, 3),
            address: addresses[getRandomNumber(0, addresses.length - 1)]
        }
        ordersStorage.get('add')(newOrder)

        const lengOfOrders = ordersStorage.get('findAll')().length
        const lastOrder = ordersStorage.get('findAll')(lengOfOrders - 1, 1)
        randomProduct.availableAmount -= lastOrder.amount

        console.log(`Заказ ${newOrder.id} успешно создан, доставка по адресу ${newOrder.address}`)
        return `Заказ ${newOrder.id} успешно создан, доставка по адресу ${newOrder.address}`
    }

}

const emulateRevision = (productsStorage) => {
    const lengOfProducts = productsStorage.get('findAll')().length
    const lastTwentyProducts = productsStorage.get('findAll')(lengOfProducts - 20, 20)
    for (const product of lastTwentyProducts) {
        if (product.availableAmount == 0) {
            productsStorage.get('deleteById')(product.id)
        }
    }
}



module.exports = generateProduct
module.exports = emulateShopping
module.exports = emulateRevision