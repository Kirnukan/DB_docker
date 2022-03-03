const customersStorage = require('./repositories/customers.storage.js')
const productsStorage = require('./repositories/product.storage')
const ordersStorage = require('./repositories/orders.storage.js')
const dataStorage  = require('./providers/data_storage.js')

const generateProduct = require('./common/generator.js')
const emulateShopping = require('./common/generator.js')
const emulateRevision = require('./common/generator.js')

setInterval(generateProduct, 2000, dataStorage(productsStorage))
setInterval(emulateShopping, 3000, dataStorage(productsStorage),
                                   dataStorage(ordersStorage),
                                   dataStorage(customersStorage))
setInterval(emulateRevision, 15000, dataStorage(productsStorage))
