export class Output {
    cars: CarOutput[];
    bench: string[];
    flag: FlagOutput;   
}

export class CarOutput {
    time: string;
    place: string;
    passangers: string[];
}

export class FlagOutput {
    newCar: boolean;
    needPlace: boolean;
    needTime: boolean;
}