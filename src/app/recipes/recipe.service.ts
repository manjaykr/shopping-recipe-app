import { Injectable } from "@angular/core";
import { Subject } from 'rxjs';
import { Recipe } from "./recipe.model";
import { Ingredient } from "../shared/ingredient.model";
import { ShoppingListService } from "../shopping-list/shopping-list.service";

@Injectable()
export class RecipeService {
  recipeChanged = new Subject<Recipe[]>();
  private recipes: Recipe[] = [
    new Recipe(
      "A Test Recipe",
      "This is simply a test",
      "https://www.forksoverknives.com/wp-content/uploads/fly-images/36447/FOK_Coliflower8384-WP-688x387-c.jpg",
      [new Ingredient("Chicken", 4), new Ingredient("Egg", 2)]
    ),
    new Recipe(
      "Another Test Recipe",
      "This is simply a test",
      "https://www.forksoverknives.com/wp-content/uploads/fly-images/36447/FOK_Coliflower8384-WP-688x387-c.jpg",
      [new Ingredient("Buns", 1), new Ingredient("Orange", 2)]
    ),
  ];
  constructor(private slService: ShoppingListService) {}
  getRecipes() {
    return this.recipes.slice();
  }

  getRecipe(index: number) {
    return this.recipes[index];
  }

  addIngredientsToShoppingList(ingredient: Ingredient[]) {
    this.slService.addIngredients(ingredient);
  }

  addRecipe(recipe: Recipe) {
    this.recipes.push(recipe);
    this.recipeChanged.next(this.recipes.slice())
  }

  updateRecipe(index:number, recipe: Recipe) {
    this.recipes[index] = recipe;
    this.recipeChanged.next(this.recipes.slice())
  }

  deleteRecipe(index: number) {
    this.recipes.splice(index, 1);
    this.recipeChanged.next(this.recipes.slice());
  }
}
