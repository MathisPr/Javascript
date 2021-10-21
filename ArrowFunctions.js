//classic way
const sayHalloclassic = function() {
    console.log("Hallo world! classic");
};

//with arrow function
const sayHalloArrow = () => {
    console.log("Hallo World! Arrow");
};

//arrow function short version
const sayHalloArrowShort = () => console.log("Hallo World! Arrow Short");

//arrow function with objects - need to be put in ()
const sayHalloArrowObj = () => ({msg: "test"});


//arrow with single parameter, does not need ()
const sayHalloArrowsgparam = name => console.log(`Hello ${name}`);

//arrow with multiple parameters
const sayHalloArrowmpparam = (firstname, lastname) => console.log(`Hello ${firstname} ${lastname}`)

//arrow as callbacks


sayHalloclassic();

sayHalloArrow();

sayHalloArrowShort();

console.log(sayHalloArrowObj());

sayHalloArrowsgparam('Peter');

sayHalloArrowmpparam('Peter', 'Quill')