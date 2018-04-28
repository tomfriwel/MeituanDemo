const serverUrl = 'http://192.168.5.38:3000'

const shop = {
    getItems: '/items'
}

function makeUrl(apiUrl) {
    return serverUrl + apiUrl
}

module.exports = {
    serverUrl: serverUrl,
    shop: {
        getItems:makeUrl(shop.getItems)
    }
}