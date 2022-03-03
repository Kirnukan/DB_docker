const dataStorage = (storage) => {
    const dataStorageMap = new Map()
    const findById = (id) => {
        try {
            if (null) {
                throw 'Нет элемента'
            }
            return storage.get(id)
        }
        catch (e) {
            console.error(e)
        }
    }
    dataStorageMap.set('findById', findById)

    const findAll = (skip, take, order) => {
        let arrayOfData = [...storage.entries()]
        if (skip && take) {
            arrayOfData = arrayOfData.slice(skip, skip + take)
        }
        // return arrayOfData.reduce(()=>   {

        // }, [])
        let arrayOfIndexes = []
        let sortedArray = []
        for (const index of arrayOfData) { 
            arrayOfIndexes.push(arrayOfData.indexOf(index))
        }
        if (order.sort === 'DESC') {
            arrayOfIndexes.sort((a, b) => b[order.field] - a[order.field])
        } else if (order.sort === 'ASC') {
            arrayOfIndexes.sort((a, b) => a[order.field] - b[order.field])
        }
        // return arrayOfData.map((item) => {
        //     return item
        // })
        for (const index of arrayOfIndexes) {
            sortedArray.push(arrayOfData[index])
        }
        return sortedArray
        // return arrayOfData.map((item) => {
        //     return arrayOfData.indexOf(item.id)
        // })
    }
    dataStorageMap.set('findAll', findAll)
    
    const add = (item) => {
        const getNewId = () => {
            const idLetters = "abcdefghijklmnopqrstuvwxyz1234567890ABCDEFGHIJKLMNOPQRSTUVWXYZ"
            let newId = ''
            while ( newId.length < 20 ) {
                newId += idLetters[Math.floor(Math.random() * idLetters.length)]
            }
            return newId
        }
        try {
            const newId = getNewId
            if(!storage.get(newId)){
                return storage.set(newId, item)
            }
            throw 'Такой id уже существует'
        } catch (e) {
            console.error(e)
        }
    }
    dataStorageMap.set('add', add)

    const deleteById = (id) => storage.delete(id)
    dataStorageMap.set('deleteById', deleteById)

    return dataStorageMap
}

module.exports = dataStorage
// 'console.log(dataStorage(customersStorage).get('add')(something))'