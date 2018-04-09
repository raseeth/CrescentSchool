import { Component, OnInit } from '@angular/core';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import * as XLSX from 'xlsx';
import { FileService } from './file.service';
import * as fs from 'file-system';
import { ButtonViewComponent } from './button.component';

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
      let newList = event.source.data.map(x => Object.assign({}, x));
      var index = newList.map(function(e) { return e.SNo; }).indexOf(event.data.SNo);
      if (index > -1) {
        newList.splice(index, 1);
      }
      this.updateFile(newList);
    } else {
      event.confirm.reject();
    }
  }

  onSaveConfirm(event) {
    if (window.confirm('Are you sure you want to save?')) {
      event.confirm.resolve(event.newData);
      let newList = event.source.data.map(x => Object.assign({}, x));
      var index = newList.map(function(e) { return e.SNo; }).indexOf(event.data.SNo);
      newList[index] = event.newData;
      this.updateFile(newList);
    } else {
      event.confirm.reject();
    }
  }

  onCreateConfirm(event) {
    if (window.confirm('Are you sure you want to create?')) {
      event.confirm.resolve(event.newData);
      event.newData.SNo = event.source.data.length + 1;
      let newList = event.source.data.map(x => Object.assign({}, x));
      newList.push(event.newData);
      this.updateFile(newList);
    } else {
      event.confirm.reject();
    }
  }

  updateFile(newData: any){
    newData.forEach(function(value){
      delete value.SNo; 
      delete value.button;      
    });
    this.fileService.postData(newData);
  }

  ngOnInit(){
    this.fileService.getData().subscribe(data => {
      var wb = XLSX.read(data, {type:"array"});
      var sheetData = XLSX.utils.sheet_to_json(wb.Sheets[wb.SheetNames[0]]);
      var loadData = [];
      sheetData.forEach(function(item, index){
        var d: LooseObject= {};
        d = item;
        d.SNo = index + 1;
        loadData.push(d);
      })
      var obj: LooseObject = {};
      if(loadData.length > 1){
          Object.keys(loadData[0]).forEach(function (key) {
            if(key != 'SNo')
            obj[key]={ title: key };
          });  

          obj.button = {
            title: 'SMS',
            type: 'custom',
            filter: false,
            editable: false,
            editor:{
              type: 'checkbox',
              config: {
                true: 'Yes',
                false: 'No',
              }
            },
            renderComponent: ButtonViewComponent,
            onComponentInitFunction(instance) {
              instance.save.subscribe(row => {
                alert(`${row.name} SMS Sent!`)
              });
            }
          }

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
      this.data = loadData;
     });
  }
}

interface LooseObject {
  [key: string]: any
}