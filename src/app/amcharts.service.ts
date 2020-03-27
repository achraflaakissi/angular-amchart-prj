import * as am4core from '@amcharts/amcharts4/core';
import * as am4charts from '@amcharts/amcharts4/charts';
import * as am4maps from "@amcharts/amcharts4/maps";
// import * as am4maps from '@amcharts/amcharts4/maps';
import am4themes_animated from '@amcharts/amcharts4/themes/animated';
import am4themes_material from '@amcharts/amcharts4/themes/material';
import am4themes_moonrisekingdom from '@amcharts/amcharts4/themes/moonrisekingdom';
import am4themes_dark from "@amcharts/amcharts4/themes/dark";
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AmchartsService {
  constructor(private amcharts: AmchartsService) {
  }
  public am4core = am4core;
  public am4maps = am4maps;
  public am4charts = am4charts;
  // public am4maps = am4maps;
  public am4themes_animated = am4themes_animated;
  public am4themes_material = am4themes_material;
  public am4themes_dark = am4themes_dark;
  public am4themes_moonrisekingdom = am4themes_moonrisekingdom;
}
