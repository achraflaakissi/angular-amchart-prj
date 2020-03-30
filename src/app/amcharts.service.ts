import * as am4core from '@amcharts/amcharts4/core';
import * as am4charts from '@amcharts/amcharts4/charts';
import * as am4maps from "@amcharts/amcharts4/maps";
// import * as am4maps from '@amcharts/amcharts4/maps';
import am4themes_animated from '@amcharts/amcharts4/themes/animated';
import am4themes_material from '@amcharts/amcharts4/themes/material';
import am4themes_moonrisekingdom from '@amcharts/amcharts4/themes/moonrisekingdom';
import am4themes_dark from "@amcharts/amcharts4/themes/dark";
import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AmchartsService {
  constructor(private amcharts: AmchartsService,private http: HttpClient) {
  }
  public am4core = am4core;
  public am4maps = am4maps;
  public am4charts = am4charts;
  // public am4maps = am4maps;
  public am4themes_animated = am4themes_animated;
  public am4themes_material = am4themes_material;
  public am4themes_dark = am4themes_dark;
  public am4themes_moonrisekingdom = am4themes_moonrisekingdom;

  getHeaders() {
    return new HttpHeaders({
      'Content-Type': 'application/json'
    });
  }

  getCovid19InfosByCountyId(countyId: string) {
    return this.http.get(`https://h4nqehfq70.execute-api.us-east-1.amazonaws.com/covid19/getcovid19infosbycountyid/${countyId}`, {
      headers: this.getHeaders()
    });
  }
}
