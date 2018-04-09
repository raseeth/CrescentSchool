import { Component, OnInit, Input, Output, EventEmitter  } from '@angular/core';
import { Ng2SmartTableModule, ViewCell } from 'ng2-smart-table';

@Component({
    selector: 'button-view',
    template: `
      <button (click)="onClick()">Send SMS</button>
    `,
  })
  export class ButtonViewComponent implements ViewCell, OnInit {
    renderValue: string;
  
    @Input() value: string | number;
    @Input() rowData: any;
  
    @Output() save: EventEmitter<any> = new EventEmitter();
  
    ngOnInit() {
      this.renderValue = this.value.toString().toUpperCase();
    }
  
    onClick() {
      this.save.emit(this.rowData);
    }
  }