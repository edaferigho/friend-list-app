const express = require('express');
const Friends = require('./model/FriendList');
const FriendList = require('./model/FriendList')
const app = express();

//Middleware
app.use(express.json())


app.get('/',(req,res)=>{
    res.send('Welcome to Express!')

})
app.get('/friends',(req,res)=>{
    res.json(FriendList)
})
app.post('/friends',(req,res)=>{
    const reqBody = req.body
    let friend = {id:reqBody.id,name:reqBody.name,age:reqBody.age,phone:reqBody.phone}
    FriendList.push(friend)
    res.status(200).json(FriendList)
})
app.put('/friend/:id',(req,res)=>{
    const id = req.params.id
    const reqBody = req.body
    let foundFriend = FriendList.find((friend)=>{
        return friend.id===Number(id)
    })
    if(!foundFriend){
        res.send('Friend Record not found')
    }
    else{
        foundFriend.id = reqBody.id
        foundFriend.name = reqBody.name
        foundFriend.age = reqBody.age
        foundFriend.phone = reqBody.phone
     }

    let index = FriendList.indexOf(foundFriend)
    FriendList[index]=foundFriend
    res.status(200).send(FriendList) 
})
app.delete('/friend/:id',(req,res)=>{
    const id = req.params.id
    const reqBody = req.body
    let foundFriend = FriendList.find((friend)=>{
        return friend.id===Number(id)
    })
    if(!foundFriend){
        res.send('Friend record not found')
    }
    else{
        let index = FriendList.indexOf(foundFriend)
        FriendList.splice(index,1)
        res.send(FriendList)
    }
})
app.listen(9000,()=>{
    console.log('Express server is running at 127.0.0.1:9000');
})