/**
 * The interpreter pattern is normally ignored and almost never used
 * It can convert one representation of data into another
 */
enum Unit {
    Gallon = 1,
    liter,
    Mile,
    Kilometer
}


interface Interpreter {
    Convert(input: string): string;
}

class UnitConverter implements Interpreter {
    sign: number;
    int: number;
    dec: number;
    unit: Unit;
    rate: Map<Unit, number>;
    text: Map<Unit, string>;
    constructor() {
        
    }

    initRate() {
        this.rate = new Map();
        this.rate.set(Unit.Gallon, 3.78541);
        this.rate.set(Unit.liter, 0.219969);
        this.rate.set(Unit.Mile, 1.60934);
        this.rate.set(Unit.Kilometer, 0.62137);


        this.text = new Map();
        this.text.set(Unit.Gallon, "liters");
        this.text.set(Unit.liter, "gallons");
        this.text.set(Unit.Mile, "kilometers");
        this.text.set(Unit.Kilometer, "miles");
    }

    parse(input: string) {
        const re = /^([+-])?(\d+)(\.\d+)?\s(\w+)$/;
        let data = input.match(re) || [];
        if (data[0] === "-") {
            this.sign = -1;
        }
        if (data[1]) {
            this.int = parseInt(data[1], 10);
        }
        if (data[2]) {
            this.dec = parseInt(data[2], 10);
        }
        let unit = String.prototype.toLowerCase.call(data[3])
        switch (unit) {
            case "gallons":
                this.unit = Unit.Gallon;
                break;
            case "liters":
                this.unit = Unit.liter;
                break;
            case "miles":
                this.unit = Unit.Mile;
                break;
            case "kilometers":
                this.unit = Unit.Kilometer;
                break;
            default:
                this.unit = Unit.Gallon;
        }
    }

    Convert(input: string): string {
        this.parse(input);
        const rate = this.rate.get(this.unit) || 1;
        const val = this.sign * parseInt(`${this.int}.${this.dec}`, 10) * rate;
        const unit = this.text.get(this.unit) || "";
        return `${val} ${unit}`;
    }
}

function main() {
    const conv = new UnitConverter();
    const a = "3 gallons";
    console.log(conv.Convert(a));
}