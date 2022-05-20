
const {createPool} =require('mysql')
require("dotenv").config()
const pool = createPool({
   
    host: process.env.db_host,
    user: process.env.db_user,
    password:process.env.db_password,
    database:process.env.db_name
  

},(error)=>{
    console.log(error)
})


module.exports = pool;