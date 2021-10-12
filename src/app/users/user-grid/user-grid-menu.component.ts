import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { ICellRendererParams } from 'ag-grid-community';

@Component({
  selector: 'user-grid-menu',
  templateUrl: './user-grid-menu.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserGridMenuComponent implements ICellRendererAngularComp {
  private name: string;
  private params: ICellRendererParams;

  public agInit(params: ICellRendererParams): void {
    this.params = params;
    this.name = this.params.data && this.params.data.firstName;
  }

  public refresh(): boolean {
    return false;
  }

  public actionClicked(action: string): void {
    alert(`${action} clicked for ${this.name}`);
  }
}
