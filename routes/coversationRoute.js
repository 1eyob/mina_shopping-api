const { GetConversation, SendMessage, GetMessageByConversationId, CheckIfConversationExistBetweenTwoUsers, CreateConversation } = require('../controllers/conversationController')


const router=require('express').Router()


router.post('/get/:userid',GetConversation)
router.post('/sendmessage',SendMessage)
router.post('/message/:conversationid',GetMessageByConversationId)

router.post('/checkconversation',CheckIfConversationExistBetweenTwoUsers)

router.post('/createconversation',CreateConversation)


module.exports=router