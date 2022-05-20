const pool=require('../dbConnection')
const { createNotification } = require('./notificationModel');
module.exports={
    buyPackage:(data,callback)=>{
        console.log(data)
        if(data.packagetype==undefined || data.userid==undefined){
            return callback("please send data with along correct attribute")
         }
        if(data.packagetype==undefined){
            return callback("please send data with correct attribute")
        } 
        else if(data.packagetype=="free"){
            var queryStatment=`Insert into subscriptions set userid=?, postleft=15 ,subscription_end_timestamp=DATE(NOW()) + INTERVAL 1 MONTH,planid=1 ,status=2`
           var values=[
            data.userid,

            ]
            var queryStatmentt2=`select * from subscriptions where userid=${data.userid} and planid=1`
            try{pool.query(queryStatmentt2,(error,result)=>{
                if(error){
                    return callback(error)
                }
                else{
                    if(result=="" || result ==[] ||result==null){
                        try{pool.query(queryStatment,values,(error,result)=>{
                            if(error){
                                return callback(error)
                            }
                            else{
                               
                                return callback(null,result)
                            }
                        })}catch(error){
                            console.error(error);
                        }
                    }
                    else{
                        var error='you already bought free trial package'
                        return callback(error)
                    }
                   
                }
            })}catch(error){
                console.error(error);
            }
          
        }
        else if(data.packagetype=="basic"){
            var queryStatment=`Insert into subscriptions set userid=?, planid=2`
            var values=[
            data.userid,
            
            ]
            try{pool.query(queryStatment,values,(error,result)=>{
                if(error){
                    return callback(error)
                }
                else{
                   
                    return callback(null,result)
                }
            })}catch(error){
                console.error(error);
            }
        }
        else if(data.packagetype=="premium"){
            var queryStatment=`Insert into subscriptions set userid=?, planid=3`
            var values=[
            data.userid,
            
            ,]
            try{pool.query(queryStatment,values,(error,result)=>{
                if(error){
                    return callback(error)
                }
                else{
                   
                    return callback(null,result)
                }
            })}catch(error){
                console.error(error);
            }
        }
        else if(data.packagetype=="vip"){
            var queryStatment=`Insert into subscriptions set userid=?, planid=4`
            var values=[
            data.userid,
            
           ]
           try{pool.query(queryStatment,values,(error,result)=>{
            if(error){
                return callback(error)
            }
            else{
               
                return callback(null,result)
            }
        })}catch(error){
            console.error(error);
        }
            
        }
        else{
            return callback("please select correct type of package")
        }
        
        
    },
    approvePackage:(data,callback)=>{
        if(data.planid==undefined || data.subscriptionid==undefined|| data.userid==undefined){
            return callback("please send data with along correct attribute")
         }
        var queryStatment;

        if(data.planid==1){
            queryStatment=`update subscriptions set subscription_start_timestamp=now(),subscription_end_timestamp=DATE(NOW()) + INTERVAL 1 MONTH,postleft=100, status=2 where subscriptionid=?`
       
        }
        else if(data.planid==2){
            queryStatment=`update subscriptions set subscription_start_timestamp=now(),subscription_end_timestamp=DATE(NOW()) + INTERVAL 1 MONTH,postleft=100, status=2 where subscriptionid=?`
        }
        else if(data.planid==3){
            queryStatment=`update subscriptions set subscription_start_timestamp=now(),subscription_end_timestamp=DATE(NOW()) + INTERVAL 1 MONTH,postleft=100, status=2 where subscriptionid=?`
        }
        else if(data.planid==4){
            queryStatment=`update subscriptions set subscription_start_timestamp=now(),subscription_end_timestamp=DATE(NOW()) + INTERVAL 1 MONTH,postleft=100, status=2 
            where subscriptionid=?`
        }
        else {
            return callback('incorrect plan')
        }

        var values=[
            data.subscriptionid
        ]
        try{pool.query(queryStatment,values,(error,result)=>{
            if(error){
                return callback(error)
            }
            else{
                createNotification({touser:data.userid,sentfrom:91, text:`your package request has been approved!`},(error,result)=>{
                    if(error){}else{}
                  })
                return callback(null,result)
            }
        })}catch(error){
            console.error(error);
        }
    },denyPackage:(data,callback)=>{
       
        if (data.subscriptionid==undefined){
            return callback("please send data with correct attribute")
        }
        var queryStatment=`update subscriptions set status=3 where subscriptionid=?`
        
        var values=[
            data.subscriptionid
    ]
        try{pool.query(queryStatment,values,(error,result)=>{
            if(error){
                return callback(error)
            }
            else{
                createNotification({touser:data.userid,sentfrom:91, text:`your package request has been denied!`},(error,result)=>{
                    if(error){}else{}
                  })
                return callback(null,result)
            }
        })}catch(error){
            console.error(error);
        }
    },
    packageStatus:(data,callback)=>{
    
        if (data.status==undefined){
            return callback("please send data with correct attribute")
        }
        else if(data.status=="all"){
            var queryStatment=`SELECT users.fullname,users.phonenumber,subscriptions.* FROM subscriptions inner join users on subscriptions.userid=users.userid`
        }
        else if(data.status=="default"){
            var queryStatment=`SELECT users.fullname,users.phonenumber,subscriptions.* FROM subscriptions inner join users on subscriptions.userid=users.userid where subscriptions.status=0`
        }
        else if(data.status=="pending"){
            var queryStatment=`SELECT users.fullname,users.phonenumber,subscriptions.* FROM subscriptions inner join users on subscriptions.userid=users.userid where subscriptions.status=1`
        }
        else if(data.status=="approved"){
            var queryStatment=`SELECT users.fullname,users.phonenumber,subscriptions.* FROM subscriptions inner join users on subscriptions.userid=users.userid where subscriptions.status=2`
        }
        else if(data.status=="denied"){
            var queryStatment=`SELECT users.fullname,users.phonenumber,subscriptions.* FROM subscriptions inner join users on subscriptions.userid=users.userid where subscriptions.status=3`
        }
        else {
            return callback('incorrect status')
        }
        
        var values={
            
         }
        try{pool.query(queryStatment,values,(error,result)=>{
            if(error){
                return callback(error)
            }
            else{
                
                return callback(null,result)
            }
        })}catch(error){
            console.error(error);
        }
    },
    getPackageByUserId:(data,callback)=>{

        if (data.userid==undefined){
            return callback("please send data with correct attribute")
        }
        var queryStatment=`select * from subscriptions where userid=?`
        
        var values=[
            data.userid
    ]
        try{pool.query(queryStatment,values,(error,result)=>{
            if(error){
                return callback(error)
            }
            else{
                
                return callback(null,result)
            }
        })}catch(error){
            console.error(error);
        }
    },
    checkIfuserPackageStatus:async  (data,callback)=>{
      
        if (data.userid==undefined){
            return callback("please send data with correct attributeeeee")
        }
        var queryStatment=`select * from subscriptions where userid=?  and subscription_end_timestamp>now() and status=2 and postleft>0`
        
        var values=[
            data.userid
    ]
        try{
            await pool.query(queryStatment,values,(error,result)=>{
            if(error){
               
                return callback(error)
            }
            else{
                if(result.length>0){
                    return callback(null,result={...result[0] ,haspackage:"true"})
                }
                else{
                    var queryStatment=`select * from subscriptions where userid=? and status=1`
                  
                    var values=[
                        data.userid
                ]
                    try{
                         pool.query(queryStatment,values,(error,result)=>{
                             console.log(result)
                        if(error){
                            console.log(error)
                            return callback(error)
                        }
                        else{
                            if(result.length>0){
                                return callback(null,result={...result[0] ,haspackage:"pending"})
                            }
                            else{
                                return callback(null,result={...result[0],
                                subscriptionid: null,
                                userid: null,
                                planid: null,
                                subscription_start_timestamp: null,
                                subscription_end_timestamp: null,
                                postleft: null,
                                status: null ,
                                haspackage:"false"})
                            }
                            
                        }
                    })}catch(error){
                        console.error(error);
                    }
                }
                
            }
        })}catch(error){
            console.error(error);
        }
    },
    deletePackage:(data,callback)=>{
       
        if (data.subscriptionid==undefined){
            return callback("please send data with correct attribute")
        }
        var queryStatment=`delete from subscriptions  where subscriptionid=?`
        
        var values=[
            data.subscriptionid
    ]
        try{pool.query(queryStatment,values,(error,result)=>{
            if(error){
                return callback(error)
            }
            else{
               
                
                return callback(null,result)
            }
        })}catch(error){
            console.error(error);
        }
    },

}