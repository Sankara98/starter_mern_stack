const express = require('express');
const PollItem = require('../../Models/PollItem');
const router = express.Router();
const Poll = require('../../Models/Poll');

router.post('/', async(req, res) => {
    try{
        const title = req.body.title;
        const options = req.body.options;
        const poll = await new Poll({title : title}); 
    if(!poll) throw Error("something happened while creating poll");

    options.map( async(option) => {
        const pollItem = await new PollItem({description : option}); 
        if(!pollItem) throw Error("something happened while creating pollItem");
        poll.pollOptions.push(pollItem);
        const savedItem = await pollItem.save()
        if(!savedItem) throw Error("something happened while saving item");
    })

    const savedPoll = await poll.save();
    if(!savedPoll) throw Error("something happened while saving poll");
  

    res.status(200).json(savedPoll);
    }
    catch(err) {
        res.status(400).json({message: err.message});
    }
});


router.put('/', async(req, res) => {
    try{
        const poll = await Poll.findById(req.body._id);
        if(!poll) throw Error("something happened when getting poll");

        if(typeof req.body.title !== 'undefined') {
            poll.title = req.body.title;
        }

        if(typeof req.body.options !== 'undefined') {
            poll.options = req.body.options;
        }

        const savedPoll = await poll.save();
        if(!savedPoll) throw Error("something happened while saving poll");

   res.status(200).json(savedPoll);

    }
    catch(err){
        res.status(400).json({message: err.message})
    }
    
});
module.exports = router;