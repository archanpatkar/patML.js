// Linear Regression using Functions
let  myline = LinearRegression([ [5,10] , [10,20] , [20,40] ]);

console.log(myline);
console.log(predict(myline,30));
console.log(predict(myline,40));
console.log(predict(myline,80));


// Linear Model as Object
let m1 = new LinearModel([ [5,10] , [10,20] , [20,40] ]);

m1.train();

console.log(m1.predict(30));
console.log(m1.predict(40));
console.log(m1.predict(80));

m1.add([100,200]);

m1.train();

console.log(m1.predict(30));
console.log(m1.predict(40));
console.log(m1.predict(80));


// Linear Regression with Stohcastic Gradient Descent using Functions
let  myline = LinearGradientDescent( [ [5,10] , [10,20] , [20,40] ] , 0.01);

console.log(myline);
console.log(predict(myline,30));
console.log(predict(myline,40));
console.log(predict(myline,80));
