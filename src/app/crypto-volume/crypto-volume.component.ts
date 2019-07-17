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
  key: string = "9e9e0192bb7cb5e5f28fd1561d34e0d0"
  startDate: Date = new Date(2017,1,1);
  endDate: Date = new Date();
  configUrl: string = "https://api.nomics.com/v1/volume/history?key=" + this.key + "&start=" + this.startDate.toISOString().slice(0, 10) + "T00%3A00%3A00Z&end=" + this.endDate.toISOString().slice(0, 10) + "T00%3A00%3A00Z";
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

  getBarWidth(): void {
    if (this.test == '5px') {
      this.test = '2px';
      return;
    }
    this.test = '5px';
  }

}
