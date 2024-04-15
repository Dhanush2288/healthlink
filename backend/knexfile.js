require("dotenv").config();
var host=process.env.DB_HOST
var user=process.env.DB_USER
var password =process.env.DB_PASSWORD
var databaseName=process.env.DB_DATABASE
console.log(databaseName,"databaseName");
module.exports={
development:{
    client:"mysql2",
    version:"7.2",
    connection:{
        host:host,
        user:user,
        password:password,
        database:databaseName
    },
    migrations:{
        directory:__dirname + '/models/migrations'
    },
    seeds:{
        directory:__dirname + '/models/seeds'
    }
}
}