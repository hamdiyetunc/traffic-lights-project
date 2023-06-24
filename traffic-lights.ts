class Car {
    brand: string;
    speed: number;
    stopped: boolean;
    slowedDown: boolean;
  
    constructor(b: string, s: number) {
      this.brand = b;
      this.speed = s;
      this.stopped = false;
      this.slowedDown = false;
    }
  
    stop() {
      this.stopped = true;
      console.log(`The ${this.brand} stopped.`);
    }
    slowDown() {
      this.slowedDown = true;
      console.log(`The ${this.brand} slowed down.`);
    }
    move() {
      this.stopped = false;
      this.slowedDown = false;
      console.log(`The ${this.brand} moved.`);
    }
  }
  
  class TrafficLightController {
    private readonly red: number = 0;
    private readonly yellow: number= 1;
    private readonly green: number = 2;
    // Array to store observer instances
    observers: Database[] = []; // You can create an interface for Observer instead
  
    // Method to register observers
    registerObserver(observer: Database) {
      this.observers.push(observer);
    }
  
    // Method to notify observers of changes
    notifyObservers(car: Car | null, light: string) {
      for (const observer of this.observers) {
        observer.onUpdate(car, light);
      }
    }
  
    simulateTrafficLights() {
      let i = 0;
      while (i < 3) {
        if (i === this.red) {
          console.log("Red light is on!");
          this.notifyObservers(null, "red");
        } else if (i === this.yellow) {
          console.log("Yellow light is on!");
          this.notifyObservers(null, "yellow");
        } else if (i === this.green) {
          console.log("Green light is on!");
          this.notifyObservers(null, "green");
        }
        i++;
      }
    }
  }
  
  class CarManager {
    static stopAllCars(cars: Car[]) {
      for (const car of cars) {
        car.stop();
      }
    }
    static moveAllCars(cars: Car[]) {
      for (const car of cars) {
        car.move();
      }
    }
    static slowDownAllCars(cars: Car[]) {
      for (const car of cars) {
        car.slowDown();
      }
    }
  }
  
  class Database {
    cars: Car[];
  
    constructor(cars: Car[]) {
      this.cars = cars;
    }
  
    onUpdate(car: Car | null, light?: string) {
      if (car) {
        if (car.stopped) {
          this.save(`The ${car.brand} stopped.`);
        } else if (car.slowedDown) {
          this.save(`The ${car.brand} slowed down.`);
        } else {
          this.save(`The ${car.brand} moved.`);
        }
      } else {
        this.save(`The ${light} light is on!`);
  
        if (light === "red") {
          CarManager.stopAllCars(this.cars);
        } else if (light === "green") {
          CarManager.moveAllCars(this.cars);
        } else if (light === "yellow") {
          CarManager.slowDownAllCars(this.cars);
        }
      }
    }
  
    save(message: string) {
      console.log(`Saving in the database: ${message}`);
    }
  }
  
  function main() {
    const ford = new Car("Ford", 100);
    const renault = new Car("Renault", 150);
    const fiat = new Car("Fiat", 120);
  
    console.log(ford.brand, ford.speed);
    console.log(renault.brand, renault.speed);
    console.log(fiat.brand, fiat.speed);
  
    // Array of cars
    const cars = [ford, renault, fiat];
  
    const lights = new TrafficLightController();
    const database = new Database(cars);
  
    // Register the database as an observer
    lights.registerObserver(database);
    lights.simulateTrafficLights();
  }
  
  main();