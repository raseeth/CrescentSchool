import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';

import { Ng2SmartTableModule } from 'ng2-smart-table';
import { FileService } from './file.service';
import { HttpClientModule } from '@angular/common/http';
import { ButtonViewComponent } from './button.component';

@NgModule({
  declarations: [
    AppComponent,
    ButtonViewComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    Ng2SmartTableModule,
    HttpClientModule
  ],
  providers: [FileService],
  bootstrap: [AppComponent],
  entryComponents: [
    ButtonViewComponent
  ]
})
export class AppModule { }
