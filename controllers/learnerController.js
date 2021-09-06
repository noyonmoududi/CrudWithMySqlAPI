const express = require('express');
const mysql = require('mysql');
var router = express.Router();


const mysqlConnection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root@#123',
    database: 'testdb',
    multipleStatements: true
});
mysqlConnection.connect((err) => {
    if (!err)
        console.log('DB connection succeded.');
    else
        console.log('DB connection failed \n Error : ' + JSON.stringify(err, undefined, 2));
});

router.get('/' , (req, res) => {
    mysqlConnection.query('SELECT * FROM learnerdetails', (err, rows, fields) => {
    if (!err)
    res.send(rows);
    else
    console.log(err);
    })
} );

router.get('/:id' , (req, res) => {
    mysqlConnection.query('SELECT * FROM learnerdetails WHERE id = ?',[req.params.id], (err, rows, fields) => {
    if (!err)
    res.send(rows);
    else
    console.log(err);
    })
} );

router.post('/', (req, res) => {
    let learner = req.body;
    var sql = "SET @learner_id = ?;SET @learner_name = ?;SET @_learner_address = ?;SET @_learner_phone = ?; SET @learner_email = ?; CALL learnerAddOrEdit(@learner_id,@learner_name,@_learner_address,@_learner_phone,@learner_email);";
    mysqlConnection.query(sql, [learner.id, learner.name,learner.address,learner.phone, learner.email], (err, rows, fields) => {
    if (!err)
    rows.forEach(element => {
    if(element.constructor == Array)
    res.send('New Learner ID : '+ element[0].id);
    });
    else
    console.log(err);
    })
});

router.put('/', (req, res) => {
    let learner = req.body;
    var sql = "SET @learner_id = ?;SET @learner_name = ?;SET @_learner_address = ?;SET @_learner_phone = ?; SET @learner_email = ?; CALL learnerAddOrEdit(@learner_id,@learner_name,@_learner_address,@_learner_phone,@learner_email);";
    mysqlConnection.query(sql, [learner.id, learner.name,learner.address,learner.phone, learner.email], (err, rows, fields) => {
    if (!err)
    res.send('Learner Details Updated Successfully');
    else
    console.log(err);
    })
});


router.delete('/:id', (req, res) => {
    mysqlConnection.query('DELETE FROM learnerdetails WHERE id = ?', [req.params.id], (err, rows, fields) => {
    if (!err)
    res.send('Learner Record deleted successfully.');
    else
    console.log(err);
    })
});

module.exports=router;