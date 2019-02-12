var inquirer = require("inquirer");
var mysql = require("mysql");




var connection = mysql.createConnection({
    host: "localhost", 
    port: 3306, 
    user: "root", 
    password: "erunesuto123", 
    database: "bamazon"});

    connection.connect(function(err){
    if (err) {console.log(err);}
});


function start(){
inquirer.prompt([{
    name: "mview",
    type: "list",
    message: "Please select an option below.",
    choices: ["View Products for Sale", "View Low Inventory", "Add to Inventory", "Add New Product", "Exit"]
}]).then(function(response){

switch(response.mview){
    case "View Products for Sale":
    vProducts();
    break;

    case "View Low Inventory":
    vInventory();
    break;

    case "Add to Inventory":
    aInventory();
    break;

    case "Add New Product":
    aProduct();
    break;

    case "Exit":
    connection.end();
}

});
};

function vProducts(){
    connection.query("SELECT * FROM products", function(err, res){
        if (err){throw err}
        for (var i = 0; i < res.length; i++){
            console.log("\n-----------------------------------");
            console.log("\nID: " + res[i].ID + "\nProduct name: " + res[i].product_name + "\nPrice: " + res[i].price + "\nQuantity: " + res[i].stock_quantity);
           console.log ("\n---------------------------------");

      
 
        }
        nextAccion();
    });
};

function vInventory(){
    connection.query("SELECT * FROM products", function(err, res){
        if (err){throw err}
        for (var i = 0; i < res.length; i++){
            if (res[i].stock_quantity < 5){
                console.log("\n--------------------------------------------------------------")
                console.log("\nLow inventory products: \nID: " + res[i].ID + "\nProduct name: " + res[i].product_name + "\nQuantity: " + res[i].stock_quantity);
                console.log ("\n---------------------------------");
              
            }
            
        }
        nextAccion();
    });
};

function aInventory(){

    connection.query("SELECT product_name FROM products", function(err, res){
        if (err) {throw err}
        var items = [];
        for (var i = 0; i < res.length; i++){
         items.push(res[i].product_name);
        }

        inquirer.prompt([{
            name: "item",
            message: "Please select the item you would like to modify",
            type: "list",
            choices:items 
        },{
            name: "quantity",
            message: "How many items would you like to add to inventory?",
            type: "input",
        }]).then(function(response){
           connection.query("SELECT stock_quantity FROM products WHERE ?",{product_name:response.item},function(err, res){
               if(err){throw err}
               console.log(res[0].stock_quantity);
               var newStock = parseInt(res[0].stock_quantity) + parseInt(response.quantity);
                console.log(newStock);

                connection.query("UPDATE products SET stock_quantity = ? WHERE product_name = ?",[newStock, response.item], function(err, res){
                    if (err){throw err};
                    console.log("\n-------------------------------------------------------");
                    console.log(response.quantity + " new units added to " + response.item + " inventory!");
                    console.log("New inventory is: " +  newStock);
                    console.log("\n--------------------------------------");

                    nextAccion();
                });
                
           });
           
           


            
        });

    });

        
   
    
};

function aProduct(){
    inquirer.prompt([{
        name: "newname",
        type: "input",
        message: "Please provide the new product's name"
    },{
        name: "newdept",
        type: "list",
        message: "Please select a department for the new product",
        choices: ["Home & Kitchen", "Sports & Fitness", "Electronics", "Beauty & Personal Care", "Automotive Parts & Accesories", "Other"]
    },{
        name: "newprice",
        type: "input",
        message: "Please provide the new product's consumer price"
    }, {
        name: "newstock",
        type: "input",
        message: "Please provide an initial inventory for the new product"
    }]).then(function(response){
        console.log(response.newname);
        console.log(response.newdept);
        console.log(response.newprice);
        console.log(response.newstock);
        connection.query("INSERT INTO products SET ?",
        {
            product_name: response.newname,
            department_name: response.newdept,
            price: response.newprice,
            stock_quantity:response.newstock
        }
        , function(err, res){
            if (err) {throw err}
           console.log("\n--------------------------------------");
           console.log("New product added");
           console.log("\n--------------------------------------");
           nextAccion();

        });
        
    });
};


function nextAccion(){
    inquirer.prompt([{
               name: "nextAction",
               type: "list",
               message: "What would you like to do next?",
               choices: ["View Products for Sale", "View Low Inventory", "Add to Inventory", "Add New Product", "Exit"]
           }]).then(function(ans){
               
               if(ans.nextAction === "Exit"){
                connection.end();
                   
               }
               else {  start();  }
           });

};

start();