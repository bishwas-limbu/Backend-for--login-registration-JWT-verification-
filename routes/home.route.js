import express from 'express';

const router = express.Router();// express method for router

router.get('/',(req,res) => {
    //res.send('HELLO FROM BISHWAS LIMBU.');
    // res.json({
    //     status : true,
    //     message : "HELLO FROM BISHWAS LIMBU.",
    // });

    res.status(200).json({
        status : true,
        message : "HELLO FROM BISHWAS LIMBU.",
    });

});


export default router;