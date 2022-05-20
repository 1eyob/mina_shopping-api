const pool=require('../dbConnection')
 
module.exports={
    getCoversation:(data,callback)=>{
        if(data.userid==undefined){
            return callback("please send with correct parameter")
        }
        var querystatment=`SELECT * FROM conversation WHERE ? in (senderid,reciverid)`
        var value=[
            data.userid
        ]
        pool.query(querystatment,value,(error,result)=>{
            if(error){
                return callback(error)
            }
            else{
                return callback(null,result)
            }
        })
    },
    getAllMessageByConversationId:(data,callback)=>{
        if(data.conversationid==undefined){
            return callback("please send with correct parameter")
        }
        var querystatment=`SELECT * FROM message WHERE conversationid=?`
        var value=[
            data.conversationid
        ]
        pool.query(querystatment,value,(error,result)=>{
            if(error){
                return callback(error)
            }
            else{
                return callback(null,result)
            }
        })
    },
    sendMessage:(data,callback)=>{
        if(data.conversationid==undefined || data.sender==undefined ||data.text==undefined){
            return callback("please send with correct parameter")
        }
        var querystatment=`insert into message set conversationid=?,sender=?,text=?`
        var value=[
            data.conversationid,
            data.sender,
            data.text
        ]
        pool.query(querystatment,value,(error,result)=>{
            if(error){
                return callback(error)
            }
            else{
                return callback(null,result)
            }
        })
    },
    checkCoversationBetweenTwoUsers:(data,callback)=>{
        if(data.sender==undefined || data.reciever==undefined){
            return callback("please send with correct parameter")
        }
        var querystatment=`SELECT * FROM conversation WHERE ? in (senderid,reciverid) and ? in (senderid,reciverid);`
        var value=[
            data.sender,
            data.reciever
        ]
        pool.query(querystatment,value,(error,result)=>{
            if(error){
                return callback(error)
            }
            else{
                if(result=="" || result ==[] ||result==null){
                    return callback("coversation doesnt exist")
                }
                return callback(null,result)
            }
        })
    },
    createCoversation:(data,callback)=>{
        if(data.sender==undefined || data.reciever==undefined){
            return callback("please send with correct parameter")
        }
        var querystatment=`SELECT * FROM conversation WHERE ? in (senderid,reciverid) and ? in (senderid,reciverid);`
        var value=[
            data.sender,
            data.reciever
        ]
        pool.query(querystatment,value,(error,result)=>{
            if(error){
                return callback(error)
            }
            else{
                if(result=="" || result ==[] ||result==null){
                    var querystatment=`Insert into conversation set senderid=?,reciverid=?`
                    var value=[
                        data.sender,
                        data.reciever
                    ]
                    pool.query(querystatment,value,(error,result)=>{
                        if(error){
                            return callback(error)
                        }
                        else{
                            var querystatment=`SELECT * FROM conversation WHERE ? in (senderid,reciverid) and ? in (senderid,reciverid);`
                            var value=[
                                data.sender,
                                data.reciever
                            ]
                            pool.query(querystatment,value,(error,result)=>{
                                if(error){
                                    return callback(error)
                                }
                                else{return callback(null,result)}
                            })
                        }
                    })
             }
             else{
                return callback(null,result)
             }
                
            }
        })
        
    },

}