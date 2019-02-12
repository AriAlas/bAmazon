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

connection.query("SELECT * FROM products", function(err, res){
    if (err){throw err}
    for (var i = 0; i < res.length; i++){
        console.log("----------------------------------------------")
        console.log("Products available are: \nID: " + res[i].ID + "\nProduct name: " + res[i].product_name + "\nPrice: " + res[i].price);
    }
    inquirer.prompt([{
        name: "idrequest",
        type: "input",
        message: "Please provide the products ID you would like to buy"
    },{
        name: "Qproduct",
        type: "input",
        message: "How many products would you like to buy?"
    }]).then(function(response){
        connection.query("SELECT stock_quantity FROM products WHERE ?", {ID: response.idrequest},function(err, res){
            if(err){throw err}
            // console.log(res[0].stock_quantity);
            // console.log(response.Qproduct);
            if(res[0].stock_quantity > response.Qproduct){
               
                // console.log(res[0].stock_quantity);
                // console.log(response.Qproduct);
                connection.query("UPDATE products SET stock_quantity = ? WHERE ID = ?",[res[0].stock_quantity-response.Qproduct, response.idrequest], function(err, res){
                    if (err){throw err}
                    // console.log(res);
                connection.query("SELECT price FROM products WHERE ?",{ID: response.idrequest},function(err, res){
                    if(err){throw err}
                    console.log("------------------------------------");
                    console.log("\nYour total is: " + res[0].price + ". \nThank you for shopping at Amazon.com");
                   console.log("\n-----------------------------------------");
                   nextAccion();
                });
               
                });
            }
            else if (res[0].stock_quantity < response.Qproduct){
                console.log("\n-----------------------------------")
                console.log("\nInsufficient quantity");
                console.log("\n-------------------------------------")
                nextAccion();
            }
            
           
           
        });
    });
    
});

};

function nextAccion(){
     inquirer.prompt([{
                name: "nextAction",
                type: "list",
                message: "What would you like to do next?",
                choices: ["Purchase another product", "Exit"]
            }]).then(function(ans){
                
                if(ans.nextAction === "Purchase another product"){
                    start();
                }
                else if(ans.nextAction === "Exit"){
                    connection.end();
                }
            });

};


start();




