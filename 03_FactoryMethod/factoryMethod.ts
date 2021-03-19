/**
 * Toys Factory as base factory
 * Toy Dog Factory extends from Toys Factory
 * Toy Cat Factory extends from Toys Factory
 */
 interface ToyFactory {
    createToy(type: string): Toy;
}
class ToyDogFactory implements ToyFactory {
    createToy(type: string): Toy {
        switch (type) {
            case "labrador":
                return new ToyDog("white", "cotton")
            case "golden retriever":
                    return new ToyDog("golden", "fur")
            default:
                return null;
        }
    }
}

class ToyCatFactory implements ToyFactory {
    createToy(type: string): Toy {
        switch (type) {
            case "snowshoe":
                return new ToyCat("black&white", "fiber")
            case "calico":
                    return new ToyCat("brown&white", "fur")
            default:
                return null;
        }
    }
}


/**
 * Toy is base class
 * Toy Dog extends from Toy
 * Toy Cat extends from Toy
 */
interface Toy {
    color: string;
    material: string;
    talk(): void;
}

class ToyDog implements Toy {
    color: string;
    material: string;
    constructor(color: string, material: string) {
        this.color = color;
        this.material = material;
    }
    talk() {
        console.log(`I'm a ${this.color} dog, made by ${this.material}`);
    }
}

class ToyCat implements Toy {
    color: string;
    material: string;
    constructor(color: string, material: string) {
        this.color = color;
        this.material = material;
    }
    talk() {
        console.log(`I'm a ${this.color} cat, made by ${this.material}`);
    }
}
 /**
  * The key point of factory method is
  * to use base factory and abstract "factory method"
  * when calling the instantiation function
  * The encapsulation/bundle the different types of factory
  * avoid the possibility of changing the old code
  * and easier to design a new type of factory
  */

function main() {
    let factory: ToyFactory;
    let dog, cat: Toy;
    factory = new ToyDogFactory();
    dog = factory.createToy("labrador");
    dog.talk();

    factory = new ToyCatFactory();
    cat = factory.createToy("snowshoe");
    cat.talk();
}