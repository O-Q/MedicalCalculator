import {
  Component,
  OnInit,
  Input,
  ChangeDetectionStrategy
} from '@angular/core';
import {
  IFormulaStorage,
  FormulaService
} from 'src/app/Services/database/formula.service';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search-item',
  templateUrl: './search-item.component.html',
  styleUrls: ['./search-item.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SearchItemComponent implements OnInit {
  @Input() formula: IFormulaStorage;
  isFavorite = new BehaviorSubject<boolean>(null);
  constructor(private formulaService: FormulaService, private router: Router) {}

  ngOnInit() {
    this.isFavorite.next(this.formulaService.isFavorite(this.formula.id));
  }
  onItemClick(formulaId: number) {
    this.formulaService.addRecent(this.formula);
    this.router.navigate(['formula', 'detail', formulaId]);
  }
  onFavoriteClick() {
    if (this.isFavorite.getValue()) {
      this.formulaService.removeFavorite(this.formula);
      this.isFavorite.next(false);
    } else {
      this.formulaService.addFavorite(this.formula);
      this.isFavorite.next(true);
    }
  }
}
