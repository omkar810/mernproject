const mongoose = require('mongoose');

const DB = process.env.DATABASE;
mongoose.connect(DB, {
    useNewUrlParser: true,
    // useCreateIndex: true,
    // useUnifieldTopology: true,
    // useFindAndModify: false
}).then(() =>{
    console.log(`connection successful`);
}).catch((err) => console.log(`connection unsucceessful`));