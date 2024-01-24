import { Component, OnInit } from '@angular/core';
import { Ingredient } from './models/ingredient.entity';
import { ExternalApiService } from './services/external-api';
import { HttpClientModule } from '@angular/common/http';
@Component({
  standalone: true,
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [ExternalApiService],
  imports: [HttpClientModule],
})
export class AppComponent implements OnInit {
  ingredients: Ingredient[] = [];

  constructor(private externalApi: ExternalApiService) {}

  ngOnInit() {
    this.fetchPosts();
  }

  fetchPosts(): void {
    this.externalApi.getIngredient().subscribe((data) => {
      this.ingredients = data.meals
        .filter(
          (ingredient: Ingredient) =>
            ingredient.strIngredient !== null ||
            ingredient.strIngredient !== undefined
        )
        .map((data: Ingredient) => ({
          idIngredient: data.idIngredient,
          strDescription: data.strDescription?.slice(0, 300),
          strIngredient: data.strIngredient,
        }));
    });
  }
}
