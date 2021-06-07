/**
 * The builder pattern is helpful when:
 * 1. Your objects contain many different parts
 * 2. You want to hide the creation from main
 */

interface Meal {
    dessert: string;
    side: string;
    drink: string;
    main: string;
    getDessert(): string;
    setDessert(dessert: string): Meal;
    setSide(side: string): Meal;
    getSide(): string;
    setDrink(drink: string): Meal;
    getDrink(): string;
    setMain(main: string): Meal;
    getMain(): string;
}

interface MealBuilder {
    meal: Meal;
    makeSide(): MealBuilder;
    makeDrink(): MealBuilder;
    makeMain(): MealBuilder;
    makeDessert(): MealBuilder;
    makeMeal(): Meal;
    getMeal(): Meal;
}

class BurgerMeal implements Meal {
    dessert: string;
    side: string;
    drink: string;
    main: string;

    setDessert(dessert: string): Meal {
        this.dessert = dessert;
        return this;
    }
    getDessert(): string {
        return this.dessert;
    }

    setSide(side: string): Meal {
        this.side = side;
        return this;
    }
    getSide(): string {
        return this.side;
    }

    setDrink(drink: string): Meal {
        this.drink = drink;
        return this;
    }
    getDrink(): string {
        return this.drink;
    }

    setMain(main: string): Meal {
        this.main = main;
        return this;
    }
    getMain(): string {
        return this.main;
    }
}

/**
 * BurgerMealBuilder is just one type of meal builder
 * Which can be easily extend with other type of meal builders
 * Such as steak meal builder, veg meal builder etc.
 */
class BurgerMealBuilder implements MealBuilder {
    meal: Meal;
    constructor() {
        this.meal = new BurgerMeal();
        return this;
    }
    makeSide(): MealBuilder {
        this.meal.setSide("French Fries");
        return this;
    }
    makeDrink(): MealBuilder {
        this.meal.setDrink("Pepsi");
        return this;
    }
    makeMain(): MealBuilder {
        this.meal.setMain("Chesse Burger");
        return this;
    }
    makeDessert(): MealBuilder {
        this.meal.setDessert("Bronie");
        return this;
    }
    getMeal(): Meal {
        return this.meal;
    }
    makeMeal(): Meal {
        return this.makeDrink()
            .makeSide()
            .makeMain()
            .makeDessert()
            .getMeal();
    }
}

function main(): Meal {
    let mealBuilder = new BurgerMealBuilder();
    let meal = mealBuilder.makeMeal();
    return meal;
}