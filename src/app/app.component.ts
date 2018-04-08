import { Component, OnInit  } from '@angular/core';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import * as XLSX from 'xlsx';
import { FileService } from './file.service';
import * as fs from 'file-system';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
  settings = {};
  data = [];
  constructor(private fileService: FileService) {
  }

  onDeleteConfirm(event) {
    if (window.confirm('Are you sure you want to delete?')) {
      event.confirm.resolve();
    } else {
      event.confirm.reject();
    }
  }

  onSaveConfirm(event) {
    if (window.confirm('Are you sure you want to save?')) {
      event.confirm.resolve(event.newData);
    } else {
      event.confirm.reject();
    }
  }

  onCreateConfirm(event) {
    if (window.confirm('Are you sure you want to create?')) {
      event.confirm.resolve(event.newData);
      this.updateFile(event.newData);
    } else {
      event.confirm.reject();
    }
  }

  updateFile(newData: any){
    var sheetData = this.data.concat(newData);
    var wb = XLSX.utils.book_new();
    var ws = XLSX.utils.json_to_sheet(sheetData);
    wb.Sheets[0] = ws;
    XLSX.utils.book_append_sheet(wb, ws);
    const content = XLSX.write(wb, { type: 'buffer', bookType: 'xlsx', bookSST: false });
    fs.writeFileSync("/assets/sample.xlsx", content, { encoding: 'binary' });
  }

  ngOnInit(){
    this.fileService.getData().subscribe(data => {
      var wb = XLSX.read(data, {type:"array"});
      var d = XLSX.utils.sheet_to_json(wb.Sheets[wb.SheetNames[0]]);
      var obj: LooseObject = {};
      if(d.length > 1){
          Object.keys(d[0]).forEach(function (key) {
            obj[key]={ title: key };
          });  

          this.settings = { 
            delete: {
              confirmDelete: true,
            },
            add: {
              confirmCreate: true,
            },
            edit: {
              confirmSave: true,
            },
            columns: obj 
          };
      }
      this.data= d;
     });
  }
}

interface LooseObject {
  [key: string]: any
}