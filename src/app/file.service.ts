import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'; 
import { Observable } from 'rxjs/Observable';
import * as XLSX from 'xlsx';

@Injectable()
export class FileService {

    constructor(private http: HttpClient) {        
    }

    public getData(): Observable<any> {
        return this.http.get("assets/sample.xlsx", { responseType:'arraybuffer' });
    }
}