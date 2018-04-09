import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'; 
import { Observable } from 'rxjs/Observable';
import * as XLSX from 'xlsx';

@Injectable()
export class FileService {

    constructor(private http: HttpClient) {        
    }

    public postData(data: any){
        console.log(data);
        const req = this.http.post('http://localhost:6064', data, 
                        {
                            headers: {
                                'Content-Type': 'application/json; charset=utf-8'
                            }
        
                        }).subscribe(
                            res => {
                            console.log(res);
                            },
                            err => {
                            console.log("Error occured");
                            }
                        );
    }

    public getData(): Observable<any> {
        return this.http.get("assets/data.csv", { responseType:'arraybuffer' });
    }
}