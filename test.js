global.Promise = require('bluebird');


var engine = require('./dist/index.js').DubboEngine;
var bluebird = require('bluebird');


var engineInstance = new engine();


engineInstance.proxy({
    "key": "login",
    "title": "登陆接口",
    "method": "GET",
    "path": "/passport/login",
    "config": {
        "method": "insertBookingOrder",
        "dataAdapter": {
            "class": "com.chinaredstar.fc.api.param.broker.OrderParam",
            "data": {
                "roomId": "/$/roomId",
                "contactPhone": "/$/contactPhone",
                "userPhone": "/$/userPhone",
                "bookingNumber": "/$/bookingNumber",
                "status": "/$/status",
                "memo": "/$/memo",
                "contactor": "/$/contactor",
                "userName": "/$/userName",
                "consultantOpenId": "/$/consultantOpenId",
                "userOpenId": "/$/userOpenId"
            }
        },
        "application": {
            "name": "modelproxy-dubbo-test",
            "dInterface": {
                "alias": "IBookingOrderService:1.0.2",
                "name": 'com.chinaredstar.fc.api.service.broker.IBookingOrderService',
                "version": '1.0.2'
            }
        }
    }
}, {
    executeInfo: {
        data: {
            roomId: 100116,
            contactPhone: 18559311819,
            userPhone: 18559311819,
            bookingNumber: 1234567,
            status: 0,
            memo: "",
            contactor: "nick",
            userName: "nick",
            consultantOpenId: "05d93845-3156-4dd2-9c46-d958a3d23542",
            userOpenId: "7144b4f5-348f-437f-8315-ccda28f077c3"
        }
    }
}).then(console.log).catch(console.error);

engineInstance.proxy({
    "key": "login",
    "title": "登陆接口",
    "method": "GET",
    "path": "/passport/login",
    "config": {
        "method": "getHouseById",
        "dataAdapter": {
            "class": "java.lang.Integer",
            "data": {
                "id": "/$",
            }
        },
        "application": {
            "name": "modelproxy-dubbo-test",
            "dInterface": {
                "alias": "IHouseService:1.0.2",
                "name": 'com.chinaredstar.fc.api.service.house.IHouseService',
                "version": '1.0.2'
            }
        }
    }
}, {
    executeInfo: {
        data: {
            id: 133602,
        }
    }
}).then(console.log).catch(console.error);