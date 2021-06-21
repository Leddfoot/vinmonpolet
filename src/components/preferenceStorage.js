let preferredStore = {
    //Note: All store names in the vinmonopolet API are unique! && You can only query by store name, not store id
    initialize: function () {
        if (localStorage) {
            // localStorage.clear()
            // this.setHomeStore('holmen senter')
            return this.getHomeStore()  
        }
    }, getHomeStore: function () {
        return localStorage.getItem("homeStoreName") || 'none set'
    }, setHomeStore: function (storeName) {     
        localStorage.setItem("homeStoreName", storeName)
    }

}


export { preferredStore }