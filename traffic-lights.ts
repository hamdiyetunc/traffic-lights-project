type EventData = { event: string; data: any };
type NewType = string;

class Cars {
    private fiat= '';
    private ford= '';
    private audi= '';
    trafficLamp: string;

    constructor({ trafficLamp }: { trafficLamp: NewType; }){
        this.trafficLamp = trafficLamp;
    }

    trafficLampChange(trafficLampp){
        const red = -1; 
        const yellow = 0; 
        const green = 1; 

        if(trafficLampp == 1)
        console.log('you can contine')

        if(trafficLampp == 0){
            console.log('you need to slow down')

        }else{
            console.log('you need to stop')
        }
    }
}

class EventEmmiter {
    protected subscribers: Function[] = []

    subscribe(cb: Function) {
        this.subscribers.push(cb)
    }
    unsubscribe(cb: Function) {
        this.subscribers.filter((fn ) => fn !== cb) 
    }
}

const car1 = new Cars({ trafficLamp: 'green' });
console.log(car1)

// git push