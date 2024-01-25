import { Component, OnInit } from '@angular/core';
import { Ingredient } from './models/ingredient.entity';
import { ExternalApiService } from './services/external-api';
import { HttpClientModule } from '@angular/common/http';

import { tap } from 'rxjs/operators';

import { MatPaginatorModule } from '@angular/material/paginator';

@Component({
  standalone: true, // necessaire pour fetch les données
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [],
  imports: [HttpClientModule, MatPaginatorModule],
})
export class AppComponent implements OnInit {
  ingredients: Ingredient[] = [];
  pageSize = 10;  // nombre d'elements par page
  pageIndex = 0; // index de debut
  displayedData: Ingredient[] = []; // Ajout de la variable displayedData

  constructor(private externalApi: ExternalApiService) {}

  ngOnInit(): void {
    this.fetchPosts();
  }

  // Pagination event
  onPageChange(event: any) {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize; 
    this.updateDataSource();
  }

  // Mettez à jour votre source de données en fonction de la page actuelle
  updateDataSource() {
    // Logique pour extraire les données de la page actuelle
    const startIndex = this.pageIndex * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.displayedData = this.ingredients.slice(startIndex, endIndex);
  }

  /**
   * Chargement des données utilisant les services
   */
  fetchPosts(): void {
    this.externalApi
      .getIngredient()
      .pipe(
        tap((data) => {
          this.ingredients = data.meals
            .filter(
              (ingredient: Ingredient) =>
                ingredient.strDescription !== null &&
                ingredient.strDescription !== '' &&
                ingredient.strIngredient !== undefined
            )
            .map((data: Ingredient) => ({
              idIngredient: data.idIngredient,
              strDescription: data.strDescription?.slice(0, 300),
              strIngredient: data.strIngredient,
            }));
          // Après avoir chargé les données, mettez à jour la source de données pour la pagination
          this.updateDataSource();
        })
      )
      .subscribe();
  }
}
