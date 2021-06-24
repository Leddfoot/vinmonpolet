let preferredStore = {
    initialize: function () {
        if (localStorage) {
            return this.getHomeStore()  
        }
    }, getHomeStore: function () {
        return localStorage.getItem("homeStoreName") || 'none set'
    }, setHomeStore: function (storeName) {     
        localStorage.setItem("homeStoreName", storeName)
    }
}

export { preferredStore }