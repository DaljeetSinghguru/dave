//app.service('ShopService', function () {

//    
//   //this.xxx = data;

//    this.sendData = function (data) {
//        this.xxx = data;
//    };
//});
app.service("ShopService", function () {
    
    var _xxx = {};

    return {
        getXxx: function () {
            
            return _xxx;
        },
        setXxx: function (value) {
            
            _xxx = value;
        }
    };

});