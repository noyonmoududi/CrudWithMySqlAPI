const express = require('express');
const learnercontroller = require("./controllers/learnercontroller");

const app = express();
app.use(express.json());


//application route
app.use("/learners",learnercontroller);
//

app.listen(3000, () => console.log('Express server is runnig at port no : 3000'));