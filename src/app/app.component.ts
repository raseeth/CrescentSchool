import { Component, OnInit  } from '@angular/core';
import { Ng2SmartTableModule } from 'ng2-smart-table';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
  settings = {
    columns: {
      id: {
        title: 'ID'
      },
      name: {
        title: 'Full Name'
      },
      username: {
        title: 'User Name'
      },
      email: {
        title: 'Email'
      }
    }
  };
  data = [
    {
      id: 1,
      name: "Leanne Graham",
      username: "Bret",
      email: "Sincere@april.biz"
    },
    {
      id: 2,
      name: "Ervin Howell",
      username: "Antonette",
      email: "Shanna@melissa.tv"
    },
    
    // ... list of items
    
    {
      id: 11,
      name: "Nicholas DuBuque",
      username: "Nicholas.Stanton",
      email: "Rey.Padberg@rosamond.biz"
    }
  ];
  tableHeaders = ['Name', 'Name', 'Name', 'Name', 'Demand', 'Paid', 'Balance', 'Mobile', 'Address'];
 
  tableRowsWithId = [
    ['Azlan', 'Azlan', 'Azlan', 'Azlan', '2000', '1000', '1000', '90000000', 'abscdsdfdf'],
    ['Azlan', 'Azlan', 'Azlan', 'Azlan', '2000', '1000', '1000', '90000000', 'abscdsdfdf'],
    ['Azlan', 'Azlan', 'Azlan', 'Azlan', '2000', '1000', '1000', '90000000', 'abscdsdfdf']
  ];
  dataType = ['string','string','string','string', 'string', 'number', 'number', 'number', 'string', 'string'];
 
  constructor() {
  }
 
  ngOnInit() {
  }  
}
