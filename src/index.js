'use strict'
import { getStoreByName, getallStores } from 'components/requests'
import { renderStores, renderStore, renderNoStoresFound, renderHeader, renderSearchElement, renderTimeAndDate, clearExistingContent } from 'views/createPage'
let searchTerm 
let entireListOfStores = {}
let haveDownloadedEntireList = false
let searchTermIsMultiple = false
let moreResultsToDisplay = false
let listToPaginate = {}

let temporaryListof11 = [{
  "storeId": "138",
  "storeName": "temporay 11",
  "status": "Open",
  "address": {
      "street": "Plogveien 6",
      "postalCode": "0679",
      "city": "Oslo",
      "gpsCoord": "59.8972890;10.8128575",
      "globalLocationNumber": "7080003252296",
      "organisationNumber": "973107364"
  },
  "telephone": "22 01 50 00",
  "email": "kundesenter@vinmonopolet.no",
  "category": "6",
  "profile": "Lyst og Lett",
  "storeAssortment": "6L",
  "openingHours": {
      "regularHours": [
          {
              "dayOfTheWeek": "Monday",
              "openingTime": "10:00",
              "closingTime": "18:00",
              "closed": false
          },
          {
              "dayOfTheWeek": "Tuesday",
              "openingTime": "10:00",
              "closingTime": "18:00",
              "closed": false
          },
          {
              "dayOfTheWeek": "Wednesday",
              "openingTime": "10:00",
              "closingTime": "18:00",
              "closed": false
          },
          {
              "dayOfTheWeek": "Thursday",
              "openingTime": "10:00",
              "closingTime": "18:00",
              "closed": false
          },
          {
              "dayOfTheWeek": "Friday",
              "openingTime": "10:00",
              "closingTime": "18:00",
              "closed": false
          },
          {
              "dayOfTheWeek": "Saturday",
              "openingTime": "10:00",
              "closingTime": "16:00",
              "closed": false
          },
          {
              "dayOfTheWeek": "Sunday",
              "openingTime": "",
              "closingTime": "",
              "closed": true
          }
      ],
      "exceptionHours": []
  },
  "lastChanged": {
      "date": "2021-05-31",
      "time": "00:02:29"
  }
},{
  "storeId": "138",
  "storeName": "temporay 11",
  "status": "Open",
  "address": {
      "street": "Plogveien 6",
      "postalCode": "0679",
      "city": "Oslo",
      "gpsCoord": "59.8972890;10.8128575",
      "globalLocationNumber": "7080003252296",
      "organisationNumber": "973107364"
  },
  "telephone": "22 01 50 00",
  "email": "kundesenter@vinmonopolet.no",
  "category": "6",
  "profile": "Lyst og Lett",
  "storeAssortment": "6L",
  "openingHours": {
      "regularHours": [
          {
              "dayOfTheWeek": "Monday",
              "openingTime": "10:00",
              "closingTime": "18:00",
              "closed": false
          },
          {
              "dayOfTheWeek": "Tuesday",
              "openingTime": "10:00",
              "closingTime": "18:00",
              "closed": false
          },
          {
              "dayOfTheWeek": "Wednesday",
              "openingTime": "10:00",
              "closingTime": "18:00",
              "closed": false
          },
          {
              "dayOfTheWeek": "Thursday",
              "openingTime": "10:00",
              "closingTime": "18:00",
              "closed": false
          },
          {
              "dayOfTheWeek": "Friday",
              "openingTime": "10:00",
              "closingTime": "18:00",
              "closed": false
          },
          {
              "dayOfTheWeek": "Saturday",
              "openingTime": "10:00",
              "closingTime": "16:00",
              "closed": false
          },
          {
              "dayOfTheWeek": "Sunday",
              "openingTime": "",
              "closingTime": "",
              "closed": true
          }
      ],
      "exceptionHours": []
  },
  "lastChanged": {
      "date": "2021-05-31",
      "time": "00:02:29"
  }
},{
  "storeId": "138",
  "storeName": "Oslo, Manglerud",
  "status": "Open",
  "address": {
      "street": "Plogveien 6",
      "postalCode": "0679",
      "city": "Oslo",
      "gpsCoord": "59.8972890;10.8128575",
      "globalLocationNumber": "7080003252296",
      "organisationNumber": "973107364"
  },
  "telephone": "22 01 50 00",
  "email": "kundesenter@vinmonopolet.no",
  "category": "6",
  "profile": "Lyst og Lett",
  "storeAssortment": "6L",
  "openingHours": {
      "regularHours": [
          {
              "dayOfTheWeek": "Monday",
              "openingTime": "10:00",
              "closingTime": "18:00",
              "closed": false
          },
          {
              "dayOfTheWeek": "Tuesday",
              "openingTime": "10:00",
              "closingTime": "18:00",
              "closed": false
          },
          {
              "dayOfTheWeek": "Wednesday",
              "openingTime": "10:00",
              "closingTime": "18:00",
              "closed": false
          },
          {
              "dayOfTheWeek": "Thursday",
              "openingTime": "10:00",
              "closingTime": "18:00",
              "closed": false
          },
          {
              "dayOfTheWeek": "Friday",
              "openingTime": "10:00",
              "closingTime": "18:00",
              "closed": false
          },
          {
              "dayOfTheWeek": "Saturday",
              "openingTime": "10:00",
              "closingTime": "16:00",
              "closed": false
          },
          {
              "dayOfTheWeek": "Sunday",
              "openingTime": "",
              "closingTime": "",
              "closed": true
          }
      ],
      "exceptionHours": []
  },
  "lastChanged": {
      "date": "2021-05-31",
      "time": "00:02:29"
  }
},{
  "storeId": "138",
  "storeName": "Oslo, Manglerud",
  "status": "Open",
  "address": {
      "street": "Plogveien 6",
      "postalCode": "0679",
      "city": "Oslo",
      "gpsCoord": "59.8972890;10.8128575",
      "globalLocationNumber": "7080003252296",
      "organisationNumber": "973107364"
  },
  "telephone": "22 01 50 00",
  "email": "kundesenter@vinmonopolet.no",
  "category": "6",
  "profile": "Lyst og Lett",
  "storeAssortment": "6L",
  "openingHours": {
      "regularHours": [
          {
              "dayOfTheWeek": "Monday",
              "openingTime": "10:00",
              "closingTime": "18:00",
              "closed": false
          },
          {
              "dayOfTheWeek": "Tuesday",
              "openingTime": "10:00",
              "closingTime": "18:00",
              "closed": false
          },
          {
              "dayOfTheWeek": "Wednesday",
              "openingTime": "10:00",
              "closingTime": "18:00",
              "closed": false
          },
          {
              "dayOfTheWeek": "Thursday",
              "openingTime": "10:00",
              "closingTime": "18:00",
              "closed": false
          },
          {
              "dayOfTheWeek": "Friday",
              "openingTime": "10:00",
              "closingTime": "18:00",
              "closed": false
          },
          {
              "dayOfTheWeek": "Saturday",
              "openingTime": "10:00",
              "closingTime": "16:00",
              "closed": false
          },
          {
              "dayOfTheWeek": "Sunday",
              "openingTime": "",
              "closingTime": "",
              "closed": true
          }
      ],
      "exceptionHours": []
  },
  "lastChanged": {
      "date": "2021-05-31",
      "time": "00:02:29"
  }
},{
  "storeId": "138",
  "storeName": "Oslo, Manglerud",
  "status": "Open",
  "address": {
      "street": "Plogveien 6",
      "postalCode": "0679",
      "city": "Oslo",
      "gpsCoord": "59.8972890;10.8128575",
      "globalLocationNumber": "7080003252296",
      "organisationNumber": "973107364"
  },
  "telephone": "22 01 50 00",
  "email": "kundesenter@vinmonopolet.no",
  "category": "6",
  "profile": "Lyst og Lett",
  "storeAssortment": "6L",
  "openingHours": {
      "regularHours": [
          {
              "dayOfTheWeek": "Monday",
              "openingTime": "10:00",
              "closingTime": "18:00",
              "closed": false
          },
          {
              "dayOfTheWeek": "Tuesday",
              "openingTime": "10:00",
              "closingTime": "18:00",
              "closed": false
          },
          {
              "dayOfTheWeek": "Wednesday",
              "openingTime": "10:00",
              "closingTime": "18:00",
              "closed": false
          },
          {
              "dayOfTheWeek": "Thursday",
              "openingTime": "10:00",
              "closingTime": "18:00",
              "closed": false
          },
          {
              "dayOfTheWeek": "Friday",
              "openingTime": "10:00",
              "closingTime": "18:00",
              "closed": false
          },
          {
              "dayOfTheWeek": "Saturday",
              "openingTime": "10:00",
              "closingTime": "16:00",
              "closed": false
          },
          {
              "dayOfTheWeek": "Sunday",
              "openingTime": "",
              "closingTime": "",
              "closed": true
          }
      ],
      "exceptionHours": []
  },
  "lastChanged": {
      "date": "2021-05-31",
      "time": "00:02:29"
  }
},{
  "storeId": "138",
  "storeName": "Oslo, Manglerud",
  "status": "Open",
  "address": {
      "street": "Plogveien 6",
      "postalCode": "0679",
      "city": "Oslo",
      "gpsCoord": "59.8972890;10.8128575",
      "globalLocationNumber": "7080003252296",
      "organisationNumber": "973107364"
  },
  "telephone": "22 01 50 00",
  "email": "kundesenter@vinmonopolet.no",
  "category": "6",
  "profile": "Lyst og Lett",
  "storeAssortment": "6L",
  "openingHours": {
      "regularHours": [
          {
              "dayOfTheWeek": "Monday",
              "openingTime": "10:00",
              "closingTime": "18:00",
              "closed": false
          },
          {
              "dayOfTheWeek": "Tuesday",
              "openingTime": "10:00",
              "closingTime": "18:00",
              "closed": false
          },
          {
              "dayOfTheWeek": "Wednesday",
              "openingTime": "10:00",
              "closingTime": "18:00",
              "closed": false
          },
          {
              "dayOfTheWeek": "Thursday",
              "openingTime": "10:00",
              "closingTime": "18:00",
              "closed": false
          },
          {
              "dayOfTheWeek": "Friday",
              "openingTime": "10:00",
              "closingTime": "18:00",
              "closed": false
          },
          {
              "dayOfTheWeek": "Saturday",
              "openingTime": "10:00",
              "closingTime": "16:00",
              "closed": false
          },
          {
              "dayOfTheWeek": "Sunday",
              "openingTime": "",
              "closingTime": "",
              "closed": true
          }
      ],
      "exceptionHours": []
  },
  "lastChanged": {
      "date": "2021-05-31",
      "time": "00:02:29"
  }
},{
  "storeId": "138",
  "storeName": "Oslo, Manglerud",
  "status": "Open",
  "address": {
      "street": "Plogveien 6",
      "postalCode": "0679",
      "city": "Oslo",
      "gpsCoord": "59.8972890;10.8128575",
      "globalLocationNumber": "7080003252296",
      "organisationNumber": "973107364"
  },
  "telephone": "22 01 50 00",
  "email": "kundesenter@vinmonopolet.no",
  "category": "6",
  "profile": "Lyst og Lett",
  "storeAssortment": "6L",
  "openingHours": {
      "regularHours": [
          {
              "dayOfTheWeek": "Monday",
              "openingTime": "10:00",
              "closingTime": "18:00",
              "closed": false
          },
          {
              "dayOfTheWeek": "Tuesday",
              "openingTime": "10:00",
              "closingTime": "18:00",
              "closed": false
          },
          {
              "dayOfTheWeek": "Wednesday",
              "openingTime": "10:00",
              "closingTime": "18:00",
              "closed": false
          },
          {
              "dayOfTheWeek": "Thursday",
              "openingTime": "10:00",
              "closingTime": "18:00",
              "closed": false
          },
          {
              "dayOfTheWeek": "Friday",
              "openingTime": "10:00",
              "closingTime": "18:00",
              "closed": false
          },
          {
              "dayOfTheWeek": "Saturday",
              "openingTime": "10:00",
              "closingTime": "16:00",
              "closed": false
          },
          {
              "dayOfTheWeek": "Sunday",
              "openingTime": "",
              "closingTime": "",
              "closed": true
          }
      ],
      "exceptionHours": []
  },
  "lastChanged": {
      "date": "2021-05-31",
      "time": "00:02:29"
  }
},{
  "storeId": "138",
  "storeName": "Oslo, Manglerud",
  "status": "Open",
  "address": {
      "street": "Plogveien 6",
      "postalCode": "0679",
      "city": "Oslo",
      "gpsCoord": "59.8972890;10.8128575",
      "globalLocationNumber": "7080003252296",
      "organisationNumber": "973107364"
  },
  "telephone": "22 01 50 00",
  "email": "kundesenter@vinmonopolet.no",
  "category": "6",
  "profile": "Lyst og Lett",
  "storeAssortment": "6L",
  "openingHours": {
      "regularHours": [
          {
              "dayOfTheWeek": "Monday",
              "openingTime": "10:00",
              "closingTime": "18:00",
              "closed": false
          },
          {
              "dayOfTheWeek": "Tuesday",
              "openingTime": "10:00",
              "closingTime": "18:00",
              "closed": false
          },
          {
              "dayOfTheWeek": "Wednesday",
              "openingTime": "10:00",
              "closingTime": "18:00",
              "closed": false
          },
          {
              "dayOfTheWeek": "Thursday",
              "openingTime": "10:00",
              "closingTime": "18:00",
              "closed": false
          },
          {
              "dayOfTheWeek": "Friday",
              "openingTime": "10:00",
              "closingTime": "18:00",
              "closed": false
          },
          {
              "dayOfTheWeek": "Saturday",
              "openingTime": "10:00",
              "closingTime": "16:00",
              "closed": false
          },
          {
              "dayOfTheWeek": "Sunday",
              "openingTime": "",
              "closingTime": "",
              "closed": true
          }
      ],
      "exceptionHours": []
  },
  "lastChanged": {
      "date": "2021-05-31",
      "time": "00:02:29"
  }
},{
  "storeId": "138",
  "storeName": "Oslo, Manglerud",
  "status": "Open",
  "address": {
      "street": "Plogveien 6",
      "postalCode": "0679",
      "city": "Oslo",
      "gpsCoord": "59.8972890;10.8128575",
      "globalLocationNumber": "7080003252296",
      "organisationNumber": "973107364"
  },
  "telephone": "22 01 50 00",
  "email": "kundesenter@vinmonopolet.no",
  "category": "6",
  "profile": "Lyst og Lett",
  "storeAssortment": "6L",
  "openingHours": {
      "regularHours": [
          {
              "dayOfTheWeek": "Monday",
              "openingTime": "10:00",
              "closingTime": "18:00",
              "closed": false
          },
          {
              "dayOfTheWeek": "Tuesday",
              "openingTime": "10:00",
              "closingTime": "18:00",
              "closed": false
          },
          {
              "dayOfTheWeek": "Wednesday",
              "openingTime": "10:00",
              "closingTime": "18:00",
              "closed": false
          },
          {
              "dayOfTheWeek": "Thursday",
              "openingTime": "10:00",
              "closingTime": "18:00",
              "closed": false
          },
          {
              "dayOfTheWeek": "Friday",
              "openingTime": "10:00",
              "closingTime": "18:00",
              "closed": false
          },
          {
              "dayOfTheWeek": "Saturday",
              "openingTime": "10:00",
              "closingTime": "16:00",
              "closed": false
          },
          {
              "dayOfTheWeek": "Sunday",
              "openingTime": "",
              "closingTime": "",
              "closed": true
          }
      ],
      "exceptionHours": []
  },
  "lastChanged": {
      "date": "2021-05-31",
      "time": "00:02:29"
  }
},{
  "storeId": "138",
  "storeName": "Oslo, Manglerud",
  "status": "Open",
  "address": {
      "street": "Plogveien 6",
      "postalCode": "0679",
      "city": "Oslo",
      "gpsCoord": "59.8972890;10.8128575",
      "globalLocationNumber": "7080003252296",
      "organisationNumber": "973107364"
  },
  "telephone": "22 01 50 00",
  "email": "kundesenter@vinmonopolet.no",
  "category": "6",
  "profile": "Lyst og Lett",
  "storeAssortment": "6L",
  "openingHours": {
      "regularHours": [
          {
              "dayOfTheWeek": "Monday",
              "openingTime": "10:00",
              "closingTime": "18:00",
              "closed": false
          },
          {
              "dayOfTheWeek": "Tuesday",
              "openingTime": "10:00",
              "closingTime": "18:00",
              "closed": false
          },
          {
              "dayOfTheWeek": "Wednesday",
              "openingTime": "10:00",
              "closingTime": "18:00",
              "closed": false
          },
          {
              "dayOfTheWeek": "Thursday",
              "openingTime": "10:00",
              "closingTime": "18:00",
              "closed": false
          },
          {
              "dayOfTheWeek": "Friday",
              "openingTime": "10:00",
              "closingTime": "18:00",
              "closed": false
          },
          {
              "dayOfTheWeek": "Saturday",
              "openingTime": "10:00",
              "closingTime": "16:00",
              "closed": false
          },
          {
              "dayOfTheWeek": "Sunday",
              "openingTime": "",
              "closingTime": "",
              "closed": true
          }
      ],
      "exceptionHours": []
  },
  "lastChanged": {
      "date": "2021-05-31",
      "time": "00:02:29"
  }
},{
  "storeId": "138",
  "storeName": "last one",
  "status": "Open",
  "address": {
      "street": "Plogveien 6",
      "postalCode": "0679",
      "city": "Oslo",
      "gpsCoord": "59.8972890;10.8128575",
      "globalLocationNumber": "7080003252296",
      "organisationNumber": "973107364"
  },
  "telephone": "22 01 50 00",
  "email": "kundesenter@vinmonopolet.no",
  "category": "6",
  "profile": "Lyst og Lett",
  "storeAssortment": "6L",
  "openingHours": {
      "regularHours": [
          {
              "dayOfTheWeek": "Monday",
              "openingTime": "10:00",
              "closingTime": "18:00",
              "closed": false
          },
          {
              "dayOfTheWeek": "Tuesday",
              "openingTime": "10:00",
              "closingTime": "18:00",
              "closed": false
          },
          {
              "dayOfTheWeek": "Wednesday",
              "openingTime": "10:00",
              "closingTime": "18:00",
              "closed": false
          },
          {
              "dayOfTheWeek": "Thursday",
              "openingTime": "10:00",
              "closingTime": "18:00",
              "closed": false
          },
          {
              "dayOfTheWeek": "Friday",
              "openingTime": "10:00",
              "closingTime": "18:00",
              "closed": false
          },
          {
              "dayOfTheWeek": "Saturday",
              "openingTime": "10:00",
              "closingTime": "16:00",
              "closed": false
          },
          {
              "dayOfTheWeek": "Sunday",
              "openingTime": "",
              "closingTime": "",
              "closed": true
          }
      ],
      "exceptionHours": []
  },
  "lastChanged": {
      "date": "2021-05-31",
      "time": "00:02:29"
  }
}
]

let temporaryListof10 = [{
  "storeId": "138",
  "storeName": "temporay 10",
  "status": "Open",
  "address": {
      "street": "Plogveien 6",
      "postalCode": "0679",
      "city": "Oslo",
      "gpsCoord": "59.8972890;10.8128575",
      "globalLocationNumber": "7080003252296",
      "organisationNumber": "973107364"
  },
  "telephone": "22 01 50 00",
  "email": "kundesenter@vinmonopolet.no",
  "category": "6",
  "profile": "Lyst og Lett",
  "storeAssortment": "6L",
  "openingHours": {
      "regularHours": [
          {
              "dayOfTheWeek": "Monday",
              "openingTime": "10:00",
              "closingTime": "18:00",
              "closed": false
          },
          {
              "dayOfTheWeek": "Tuesday",
              "openingTime": "10:00",
              "closingTime": "18:00",
              "closed": false
          },
          {
              "dayOfTheWeek": "Wednesday",
              "openingTime": "10:00",
              "closingTime": "18:00",
              "closed": false
          },
          {
              "dayOfTheWeek": "Thursday",
              "openingTime": "10:00",
              "closingTime": "18:00",
              "closed": false
          },
          {
              "dayOfTheWeek": "Friday",
              "openingTime": "10:00",
              "closingTime": "18:00",
              "closed": false
          },
          {
              "dayOfTheWeek": "Saturday",
              "openingTime": "10:00",
              "closingTime": "16:00",
              "closed": false
          },
          {
              "dayOfTheWeek": "Sunday",
              "openingTime": "",
              "closingTime": "",
              "closed": true
          }
      ],
      "exceptionHours": []
  },
  "lastChanged": {
      "date": "2021-05-31",
      "time": "00:02:29"
  }
},{
  "storeId": "138",
  "storeName": "Oslo, Manglerud",
  "status": "Open",
  "address": {
      "street": "Plogveien 6",
      "postalCode": "0679",
      "city": "Oslo",
      "gpsCoord": "59.8972890;10.8128575",
      "globalLocationNumber": "7080003252296",
      "organisationNumber": "973107364"
  },
  "telephone": "22 01 50 00",
  "email": "kundesenter@vinmonopolet.no",
  "category": "6",
  "profile": "Lyst og Lett",
  "storeAssortment": "6L",
  "openingHours": {
      "regularHours": [
          {
              "dayOfTheWeek": "Monday",
              "openingTime": "10:00",
              "closingTime": "18:00",
              "closed": false
          },
          {
              "dayOfTheWeek": "Tuesday",
              "openingTime": "10:00",
              "closingTime": "18:00",
              "closed": false
          },
          {
              "dayOfTheWeek": "Wednesday",
              "openingTime": "10:00",
              "closingTime": "18:00",
              "closed": false
          },
          {
              "dayOfTheWeek": "Thursday",
              "openingTime": "10:00",
              "closingTime": "18:00",
              "closed": false
          },
          {
              "dayOfTheWeek": "Friday",
              "openingTime": "10:00",
              "closingTime": "18:00",
              "closed": false
          },
          {
              "dayOfTheWeek": "Saturday",
              "openingTime": "10:00",
              "closingTime": "16:00",
              "closed": false
          },
          {
              "dayOfTheWeek": "Sunday",
              "openingTime": "",
              "closingTime": "",
              "closed": true
          }
      ],
      "exceptionHours": []
  },
  "lastChanged": {
      "date": "2021-05-31",
      "time": "00:02:29"
  }
},{
  "storeId": "138",
  "storeName": "Oslo, Manglerud",
  "status": "Open",
  "address": {
      "street": "Plogveien 6",
      "postalCode": "0679",
      "city": "Oslo",
      "gpsCoord": "59.8972890;10.8128575",
      "globalLocationNumber": "7080003252296",
      "organisationNumber": "973107364"
  },
  "telephone": "22 01 50 00",
  "email": "kundesenter@vinmonopolet.no",
  "category": "6",
  "profile": "Lyst og Lett",
  "storeAssortment": "6L",
  "openingHours": {
      "regularHours": [
          {
              "dayOfTheWeek": "Monday",
              "openingTime": "10:00",
              "closingTime": "18:00",
              "closed": false
          },
          {
              "dayOfTheWeek": "Tuesday",
              "openingTime": "10:00",
              "closingTime": "18:00",
              "closed": false
          },
          {
              "dayOfTheWeek": "Wednesday",
              "openingTime": "10:00",
              "closingTime": "18:00",
              "closed": false
          },
          {
              "dayOfTheWeek": "Thursday",
              "openingTime": "10:00",
              "closingTime": "18:00",
              "closed": false
          },
          {
              "dayOfTheWeek": "Friday",
              "openingTime": "10:00",
              "closingTime": "18:00",
              "closed": false
          },
          {
              "dayOfTheWeek": "Saturday",
              "openingTime": "10:00",
              "closingTime": "16:00",
              "closed": false
          },
          {
              "dayOfTheWeek": "Sunday",
              "openingTime": "",
              "closingTime": "",
              "closed": true
          }
      ],
      "exceptionHours": []
  },
  "lastChanged": {
      "date": "2021-05-31",
      "time": "00:02:29"
  }
},{
  "storeId": "138",
  "storeName": "Oslo, Manglerud",
  "status": "Open",
  "address": {
      "street": "Plogveien 6",
      "postalCode": "0679",
      "city": "Oslo",
      "gpsCoord": "59.8972890;10.8128575",
      "globalLocationNumber": "7080003252296",
      "organisationNumber": "973107364"
  },
  "telephone": "22 01 50 00",
  "email": "kundesenter@vinmonopolet.no",
  "category": "6",
  "profile": "Lyst og Lett",
  "storeAssortment": "6L",
  "openingHours": {
      "regularHours": [
          {
              "dayOfTheWeek": "Monday",
              "openingTime": "10:00",
              "closingTime": "18:00",
              "closed": false
          },
          {
              "dayOfTheWeek": "Tuesday",
              "openingTime": "10:00",
              "closingTime": "18:00",
              "closed": false
          },
          {
              "dayOfTheWeek": "Wednesday",
              "openingTime": "10:00",
              "closingTime": "18:00",
              "closed": false
          },
          {
              "dayOfTheWeek": "Thursday",
              "openingTime": "10:00",
              "closingTime": "18:00",
              "closed": false
          },
          {
              "dayOfTheWeek": "Friday",
              "openingTime": "10:00",
              "closingTime": "18:00",
              "closed": false
          },
          {
              "dayOfTheWeek": "Saturday",
              "openingTime": "10:00",
              "closingTime": "16:00",
              "closed": false
          },
          {
              "dayOfTheWeek": "Sunday",
              "openingTime": "",
              "closingTime": "",
              "closed": true
          }
      ],
      "exceptionHours": []
  },
  "lastChanged": {
      "date": "2021-05-31",
      "time": "00:02:29"
  }
},{
  "storeId": "138",
  "storeName": "Oslo, Manglerud",
  "status": "Open",
  "address": {
      "street": "Plogveien 6",
      "postalCode": "0679",
      "city": "Oslo",
      "gpsCoord": "59.8972890;10.8128575",
      "globalLocationNumber": "7080003252296",
      "organisationNumber": "973107364"
  },
  "telephone": "22 01 50 00",
  "email": "kundesenter@vinmonopolet.no",
  "category": "6",
  "profile": "Lyst og Lett",
  "storeAssortment": "6L",
  "openingHours": {
      "regularHours": [
          {
              "dayOfTheWeek": "Monday",
              "openingTime": "10:00",
              "closingTime": "18:00",
              "closed": false
          },
          {
              "dayOfTheWeek": "Tuesday",
              "openingTime": "10:00",
              "closingTime": "18:00",
              "closed": false
          },
          {
              "dayOfTheWeek": "Wednesday",
              "openingTime": "10:00",
              "closingTime": "18:00",
              "closed": false
          },
          {
              "dayOfTheWeek": "Thursday",
              "openingTime": "10:00",
              "closingTime": "18:00",
              "closed": false
          },
          {
              "dayOfTheWeek": "Friday",
              "openingTime": "10:00",
              "closingTime": "18:00",
              "closed": false
          },
          {
              "dayOfTheWeek": "Saturday",
              "openingTime": "10:00",
              "closingTime": "16:00",
              "closed": false
          },
          {
              "dayOfTheWeek": "Sunday",
              "openingTime": "",
              "closingTime": "",
              "closed": true
          }
      ],
      "exceptionHours": []
  },
  "lastChanged": {
      "date": "2021-05-31",
      "time": "00:02:29"
  }
},{
  "storeId": "138",
  "storeName": "Oslo, Manglerud",
  "status": "Open",
  "address": {
      "street": "Plogveien 6",
      "postalCode": "0679",
      "city": "Oslo",
      "gpsCoord": "59.8972890;10.8128575",
      "globalLocationNumber": "7080003252296",
      "organisationNumber": "973107364"
  },
  "telephone": "22 01 50 00",
  "email": "kundesenter@vinmonopolet.no",
  "category": "6",
  "profile": "Lyst og Lett",
  "storeAssortment": "6L",
  "openingHours": {
      "regularHours": [
          {
              "dayOfTheWeek": "Monday",
              "openingTime": "10:00",
              "closingTime": "18:00",
              "closed": false
          },
          {
              "dayOfTheWeek": "Tuesday",
              "openingTime": "10:00",
              "closingTime": "18:00",
              "closed": false
          },
          {
              "dayOfTheWeek": "Wednesday",
              "openingTime": "10:00",
              "closingTime": "18:00",
              "closed": false
          },
          {
              "dayOfTheWeek": "Thursday",
              "openingTime": "10:00",
              "closingTime": "18:00",
              "closed": false
          },
          {
              "dayOfTheWeek": "Friday",
              "openingTime": "10:00",
              "closingTime": "18:00",
              "closed": false
          },
          {
              "dayOfTheWeek": "Saturday",
              "openingTime": "10:00",
              "closingTime": "16:00",
              "closed": false
          },
          {
              "dayOfTheWeek": "Sunday",
              "openingTime": "",
              "closingTime": "",
              "closed": true
          }
      ],
      "exceptionHours": []
  },
  "lastChanged": {
      "date": "2021-05-31",
      "time": "00:02:29"
  }
},{
  "storeId": "138",
  "storeName": "Oslo, Manglerud",
  "status": "Open",
  "address": {
      "street": "Plogveien 6",
      "postalCode": "0679",
      "city": "Oslo",
      "gpsCoord": "59.8972890;10.8128575",
      "globalLocationNumber": "7080003252296",
      "organisationNumber": "973107364"
  },
  "telephone": "22 01 50 00",
  "email": "kundesenter@vinmonopolet.no",
  "category": "6",
  "profile": "Lyst og Lett",
  "storeAssortment": "6L",
  "openingHours": {
      "regularHours": [
          {
              "dayOfTheWeek": "Monday",
              "openingTime": "10:00",
              "closingTime": "18:00",
              "closed": false
          },
          {
              "dayOfTheWeek": "Tuesday",
              "openingTime": "10:00",
              "closingTime": "18:00",
              "closed": false
          },
          {
              "dayOfTheWeek": "Wednesday",
              "openingTime": "10:00",
              "closingTime": "18:00",
              "closed": false
          },
          {
              "dayOfTheWeek": "Thursday",
              "openingTime": "10:00",
              "closingTime": "18:00",
              "closed": false
          },
          {
              "dayOfTheWeek": "Friday",
              "openingTime": "10:00",
              "closingTime": "18:00",
              "closed": false
          },
          {
              "dayOfTheWeek": "Saturday",
              "openingTime": "10:00",
              "closingTime": "16:00",
              "closed": false
          },
          {
              "dayOfTheWeek": "Sunday",
              "openingTime": "",
              "closingTime": "",
              "closed": true
          }
      ],
      "exceptionHours": []
  },
  "lastChanged": {
      "date": "2021-05-31",
      "time": "00:02:29"
  }
},{
  "storeId": "138",
  "storeName": "Oslo, Manglerud",
  "status": "Open",
  "address": {
      "street": "Plogveien 6",
      "postalCode": "0679",
      "city": "Oslo",
      "gpsCoord": "59.8972890;10.8128575",
      "globalLocationNumber": "7080003252296",
      "organisationNumber": "973107364"
  },
  "telephone": "22 01 50 00",
  "email": "kundesenter@vinmonopolet.no",
  "category": "6",
  "profile": "Lyst og Lett",
  "storeAssortment": "6L",
  "openingHours": {
      "regularHours": [
          {
              "dayOfTheWeek": "Monday",
              "openingTime": "10:00",
              "closingTime": "18:00",
              "closed": false
          },
          {
              "dayOfTheWeek": "Tuesday",
              "openingTime": "10:00",
              "closingTime": "18:00",
              "closed": false
          },
          {
              "dayOfTheWeek": "Wednesday",
              "openingTime": "10:00",
              "closingTime": "18:00",
              "closed": false
          },
          {
              "dayOfTheWeek": "Thursday",
              "openingTime": "10:00",
              "closingTime": "18:00",
              "closed": false
          },
          {
              "dayOfTheWeek": "Friday",
              "openingTime": "10:00",
              "closingTime": "18:00",
              "closed": false
          },
          {
              "dayOfTheWeek": "Saturday",
              "openingTime": "10:00",
              "closingTime": "16:00",
              "closed": false
          },
          {
              "dayOfTheWeek": "Sunday",
              "openingTime": "",
              "closingTime": "",
              "closed": true
          }
      ],
      "exceptionHours": []
  },
  "lastChanged": {
      "date": "2021-05-31",
      "time": "00:02:29"
  }
},{
  "storeId": "138",
  "storeName": "Oslo, Manglerud",
  "status": "Open",
  "address": {
      "street": "Plogveien 6",
      "postalCode": "0679",
      "city": "Oslo",
      "gpsCoord": "59.8972890;10.8128575",
      "globalLocationNumber": "7080003252296",
      "organisationNumber": "973107364"
  },
  "telephone": "22 01 50 00",
  "email": "kundesenter@vinmonopolet.no",
  "category": "6",
  "profile": "Lyst og Lett",
  "storeAssortment": "6L",
  "openingHours": {
      "regularHours": [
          {
              "dayOfTheWeek": "Monday",
              "openingTime": "10:00",
              "closingTime": "18:00",
              "closed": false
          },
          {
              "dayOfTheWeek": "Tuesday",
              "openingTime": "10:00",
              "closingTime": "18:00",
              "closed": false
          },
          {
              "dayOfTheWeek": "Wednesday",
              "openingTime": "10:00",
              "closingTime": "18:00",
              "closed": false
          },
          {
              "dayOfTheWeek": "Thursday",
              "openingTime": "10:00",
              "closingTime": "18:00",
              "closed": false
          },
          {
              "dayOfTheWeek": "Friday",
              "openingTime": "10:00",
              "closingTime": "18:00",
              "closed": false
          },
          {
              "dayOfTheWeek": "Saturday",
              "openingTime": "10:00",
              "closingTime": "16:00",
              "closed": false
          },
          {
              "dayOfTheWeek": "Sunday",
              "openingTime": "",
              "closingTime": "",
              "closed": true
          }
      ],
      "exceptionHours": []
  },
  "lastChanged": {
      "date": "2021-05-31",
      "time": "00:02:29"
  }
},{
  "storeId": "138",
  "storeName": "Oslo, Manglerud",
  "status": "Open",
  "address": {
      "street": "Plogveien 6",
      "postalCode": "0679",
      "city": "Oslo",
      "gpsCoord": "59.8972890;10.8128575",
      "globalLocationNumber": "7080003252296",
      "organisationNumber": "973107364"
  },
  "telephone": "22 01 50 00",
  "email": "kundesenter@vinmonopolet.no",
  "category": "6",
  "profile": "Lyst og Lett",
  "storeAssortment": "6L",
  "openingHours": {
      "regularHours": [
          {
              "dayOfTheWeek": "Monday",
              "openingTime": "10:00",
              "closingTime": "18:00",
              "closed": false
          },
          {
              "dayOfTheWeek": "Tuesday",
              "openingTime": "10:00",
              "closingTime": "18:00",
              "closed": false
          },
          {
              "dayOfTheWeek": "Wednesday",
              "openingTime": "10:00",
              "closingTime": "18:00",
              "closed": false
          },
          {
              "dayOfTheWeek": "Thursday",
              "openingTime": "10:00",
              "closingTime": "18:00",
              "closed": false
          },
          {
              "dayOfTheWeek": "Friday",
              "openingTime": "10:00",
              "closingTime": "18:00",
              "closed": false
          },
          {
              "dayOfTheWeek": "Saturday",
              "openingTime": "10:00",
              "closingTime": "16:00",
              "closed": false
          },
          {
              "dayOfTheWeek": "Sunday",
              "openingTime": "",
              "closingTime": "",
              "closed": true
          }
      ],
      "exceptionHours": []
  },
  "lastChanged": {
      "date": "2021-05-31",
      "time": "00:02:29"
  }
}
]

import 'main.css';

renderHeader()
renderTimeAndDate()
renderSearchElement()

const mainSearchInputElement = document.querySelector('#main-search-input')
mainSearchInputElement.setAttribute('placeholder', 'Enter a city, store name, or postal code')
mainSearchInputElement.setAttribute('name', 'searchTerm')
const mainSearchInputForm = document.querySelector('#main-search-form')

mainSearchInputForm.addEventListener('submit', function (e) {

  
  e.preventDefault()
  if (e.target.elements.searchTerm.value === ''){
    return
  }  
  searchTermIsMultiple = false
  listToPaginate = {}
  searchTerm = e.target.elements.searchTerm.value
  searchTerm = searchTerm.trim()

  if (haveDownloadedEntireList === true) {
    if (!searchTerm.includes(' ')) {
      const filteredStoreList = filterResults(entireListOfStores, searchTerm)
      handlePossibleMatches(filteredStoreList)
    } else {
      searchTermIsMultiple = true
      let multipleSearchTerms = handleMultipleSearchTerms.divideSearchTerms(searchTerm)
      const filteredStoreListMultSearch = filterMultiSearches(multipleSearchTerms)
      const combinedFilteredArray = [].concat(...filteredStoreListMultSearch)
      handlePossibleMatches(combinedFilteredArray)
    }    
  } else {
    if (!searchTerm.includes(' ')) {
      handleSingleQuery(searchTerm)
      // handlePossibleMatches(temporaryListof10)
      // handlePossibleMatches(temporaryListof11)
    } else {
          let multipleSearchTerms = handleMultipleSearchTerms.divideSearchTerms(searchTerm)
          getMultiFetchesTest(multipleSearchTerms)
    }
  }

})

const filterMultiSearches = (multipleSearchTerms) => {
  const filteredStoreListMultSearch = new Array
  for (let i = 0; i < multipleSearchTerms.length; i++) {
    filteredStoreListMultSearch.push(filterResults(entireListOfStores, multipleSearchTerms[i]))
    filteredStoreListMultSearch[i].forEach(store => {
    store.searchedFor = multipleSearchTerms[i]
    })
  }
  return filteredStoreListMultSearch 
}

// you are here....  
// you are working in get next 10 results, you have to have a way to store the potential next stores


//todo change button click to entire button (display block not working yet, may have to do it in css)
//todo limit result display to ten at a time
//todo more date/holiday testing

const handleSingleQuery = function (searchTerm){
    getStoreByName(searchTerm)
    .then((result) => { 
      handlePossibleMatches(result)
    }).catch((err) => {
     console.log(`Error: ${err}`)
    })
}


const handleMultipleSearchTerms = (function () {
  return {
    divideSearchTerms: function () {
      const multipleSearchTerms = searchTerm.split(' ')
      return multipleSearchTerms      
    }
  }
})()

function getMultiFetchesTest (multipleSearchTerms) {
  searchTermIsMultiple = true
  let temporaryArray = new Array;
  let fetches = [];
  for (let i = 0; i < multipleSearchTerms.length; i++) {
    fetches.push(
      getStoreByName(multipleSearchTerms[i])
      .then(result => {
        result.forEach(store => {
          store.searchedFor = multipleSearchTerms[i]
        });
        temporaryArray.push(result);
          }
      )
      .catch(status, err => {return console.log(status, err);})
    );
  }
  Promise.all(fetches).then(function() { 
    let combinedFetchArray = [].concat(...temporaryArray);
    handlePossibleMatches(combinedFetchArray)
  });
  }

const handlePossibleMatches = (possibleMatches) => {
  clearExistingContent()
  if (possibleMatches.length === 1){
    renderStore(possibleMatches)
  } else if (possibleMatches.length > 1 && possibleMatches.length <= 10) {
    let moreResultsToDisplay = false
    renderStores(possibleMatches, moreResultsToDisplay)
  } else if (possibleMatches.length > 1) { 
  listToPaginate = possibleMatches
  getNext10OrFewerResults(moreResultsToDisplay)
  } else if (haveDownloadedEntireList === true ){
    renderNoStoresFound()
  } else {
    getallStores(searchTerm)
    .then((result) => {
    console.log('have downloaded entire list')
    haveDownloadedEntireList = true
    entireListOfStores = result             
    possibleMatches = filterResults(entireListOfStores, searchTerm)       
    handlePossibleMatches(possibleMatches)
    }).catch((err) => {
    console.log(`Error: ${err}`)
    })
  }
}

const getNext10OrFewerResults = () => {  
  if (listToPaginate.length > 10) {
    moreResultsToDisplay = true
  } else {
    moreResultsToDisplay = false
  }  
  const current10orFewerResults = listToPaginate.splice(0, 10)
  renderStores(current10orFewerResults, moreResultsToDisplay)
}


const filterResults = function (stores, searchTerm){
  return stores.filter(function (store) {
    
    const isCityMatch = store.address.city.toLowerCase().includes(searchTerm.toString().toLowerCase())
    const isStreetAddressMatch = store.address.street.toLowerCase().includes(searchTerm.toString().toLowerCase())
    const isPostalCodeMatch = store.address.postalCode.includes(searchTerm)
    const isStoreNameMatch = store.storeName.toLowerCase().includes(searchTerm.toString().toLowerCase())

    
    return isCityMatch || isStreetAddressMatch || isPostalCodeMatch || isStoreNameMatch
  })
}

const checkForMultipleSearchTerms =()=> searchTermIsMultiple

export {checkForMultipleSearchTerms, getNext10OrFewerResults, listToPaginate}




  
 



 

 
  
  
 
