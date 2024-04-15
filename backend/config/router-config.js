(function(routeconfig){
    "use strict"
    routeconfig.init = function(app){
        var users=require('../routes/users')
        var conversation=require('../routes/conversation')

        app.use('/user',users)
        app.use('/conversation',conversation)

    }
})(module.exports)