import { Component, OnInit } from '@angular/core';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ThrowStmt } from '@angular/compiler';

@Component({
  selector: 'app-crypto-volume',
  templateUrl: './crypto-volume.component.html',
  styleUrls: ['./crypto-volume.component.css']
})
export class CryptoVolumeComponent implements OnInit {
  data: any;
  dataVolume: number[] = [];
  highest: number = 0;
  test: string = "5px";
  configUrl: string = 'https://api.nomics.com/v1/volume/history?key=2018-09-demo-dont-deploy-b69315e440beb145&start=2017-01-01T00%3A00%3A00Z&end=2019-04-14T00%3A00%3A00Z';
  constructor(private http: HttpClient) { }

  ngOnInit() {
  }

  async getUserAsync() 
  {
    let response = await fetch(this.configUrl);
    this.data = await response.json()
  }

  getData() {
    this.getUserAsync().then(data => {
      this.getHighest();
    }); 
  }

  getHighest() {
    let convertor: number;
    this.highest = 0;
    this.dataVolume = this.data.map(data => {
      convertor = data.volume / 1000;
      if (convertor > this.highest) {
        this.highest = convertor;
      }
      return convertor;
    });
    console.log(this.dataVolume);
  }

}
