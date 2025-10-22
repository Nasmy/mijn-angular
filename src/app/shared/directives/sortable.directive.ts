import {Directive, EventEmitter, Input, Output} from '@angular/core';

/*
type SortColumn<T> = {
   [P in keyof T]?: P
}
*/
export type SortColumn<T> = keyof { [x: string]: T };
// export type SortColumn = keyof Companies | '';

// export type SortColumn = keyof typeof constants;
export type SortDirection = 'asc' | 'desc' | '';
const rotate: {[key: string]: SortDirection} = { asc: 'desc', desc: '', '': 'asc' };

export interface SortEvent<T>{
  column: SortColumn<T>;
  direction: SortDirection;
}

@Directive({
  selector: 'th[sortable]',
  host: {
    '[class.asc]': 'direction === "asc"',
    '[class.desc]': 'direction === "desc"',
    '(click)': 'rotate()'
  }
})
export class NgbdSortableHeader<T> {

  @Input() sortable: SortColumn<T> = '';
  @Input() direction: SortDirection = '';
  @Output() sort = new EventEmitter<SortEvent<T>>();

  rotate() {
    this.direction = rotate[this.direction];
    this.sort.emit({column: this.sortable, direction: this.direction});
  }
}
