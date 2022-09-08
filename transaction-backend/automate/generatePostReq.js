var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost/transaction_app/";

MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    var dbo = db.db("transaction_app");
    var myobj = [];

    for (let i = 0;i < 100; i++){
        
        let transaction = { 
            debitAmount: (Math.floor(Math.random() * 100)+1), 
            creditAmount: (Math.floor(Math.random() * 100)+1),
            sender: Math.random().toString(36).slice(2, 7),
            reciever: Math.random().toString(36).slice(2, 7), 
            date: new Date(new Date().toISOString()), __v:0
            }

        myobj.push(transaction);
    }

    dbo.collection("transactions").insertMany(myobj, function(err, res) {
        if (err) throw err;
        console.log("Number of documents inserted: " + res.insertedCount);
        db.close();
    });
});