/**
 * Splits a large class into two seperate hierarchies
 * which can be developed independently
 */

interface Pizza {
    Sauce: string;
    Toppings: string;
    Crust: string;
    Assemble(): void;
    Bake(): void;
    AddTopping(topping: string): void;
    AddSauce(sauce: string): void;
    MakeCrust(crust: string): void;
}

interface Resturant {
    pizza: Pizza;
    AddTopings?(): void;
    AddSauce?(): void;
    MakeCrust?(): void;
    Deliver(): void;
}

class BaseResturant implements Resturant {
    pizza: Pizza;
    constructor(pizza: Pizza) {
        this.pizza = pizza;
    }

    AddSauce(): void {}
    AddTopings(): void {}
    MakeCrust(): void {}
    
    Deliver(): void {
        this.MakeCrust();
        this.AddSauce();
        this.AddTopings();
        this.pizza.Assemble();
        this.pizza.Bake();
        console.log("Pizza is ready, start delivering...");
    }
}

class AmericanResturant extends BaseResturant {
    constructor(pizza: Pizza) {
        super(pizza);
    }
    AddTopings(): void {
        this.pizza.AddTopping(null);
    }

    AddSauce(): void {
        this.pizza.AddSauce("Oil");
    }

    MakeCrust(): void {
        this.pizza.MakeCrust("thin");
    }
}

class ItalianResturant extends BaseResturant {
    constructor(pizza: Pizza) {
        super(pizza);
    }
    
    AddTopings(): void {
        this.pizza.AddTopping("Everything");
    }

    AddSauce(): void {
        this.pizza.AddSauce("Meshed Potatos");
    }
    
    MakeCrust(): void {
        this.pizza.MakeCrust("Thick");
    }
}

class BasePizza implements Pizza {
    Sauce: string;
    Toppings: string;
    Crust: string;
    Assemble(): void {}

    AddTopping(topping: string): void {
        console.log(`Add Topping ${topping} to pizza`);
    }
    
    AddSauce(sauce: string): void {
        console.log(`Add Sauce ${sauce} to pizza`);
    }

    MakeCrust(crust: string): void {
        console.log(`Make crust ${crust}`);
    }

    Bake() {
        console.log("Baking pizza");
    }
}


class PepperoniPizza extends BasePizza {
    Assemble(): void {
        super.AddSauce("Ketchup")
        super.AddTopping("Pepperoni");
        super.Bake();
    }
}

class VeggiePizza extends BasePizza {
    Assemble(): void {
        super.AddSauce("Ketchup");
        super.AddTopping("Cheese");
        super.Bake();
    }
}


function main() {
    const AmericanPepperoni = new AmericanResturant(new PepperoniPizza());
    const AmericanVeggi = new AmericanResturant(new VeggiePizza());
    const ItalianPepperoni = new ItalianResturant(new PepperoniPizza());
    const ItalianVeggi = new ItalianResturant(new VeggiePizza());

    AmericanPepperoni.Deliver();
    AmericanVeggi.Deliver();
    ItalianPepperoni.Deliver();
    ItalianVeggi.Deliver();
}