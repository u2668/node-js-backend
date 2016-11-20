import {ICar} from "./Car";
import {IBench} from "./Bench";

export interface IMatchResult {
    cars: ICar[];
    benches: IBench[];
}