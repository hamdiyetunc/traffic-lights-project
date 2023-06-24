var Car = /** @class */ (function () {
    function Car(b, s) {
        this.brand = b;
        this.speed = s;
        this.stopped = false;
        this.slowedDown = false;
    }
    Car.prototype.stop = function () {
        this.stopped = true;
        console.log("The ".concat(this.brand, " stopped."));
    };
    Car.prototype.slowDown = function () {
        this.slowedDown = true;
        console.log("The ".concat(this.brand, " slowed down."));
    };
    Car.prototype.move = function () {
        this.stopped = false;
        this.slowedDown = false;
        console.log("The ".concat(this.brand, " moved."));
    };
    return Car;
}());
var TrafficLightController = /** @class */ (function () {
    function TrafficLightController() {
        this.red = 0;
        this.yellow = 1;
        this.green = 2;
        // Array to store observer instances
        this.observers = []; // You can create an interface for Observer instead
    }
    // Method to register observers
    TrafficLightController.prototype.registerObserver = function (observer) {
        this.observers.push(observer);
    };
    // Method to notify observers of changes
    TrafficLightController.prototype.notifyObservers = function (car, light) {
        for (var _i = 0, _a = this.observers; _i < _a.length; _i++) {
            var observer = _a[_i];
            observer.onUpdate(car, light);
        }
    };
    TrafficLightController.prototype.simulateTrafficLights = function () {
        var i = 0;
        while (i < 3) {
            if (i === this.red) {
                console.log("Red light is on!");
                this.notifyObservers(null, "red");
            }
            else if (i === this.yellow) {
                console.log("Yellow light is on!");
                this.notifyObservers(null, "yellow");
            }
            else if (i === this.green) {
                console.log("Green light is on!");
                this.notifyObservers(null, "green");
            }
            i++;
        }
    };
    return TrafficLightController;
}());
var CarManager = /** @class */ (function () {
    function CarManager() {
    }
    CarManager.stopAllCars = function (cars) {
        for (var _i = 0, cars_1 = cars; _i < cars_1.length; _i++) {
            var car = cars_1[_i];
            car.stop();
        }
    };
    CarManager.moveAllCars = function (cars) {
        for (var _i = 0, cars_2 = cars; _i < cars_2.length; _i++) {
            var car = cars_2[_i];
            car.move();
        }
    };
    CarManager.slowDownAllCars = function (cars) {
        for (var _i = 0, cars_3 = cars; _i < cars_3.length; _i++) {
            var car = cars_3[_i];
            car.slowDown();
        }
    };
    return CarManager;
}());
var Database = /** @class */ (function () {
    function Database(cars) {
        this.cars = cars;
    }
    Database.prototype.onUpdate = function (car, light) {
        if (car) {
            if (car.stopped) {
                this.save("The ".concat(car.brand, " stopped."));
            }
            else if (car.slowedDown) {
                this.save("The ".concat(car.brand, " slowed down."));
            }
            else {
                this.save("The ".concat(car.brand, " moved."));
            }
        }
        else {
            this.save("The ".concat(light, " light is on!"));
            if (light === "red") {
                CarManager.stopAllCars(this.cars);
            }
            else if (light === "green") {
                CarManager.moveAllCars(this.cars);
            }
            else if (light === "yellow") {
                CarManager.slowDownAllCars(this.cars);
            }
        }
    };
    // Not yet completed
    Database.prototype.save = function (message) {
        console.log("Saving in the database: ".concat(message));
    };
    return Database;
}());
function main() {
    var ford = new Car("Ford", 100);
    var renault = new Car("Renault", 150);
    var fiat = new Car("Fiat", 120);
    console.log(ford.brand, ford.speed);
    console.log(renault.brand, renault.speed);
    console.log(fiat.brand, fiat.speed);
    // Array of cars
    var cars = [ford, renault, fiat];
    var lights = new TrafficLightController();
    var database = new Database(cars);
    // Register the database as an observer
    lights.registerObserver(database);
    lights.simulateTrafficLights();
}
main();
