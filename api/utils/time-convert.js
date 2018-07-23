let moment = require('moment-timezone');
module.exports = function (objectArray) {
    return new Promise(function (resolve) {
        objectArray.forEach(object => {
            object.time = moment(object.time.getTime()).tz('Asia/Ho_Chi_Minh').format('YYYY/MM/DD HH:mm:ss.SSSS');
        });
        resolve(objectArray);
    });
};