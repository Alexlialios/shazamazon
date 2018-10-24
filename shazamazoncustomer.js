var mysql =require('mysql');
var prompt = require ('prompt');
var connection = mysql.createConnection({
host: "localhost",
user: "root",
password: "bamazon"
});
//prompt setting up
var schema ={
    properties:{
    itemID:{
   message:'Enter the id for the item you desire to purchase',
   required : true },
   quantity:{
 message:" Enter how much you want to buy",
required: true
   }}};
   function showinventory() {
connection.query('SELECT ItemID, ProductName, Price FROM products', function(err, rows, fields) {
    if (err) throw err;
    console.log('Available products:');
    for(var i = 0; i < rows.length; i++) {
      console.log('Item ID: ' + rows[i].ItemID + '   Product Name: ' + rows[i].ProductName + '   Price: $' + rows[i].Price);
    }
    runPrompt();
  });
};
function runPrompt() {
    prompt.start();
    prompt.get(schema, function(err, result) {
      var orderedProductID = result.ItemID;
      var orderQuantity = result.quantity;
      processOrder(orderedProductID, orderQuantity);
    });
  }
  
  function processOrder(id, quantity) {
    connection.query('SELECT StockQuantity FROM products WHERE ItemID = ?', [id], function(err, rows, fields) {
      if(err) throw err;
  
      if(JSON.parse(rows[0].StockQuantity) >= quantity) {
        var adjQuantity = rows[0].StockQuantity - quantity;
        getPrice(id, quantity);
        updateStock(adjQuantity, id);
      } else {
        console.log('There is not enough stock to fulfill your request, please try again');
        connection.end();
      }
    });
  }
  
  function getPrice(id, quantity) {
    connection.query('SELECT Price FROM products WHERE ItemID = ?', [id], function(err, rows, fields) {
      if(err) throw err;
      var orderPrice = JSON.parse(rows[0].Price) * quantity;
      console.log('The total order cost is: $' + orderPrice);
    });
  }
  
  function updateStock(adjQuantity, id) {
    connection.query('UPDATE products SET stockQuantity = ? WHERE ItemID = ?', [adjQuantity, id], function(err, rows, fields) {
      if(err) throw err;
      console.log('Inventory has been updated');
      connection.end();
    });
  }

  showInventory();

        