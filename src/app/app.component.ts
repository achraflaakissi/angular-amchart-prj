import { Component, AfterViewInit } from '@angular/core';
import am4geodata_usaLow from "@amcharts/amcharts4-geodata/usaLow";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
import am4themes_moonrisekingdom from '@amcharts/amcharts4/themes/moonrisekingdom';
import { AmchartsService } from './amcharts.service';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.css' ]
})
export class AppComponent implements AfterViewInit {
  // Amchart map
  public chart2: any;
  public chart: any;
  public chartCovidCountyStateUsa: any;
  public chartConfirmedCasesCountyAndState: any;
  public xAxis:any;
  // Choose the name of the variable to display : deaths, confirmedCases, recovered
  public nameOfColumnUsed = "deathLastDay";
  public position = 1;
  //this array containe am4maps.MapPolygonSeries() data
  public anotherData=[{state: "WV", name: "West Virginia", lat: 38.65029333704605, long: -80.6106457816211},{state: "FL", name: "Florida", lat: 27.703325000000003, long: -81.37102500000002},{state: "IL", name: "Illinois", lat: 40.06989085861169, long: -89.20034142993887},{state: "MN", name: "Minnesota", lat: 46.802231250000006, long: -94.65823124999999},{state: "MD", name: "Maryland", lat: 39.065589274165134, long: -76.8019339531121},{state: "RI", name: "Rhode Island", lat: 41.704087346409345, long: -71.59939469154985},{state: "ID", name: "Idaho", lat: 43.92281250000001, long: -115.27938750000001},{state: "NH", name: "New Hampshire", lat: 43.689622389942585, long: -71.57829558496896},{state: "NC", name: "North Carolina", lat: 35.55672820495737, long: -79.40705740327942},{state: "VT", name: "Vermont", lat: 44.07540785899888, long: -72.66750316981812},{state: "CT", name: "Connecticut", lat: 41.624289712913885, long: -72.72542821845086},{state: "DE", name: "Delaware", lat: 38.8285, long: -75.41120000000001},{state: "NM", name: "New Mexico", lat: 34.42193993093767, long: -106.11079342465919},{state: "CA", name: "California", lat: 35.4919625, long: -117.8628625},{state: "NJ", name: "New Jersey", lat: 39.757, long: -74.71719999999999},{state: "WI", name: "Wisconsin", lat: 44.64077977601623, long: -90.02939880964333},{state: "OR", name: "Oregon", lat: 43.940020730200565, long: -120.54336158854386},{state: "NE", name: "Nebraska", lat: 41.5012, long: -99.6877},{state: "PA", name: "Pennsylvania", lat: 40.874958836167615, long: -77.79810036258893},{state: "WA", name: "Washington", lat: 47.37424493824208, long: -120.41554847328322},{state: "LA", name: "Louisiana", lat: 31.5161625, long: -92.54366250000001},{state: "GA", name: "Georgia", lat: 32.65819156359583, long: -83.45726084615215},{state: "AL", name: "Alabama", lat: 32.644800000000004, long: -86.70795},{state: "UT", name: "Utah", lat: 38.874475, long: -110.919975},{state: "OH", name: "Ohio", lat: 40.2117, long: -83.0438},{state: "TX", name: "Texas", lat: 31.506144425522375, long: -99.3578530826763},{state: "CO", name: "Colorado", lat: 39.0009, long: -105.52975},{state: "SC", name: "South Carolina", lat: 33.915763206928354, long: -80.89846408805207},{state: "OK", name: "Oklahoma", lat: 35.59077880511146, long: -97.51190031656273},{state: "TN", name: "Tennessee", lat: 35.8405, long: -86.03130000000002},{state: "WY", name: "Wyoming", lat: 43.001000000000005, long: -107.53655},{state: "HI", name: "Hawaii", lat: 19.611732920495225, long: -155.51080045194962},{state: "ND", name: "North Dakota", lat: 47.468, long: -99.4584},{state: "KY", name: "Kentucky", lat: 37.53084772410103, long: -85.28584247533693},{state: "ME", name: "Maine", lat: 45.401665821887484, long: -69.24266248781653},{state: "NY", name: "New York", lat: 43.44015000000001, long: -75.06724999999999},{state: "NV", name: "Nevada", lat: 39.3550469928408, long: -116.65183421409768},{state: "AK", name: "Alaska", lat: 65.63740000000001, long: -154.14289999999997},{state: "MI", name: "Michigan", lat: 43.7481, long: -84.816},{state: "AR", name: "Arkansas", lat: 34.9047487608521, long: -92.44391404912884},{state: "MS", name: "Mississippi", lat: 32.765799790735194, long: -89.67131253937114},{state: "MO", name: "Missouri", lat: 38.30865, long: -92.44375},{state: "MT", name: "Montana", lat: 47.03107741567746, long: -109.62614745339614},{state: "KS", name: "Kansas", lat: 38.5012, long: -98.32130000000001},{state: "IN", name: "Indiana", lat: 39.9097329101727, long: -86.27741847998969},{state: "SD", name: "South Dakota", lat: 44.44071907835582, long: -100.2221812129443},{state: "MA", name: "Massachusetts", lat: 42.27128387714697, long: -71.84136352904703},{state: "VA", name: "Virginia", lat: 37.52773886599295, long: -78.87133545447753},{state: "DC", name: "District of Columbia", lat: 38.938366733515025, long: -77.03088811514615},{state: "IA", name: "Iowa", lat: 42.08851091103813, long: -93.49527635486156},{state: "AZ", name: "Arizona", lat: 34.29094941189948, long: -111.65984527670338}];
  //config of array content
  public configArrayNames = {
      state: "stateAbr",
      latitude: "stateLat",
      longitude: "stateLon",
      city: "stateName",
      count: this.nameOfColumnUsed
  }
  public regionalSeries: any = {};
  public currentSeries: any = {};
  zoomOut: any;
  polygonSeries: any;
  constructor(private amcharts: AmchartsService) {
  }
   ngAfterViewInit() {
    this.am4coreOperations();
    this.codivCountyStateUsa();
    this.confirmedCasesCountyAndState();
  }
  // ------ CasesCountyAndState Code Start -------
  confirmedCasesCountyAndState(){
    const state_cases =[];
    const county_cases = [];
    this.amcharts.getCovid19InfosByCountyId("01029").subscribe(data=>{
      console.log('data ==>',data);
      const currentDate = new Date();
      let culDate;
      for(let i=0;i<data['stateData'].confirmed.length;i++){
        culDate = new Date();
        culDate.setDate(currentDate.getDate() -(10-(i+1)));
        state_cases.push({'date': culDate,'value':data['stateData'].confirmed[i]});
      }
      for(let i=0;i<data['confirmed'].length;i++){
        culDate = new Date();
        culDate.setDate(currentDate.getDate() -(10-(i+1)));
        county_cases.push({'date':culDate,'value':data['confirmed'][i]});
      }
      console.log("state_cases ==>",state_cases);
      console.log("county_cases ==>",county_cases);
    
      this.amcharts.am4core.useTheme(am4themes_moonrisekingdom);
      this.amcharts.am4core.useTheme(am4themes_animated);
      let max_county =0; 
      let min_county =1000000000000;
  
      
      let max_state=0
      let min_state=1000000000000
      county_cases.forEach(element =>{
        if(element.value<min_county){
            min_county=element.value;
        }
        if(element.value>max_county){
            max_county=element.value;
        }
      });
  
      state_cases.forEach(element =>{
        if(element.value<min_state){
            min_state=element.value;
        }
        if(element.value>max_state){
            max_state=element.value;
        }
      });
      let min=min_county
      let max=max_state
      let min_break=max_county+(0.1*max_county)
      let max_break=min_state-(0.1*min_state)
  
        
      // Create chart instance
  
      this.chartConfirmedCasesCountyAndState = this.amcharts.am4core.create("confirmedCasesCountyAndState", this.amcharts.am4charts.XYChart);
  
      // Create axes
      const dateAxis = this.chartConfirmedCasesCountyAndState.xAxes.push(new this.amcharts.am4charts.DateAxis());
      const valueAxis = this.chartConfirmedCasesCountyAndState.yAxes.push(new this.amcharts.am4charts.ValueAxis());
  
      valueAxis.min = 0;
      valueAxis.max = max+5;
      valueAxis.strictMinMax = true;
      valueAxis.renderer.minGridDistance = 30;
      // Create value axis break
      const axisBreak = valueAxis.axisBreaks.create();
      axisBreak.startValue = min_break;
      axisBreak.endValue = max_break;
      // axisBreak.breakSize = 0.2;
      // fixed axis break
      const d = (axisBreak.endValue - axisBreak.startValue) / (valueAxis.max - valueAxis.min);
      axisBreak.breakSize = 0.05 * (1 - d) / d; // 0.05 means that the break will take 5% of the total value axis height
      const hoverState = axisBreak.states.create("hover");
      hoverState.properties.breakSize = 2;
      hoverState.properties.opacity = 0.1;
      hoverState.transitionDuration = 1500;
      axisBreak.defaultState.transitionDuration = 1000;
  
      this.createSeriesForConfirmedCasesCountyAndState("value"+"county_cases", "County cases ",county_cases);
      this.createSeriesForConfirmedCasesCountyAndState("value"+"state_cases", "State cases " ,state_cases);
  
      this.chartConfirmedCasesCountyAndState.legend = new this.amcharts.am4charts.Legend();
      this.chartConfirmedCasesCountyAndState.legend.position = "right";
      this.chartConfirmedCasesCountyAndState.legend.scrollable = true;
      this.chartConfirmedCasesCountyAndState.legend.itemContainers.template.events.on("over", (event)=> {
          this.processOver(event.target.dataItem.dataContext);
        })
  
        this.chartConfirmedCasesCountyAndState.legend.itemContainers.template.events.on("out", (event)=> {
          this.processOut(event.target.dataItem.dataContext);
        });
    });
  }

  createSeriesForConfirmedCasesCountyAndState(s, name,items) {
    const series = this.chartConfirmedCasesCountyAndState.series.push(new this.amcharts.am4charts.LineSeries());
    series.dataFields.valueY = "value" + s;
    series.dataFields.dateX = "date";
    let col="#e60000";
    if(s=="valuecounty_cases")
    {
      col =  "#00ff7c";
    }
    series.stroke =  this.amcharts.am4core.color(col);
    series.name = name;

    const segment = series.segments.template;
    segment.interactionsEnabled = true;

    const hoverState = segment.states.create("hover");
    hoverState.properties.strokeWidth = 3;

    const dimmed = segment.states.create("dimmed");

    segment.events.on("over", (event)=> {
      this.processOver(event.target.parent.parent.parent);
    });

    segment.events.on("out", (event)=> {
      this.processOut(event.target.parent.parent.parent);
    });

    const data = [];
    items.forEach(element => {
      let dataItem = { date: new Date(element.date) };
      dataItem["value" + s] = element.value;
      data.push(dataItem);
    });

    series.data = data;
    return series;
  }

  processOver(hoveredSeries) {
    hoveredSeries.toFront();

    hoveredSeries.segments.each((segment)=> {
      segment.setState("hover");
    })

    this.chartConfirmedCasesCountyAndState.series.each((series)=> {
      if (series != hoveredSeries) {
        series['segments'].each((segment)=> {
          segment.setState("dimmed");
        })
        series.bulletsContainer.setState("dimmed");
      }
    });
  }

  processOut(hoveredSeries) {
    this.chartConfirmedCasesCountyAndState.series.each((series)=> {
      series['segments'].each((segment)=> {
        segment.setState("default");
      })
      series.bulletsContainer.setState("default");
    });
  }
  // ******* End Code CasesCountyAndState ********
  // ------ CountyStateUsa Code Start -------
  codivCountyStateUsa(){
    try{
      this.amcharts.am4core.useTheme(am4themes_moonrisekingdom);
      this.amcharts.am4core.useTheme(am4themes_animated);
      let max =0; 
      let min =1000000000000; 
      const dataItems = [
        {
            category: 'County',
            first: 13,
            second: 426,
            third: 87,
        },
        {
            category: 'State',
            first: 102,
            second: 2045,
            third: 368
        },
        {
            category: 'USA',
            first: 432,
            second: 5071,
            third: 1792
        }
      ];
      dataItems.forEach(element =>{
        if(element.second>max){
            max=element.second;
        }
        if(element.first<min){
            min=element.first;
        }
      });
      this.chartCovidCountyStateUsa=this.amcharts.am4core.create('covidCountyStateUsa', this.amcharts.am4charts.XYChart)
      this.chartCovidCountyStateUsa.colors.step = 2;
      
      this.chartCovidCountyStateUsa.legend = new this.amcharts.am4charts.Legend()
      this.chartCovidCountyStateUsa.legend.position = 'top'
      this.chartCovidCountyStateUsa.legend.paddingBottom = 20
      this.chartCovidCountyStateUsa.legend.labels.template.maxWidth = 95
      
      this.xAxis = this.chartCovidCountyStateUsa.xAxes.push(new this.amcharts.am4charts.CategoryAxis())
      this.xAxis.dataFields.category = 'category'
      this.xAxis.renderer.cellStartLocation = 0.1
      this.xAxis.renderer.cellEndLocation = 0.9
      this.xAxis.renderer.grid.template.location = 0;
      
      const yAxis = this.chartCovidCountyStateUsa.yAxes.push(new this.amcharts.am4charts.ValueAxis());
      yAxis.min = 0;
      yAxis.max = max+5;
      yAxis.strictMinMax = true;
      yAxis.renderer.minGridDistance = 30;
      // Create value axis break
      const axisBreak = yAxis.axisBreaks.create();
      axisBreak.startValue = min+(0.1*min);
      axisBreak.endValue = max-100;
      // axisBreak.breakSize = 0.2;
      // fixed axis break
      const d = (axisBreak.endValue - axisBreak.startValue) / (yAxis.max - yAxis.min);
      axisBreak.breakSize = 0.05 * (1 - d) / d; // 0.05 means that the break will take 5% of the total value axis height
      const hoverState = axisBreak.states.create("hover");
      hoverState.properties.breakSize = 2;
      hoverState.properties.opacity = 0.1;
      hoverState.transitionDuration = 1500;
      axisBreak.defaultState.transitionDuration = 1000;
  
    this.chartCovidCountyStateUsa.data = dataItems;
    this.createSeriesForCovidCountyStateUsa('first', 'Deaths');
    this.createSeriesForCovidCountyStateUsa('second', 'Confirmed');
    //createSeries('third', 'Recovered');
    }
    catch(err){
      console.log("err ==>",err);
    }
  
  
  }

  createSeriesForCovidCountyStateUsa(value, name) {
    const series = this.chartCovidCountyStateUsa.series.push(new this.amcharts.am4charts.ColumnSeries())
    series.dataFields.valueY = value
    series.dataFields.categoryX = 'category'
    series.name = name
    const that = this;
    series.events.on("hidden", that.arrangeColumnsForCovidCountyStateUsa.bind(that));
    series.events.on("shown", that.arrangeColumnsForCovidCountyStateUsa.bind(that));
    series.columns.template.tooltipText = "[bold][/]\n[font-size:14px]{valueY}";
    const bullet = series.bullets.push(new this.amcharts.am4charts.LabelBullet())
    bullet.interactionsEnabled = false
    bullet.dy = 30;
    bullet.label.text = '{valueY}'
    bullet.label.fill = this.amcharts.am4core.color('#ffffff')
    
    return series;
  }
  
  arrangeColumnsForCovidCountyStateUsa() {
  
    const series = this.chartCovidCountyStateUsa.series.getIndex(0);

    const w = 1 - this.xAxis.renderer.cellStartLocation - (1 - this.xAxis.renderer.cellEndLocation);
      if (series.dataItems.length > 1) {
        const x0 = this.xAxis.getX(series.dataItems.getIndex(0), "categoryX");
        const x1 = this.xAxis.getX(series.dataItems.getIndex(1), "categoryX");
        const delta = ((x1 - x0) / this.chartCovidCountyStateUsa.series.length) * w;
          if (this.amcharts.am4core.isNumber(delta)) {
            const middle = this.chartCovidCountyStateUsa.series.length / 2;

            let newIndex = 0;
              this.chartCovidCountyStateUsa.series.each((series) => {
                  if (!series.isHidden && !series.isHiding) {
                      series.dummyData = newIndex;
                      newIndex++;
                  }
                  else {
                      series.dummyData = this.chartCovidCountyStateUsa.series.indexOf(series);
                  }
              })
              const visibleCount = newIndex;
              const newMiddle = visibleCount / 2;

              this.chartCovidCountyStateUsa.series.each((series) => {
                  let trueIndex = this.chartCovidCountyStateUsa.series.indexOf(series);
                  let newIndex = series.dummyData;

                  const dx = (newIndex - trueIndex + middle - newMiddle) * delta

                  series.animate({ property: "dx", to: dx }, series.interpolationDuration, series.interpolationEasing);
                  series.bulletsContainer.animate({ property: "dx", to: dx }, series.interpolationDuration, series.interpolationEasing);
              })
          }
      }
  }
  
  // ******* End Code CountyStateUsa ********
  // ------ CodivMap Code Start -------
  am4coreOperations() {
    this.regionalSeries={};
      // Themes begin
      this.amcharts.am4core.useTheme(am4themes_animated);
      // Themes end

      // Create map instance
      this.chart = this.amcharts.am4core.create("chartdiv", this.amcharts.am4maps.MapChart);
      this.chart.maxZoomLevel = 64;

      // Set map definition
      this.chart.geodata = am4geodata_usaLow;

      // Set projection
      this.chart.projection = new this.amcharts.am4maps.projections.AlbersUsa();

      // Add button
      this.zoomOut = this.chart.tooltipContainer.createChild(this.amcharts.am4core.ZoomOutButton);
      this.zoomOut.align = "right";
      this.zoomOut.valign = "top";
      this.zoomOut.margin(20, 20, 20, 20);
      this.zoomOut.events.on("hit", () => {
          if (this.currentSeries) {
              this.currentSeries.hide();
          }
          this.chart.goHome();
          this.zoomOut.hide();
          this.currentSeries = this.regionalSeries.US.series;
          this.currentSeries.show();
      });
      this.zoomOut.hide();


      // Create map polygon series
      this.polygonSeries = this.chart.series.push(new this.amcharts.am4maps.MapPolygonSeries());
      this.polygonSeries.useGeodata = true;
      this.polygonSeries.calculateVisualCenter = true;
      const that = this;

      // Configure series
      let polygonTemplate = this.polygonSeries.mapPolygons.template;
      polygonTemplate.tooltipText = "{name}";
      polygonTemplate.fill = this.amcharts.am4core.color("#67b7dc");
      this.chart.events.on("ready", that.loadStores.bind(that));      
      return
  }
  loadStores() {
    const dt = [{ "stateId": "01", "stateName": "Alabama", "stateAbr": "AL", "stateLat": 32.7396323, "stateLon": -86.8434593, "deathLastDay": 481, "confirmedLastDay": 40170 }, { "stateId": "02", "stateName": "Alaska", "stateAbr": "AK", "stateLat": 63.347356, "stateLon": -152.8397334, "deathLastDay": 287, "confirmedLastDay": 26043 }, { "stateId": "04", "stateName": "Arizona", "stateAbr": "AZ", "stateLat": 34.2039355, "stateLon": -111.6063565, "deathLastDay": 263, "confirmedLastDay": 4567 }, { "stateId": "05", "stateName": "Arkansas", "stateAbr": "AR", "stateLat": 34.8955256, "stateLon": -92.4446262, "deathLastDay": 295, "confirmedLastDay": 47907 }, { "stateId": "06", "stateName": "California", "stateAbr": "CA", "stateLat": 37.1551773, "stateLon": -119.5434183, "deathLastDay": 55, "confirmedLastDay": 9114 }, { "stateId": "08", "stateName": "Colorado", "stateAbr": "CO", "stateLat": 38.9938482, "stateLon": -105.5083165, "deathLastDay": 407, "confirmedLastDay": 49922 }, { "stateId": "09", "stateName": "Connecticut", "stateAbr": "CT", "stateLat": 41.5798637, "stateLon": -72.7466572, "deathLastDay": 386, "confirmedLastDay": 31934 }, { "stateId": "10", "stateName": "Delaware", "stateAbr": "DE", "stateLat": 38.9985661, "stateLon": -75.441644, "deathLastDay": 989, "confirmedLastDay": 31646 }, { "stateId": "11", "stateName": "District of Columbia", "stateAbr": "DC", "stateLat": 38.9042474, "stateLon": -77.0165167, "deathLastDay": 778, "confirmedLastDay": 32165 }, { "stateId": "12", "stateName": "Florida", "stateAbr": "FL", "stateLat": 28.4574302, "stateLon": -82.4091477, "deathLastDay": 460, "confirmedLastDay": 23542 }, { "stateId": "13", "stateName": "Georgia", "stateAbr": "GA", "stateLat": 32.6295789, "stateLon": -83.4235109, "deathLastDay": 862, "confirmedLastDay": 16302 }, { "stateId": "15", "stateName": "Hawaii", "stateAbr": "HI", "stateLat": 19.5977643, "stateLon": -155.5024434, "deathLastDay": 519, "confirmedLastDay": 4132 }, { "stateId": "16", "stateName": "Idaho", "stateAbr": "ID", "stateLat": 44.3484222, "stateLon": -114.5588538, "deathLastDay": 819, "confirmedLastDay": 41534 }, { "stateId": "17", "stateName": "Illinois", "stateAbr": "IL", "stateLat": 40.1028754, "stateLon": -89.1526108, "deathLastDay": 875, "confirmedLastDay": 13609 }, { "stateId": "18", "stateName": "Indiana", "stateAbr": "IN", "stateLat": 39.9013136, "stateLon": -86.2919129, "deathLastDay": 279, "confirmedLastDay": 45660 }, { "stateId": "19", "stateName": "Iowa", "stateAbr": "IA", "stateLat": 42.0700243, "stateLon": -93.4933473, "deathLastDay": 637, "confirmedLastDay": 23979 }, { "stateId": "20", "stateName": "Kansas", "stateAbr": "KS", "stateLat": 38.4985464, "stateLon": -98.3834298, "deathLastDay": 189, "confirmedLastDay": 48042 }, { "stateId": "21", "stateName": "Kentucky", "stateAbr": "KY", "stateLat": 37.5336844, "stateLon": -85.2929801, "deathLastDay": 615, "confirmedLastDay": 42929 }, { "stateId": "22", "stateName": "Louisiana", "stateAbr": "LA", "stateLat": 30.8634368, "stateLon": -91.7987173, "deathLastDay": 723, "confirmedLastDay": 44588 }, { "stateId": "23", "stateName": "Maine", "stateAbr": "ME", "stateLat": 45.4092843, "stateLon": -68.666616, "deathLastDay": 436, "confirmedLastDay": 5744 }, { "stateId": "24", "stateName": "Maryland", "stateAbr": "MD", "stateLat": 38.9466584, "stateLon": -76.6744939, "deathLastDay": 279, "confirmedLastDay": 19186 }, { "stateId": "25", "stateName": "Massachusetts", "stateAbr": "MA", "stateLat": 42.1565196, "stateLon": -71.4895915, "deathLastDay": 217, "confirmedLastDay": 49685 }, { "stateId": "26", "stateName": "Michigan", "stateAbr": "MI", "stateLat": 44.8441768, "stateLon": -85.6604907, "deathLastDay": 466, "confirmedLastDay": 5968 }, { "stateId": "27", "stateName": "Minnesota", "stateAbr": "MN", "stateLat": 46.3159573, "stateLon": -94.1996043, "deathLastDay": 902, "confirmedLastDay": 35479 }, { "stateId": "28", "stateName": "Mississippi", "stateAbr": "MS", "stateLat": 32.6864714, "stateLon": -89.6561377, "deathLastDay": 114, "confirmedLastDay": 48102 }, { "stateId": "29", "stateName": "Missouri", "stateAbr": "MO", "stateLat": 38.35075, "stateLon": -92.4567826, "deathLastDay": 837, "confirmedLastDay": 21015 }, { "stateId": "30", "stateName": "Montana", "stateAbr": "MT", "stateLat": 47.0511771, "stateLon": -109.6348174, "deathLastDay": 650, "confirmedLastDay": 43221 }, { "stateId": "31", "stateName": "Nebraska", "stateAbr": "NE", "stateLat": 41.5433053, "stateLon": -99.8118646, "deathLastDay": 61, "confirmedLastDay": 12362 }, { "stateId": "32", "stateName": "Nevada", "stateAbr": "NV", "stateLat": 39.3310928, "stateLon": -116.6151469, "deathLastDay": 118, "confirmedLastDay": 2440 }, { "stateId": "33", "stateName": "New Hampshire", "stateAbr": "NH", "stateLat": 43.6726907, "stateLon": -71.5843145, "deathLastDay": 508, "confirmedLastDay": 43420 }, { "stateId": "34", "stateName": "New Jersey", "stateAbr": "NJ", "stateLat": 40.1072744, "stateLon": -74.6652012, "deathLastDay": 419, "confirmedLastDay": 1790 }, { "stateId": "35", "stateName": "New Mexico", "stateAbr": "NM", "stateLat": 34.4346843, "stateLon": -106.1316181, "deathLastDay": 755, "confirmedLastDay": 46129 }, { "stateId": "36", "stateName": "New York", "stateAbr": "NY", "stateLat": 42.9133974, "stateLon": -75.5962723, "deathLastDay": 443, "confirmedLastDay": 13706 }, { "stateId": "37", "stateName": "North Carolina", "stateAbr": "NC", "stateLat": 35.53971, "stateLon": -79.1308636, "deathLastDay": 935, "confirmedLastDay": 34903 }, { "stateId": "38", "stateName": "North Dakota", "stateAbr": "ND", "stateLat": 47.442174, "stateLon": -100.4608258, "deathLastDay": 146, "confirmedLastDay": 9667 }, { "stateId": "39", "stateName": "Ohio", "stateAbr": "OH", "stateLat": 40.4149297, "stateLon": -82.7119975, "deathLastDay": 631, "confirmedLastDay": 37423 }, { "stateId": "40", "stateName": "Oklahoma", "stateAbr": "OK", "stateLat": 35.5900512, "stateLon": -97.4868149, "deathLastDay": 389, "confirmedLastDay": 2842 }, { "stateId": "41", "stateName": "Oregon", "stateAbr": "OR", "stateLat": 43.9717125, "stateLon": -120.6229578, "deathLastDay": 885, "confirmedLastDay": 4715 }, { "stateId": "42", "stateName": "Pennsylvania", "stateAbr": "PA", "stateLat": 40.9046013, "stateLon": -77.8275298, "deathLastDay": 744, "confirmedLastDay": 14264 }, { "stateId": "44", "stateName": "Rhode Island", "stateAbr": "RI", "stateLat": 41.5974187, "stateLon": -71.5272723, "deathLastDay": 990, "confirmedLastDay": 1109 }, { "stateId": "45", "stateName": "South Carolina", "stateAbr": "SC", "stateLat": 33.8741776, "stateLon": -80.8542639, "deathLastDay": 667, "confirmedLastDay": 45661 }, { "stateId": "46", "stateName": "South Dakota", "stateAbr": "SD", "stateLat": 44.4467957, "stateLon": -100.2381762, "deathLastDay": 610, "confirmedLastDay": 49168 }, { "stateId": "47", "stateName": "Tennessee", "stateAbr": "TN", "stateLat": 35.860803, "stateLon": -86.3499896, "deathLastDay": 773, "confirmedLastDay": 41852 }, { "stateId": "48", "stateName": "Texas", "stateAbr": "TX", "stateLat": 31.4347032, "stateLon": -99.2818238, "deathLastDay": 685, "confirmedLastDay": 47964 }, { "stateId": "49", "stateName": "Utah", "stateAbr": "UT", "stateLat": 39.3349925, "stateLon": -111.6563326, "deathLastDay": 228, "confirmedLastDay": 28564 }, { "stateId": "50", "stateName": "Vermont", "stateAbr": "VT", "stateLat": 44.0685773, "stateLon": -72.6691839, "deathLastDay": 16, "confirmedLastDay": 23205 }, { "stateId": "51", "stateName": "Virginia", "stateAbr": "VA", "stateLat": 37.5222512, "stateLon": -78.6681938, "deathLastDay": 452, "confirmedLastDay": 40850 }, { "stateId": "53", "stateName": "Washington", "stateAbr": "WA", "stateLat": 47.4073238, "stateLon": -120.5757999, "deathLastDay": 44, "confirmedLastDay": 43121 }, { "stateId": "54", "stateName": "West Virginia", "stateAbr": "WV", "stateLat": 38.6472854, "stateLon": -80.6183274, "deathLastDay": 935, "confirmedLastDay": 30436 }, { "stateId": "55", "stateName": "Wisconsin", "stateAbr": "WI", "stateLat": 44.6309071, "stateLon": -89.7093916, "deathLastDay": 245, "confirmedLastDay": 11259 }, { "stateId": "56", "stateName": "Wyoming", "stateAbr": "WY", "stateLat": 42.9896591, "stateLon": -107.5443922, "deathLastDay": 51, "confirmedLastDay": 13348 }, { "stateId": "60", "stateName": "American Samoa", "stateAbr": "AS", "stateLat": -14.267159, "stateLon": -170.6682674, "deathLastDay": 135, "confirmedLastDay": 36742 }, { "stateId": "66", "stateName": "Guam", "stateAbr": "GU", "stateLat": 13.4417451, "stateLon": 144.7719021, "deathLastDay": 168, "confirmedLastDay": 5417 }, { "stateId": "69", "stateName": "Commonwealth of the Northern Mariana Islands", "stateAbr": "MP", "stateLat": 14.9367835, "stateLon": 145.601021, "deathLastDay": 939, "confirmedLastDay": 12279 }, { "stateId": "72", "stateName": "Puerto Rico", "stateAbr": "PR", "stateLat": 18.217648, "stateLon": -66.4107992, "deathLastDay": 286, "confirmedLastDay": 20715 }, { "stateId": "78", "stateName": "United States Virgin Islands", "stateAbr": "VI", "stateLat": 18.326748, "stateLon": -64.9712508, "deathLastDay": 212, "confirmedLastDay": 25884 }];
    this.setupStores(dt);
  }
  changeDisplay(type) {
      this.nameOfColumnUsed = type;
      this.configArrayNames.count = this.nameOfColumnUsed;
      this.am4coreOperations();
  }

  createSeries(heatfield) {

      const polygonTemplate = this.polygonSeries.mapPolygons.template;
      polygonTemplate.tooltipText = "{name}";
      polygonTemplate.fill = this.chart.colors.getIndex(0);

      const series = this.chart.series.push(new this.amcharts.am4maps.MapImageSeries());
      series.dataFields.value = heatfield;

      const template = series.mapImages.template;
      template.verticalCenter = "middle";
      template.horizontalCenter = "middle";
      template.propertyFields.latitude = "lat";
      template.propertyFields.longitude = "long";
      //template.tooltipText = "{name}:\n[bold]{stores} "+nameOfColumnUsed+"[/]";

      if (this.nameOfColumnUsed == 'deathLastDay') {
          template.tooltipText = "Deaths in {name}: [bold]{stores} ";
      }
      if (this.nameOfColumnUsed == 'confirmedLastDay') {
          template.tooltipText = "Confirmed cases in {name}: [bold]{stores} ";
      }


      //template.tooltipText = "{name}:\n[bold]{stores} "+nameOfColumnUsed+"[/]";

      const circle: any = template.createChild(this.amcharts.am4core.Circle);
      circle.radius = 10;
      circle.fillOpacity = 0.7;
      circle.verticalCenter = "middle";
      circle.horizontalCenter = "middle";
      circle.nonScaling = true;

      const label: any = template.createChild(this.amcharts.am4core.Label);
      label.text = "{stores}";
      label.fill = this.amcharts.am4core.color("#fff");
      label.verticalCenter = "middle";
      label.horizontalCenter = "middle";
      label.nonScaling = true;

      const heat = series.heatRules.push({
          target: circle,
          property: "radius",
          min: 10,
          max: 30
      });

      // Set up drill-down
      series.mapImages.template.events.on("hit", (ev) => {

          // Determine what we've clicked on
          const data: any = ev.target.dataItem.dataContext;

          // No id? Individual store - nothing to drill down to further
          if (!data.target) {
              return;
          }

          // Create actual series if it hasn't been yet created
          if (!this.regionalSeries[data.target].series) {
              this.regionalSeries[data.target].series = this.createSeries("count");
              this.regionalSeries[data.target].series.data = data.markerData;
          }

          // Hide current series
          if (this.currentSeries) {
              this.currentSeries.hide();
          }

          // Control zoom
          if (data.type == "state") {
            const statePolygon = this.polygonSeries.getPolygonById("US-" + data.state);
              this.chart.zoomToMapObject(statePolygon);
          }
          else if (data.type == "city") {
              this.chart.zoomToGeoPoint({
                  latitude: data.lat,
                  longitude: data.long
              }, 64, true);
          }
          this.zoomOut.show();

          // Show new targert series
          this.currentSeries = this.regionalSeries[data.target].series;
          this.currentSeries.show();
      });

      return series;
  }
  
  setupStores(data) {  
    // Init country-level series
    this.regionalSeries.US = {
      markerData: [],
      series: this.createSeries("stores")
    };
    // Set current series
    this.currentSeries = this.regionalSeries.US.series;
    // Process data
    this.amcharts.am4core.array.each(data, (store)=> {
      // Get store data
      store = {
        state: store[this.configArrayNames.state],
        long: this.amcharts.am4core.type.toNumber(store[this.configArrayNames.longitude]),
        lat: this.amcharts.am4core.type.toNumber(store[this.configArrayNames.latitude]),
        location: store[this.configArrayNames[this.configArrayNames.city]],
        city: store[this.configArrayNames.city],
        count: this.amcharts.am4core.type.toNumber(store[this.configArrayNames.count])
      };

      // Process state-level data
      if (this.regionalSeries[store['state']] == undefined) {
        const statePolygon = this.polygonSeries.getPolygonById("US-" + store['state']);
        if (statePolygon) {
          // Add state data
          this.regionalSeries[store['state']] = {
            target: store['state'],
            type: "state",
            name: statePolygon.dataItem.dataContext.name,
            count: store['count'],
            stores: store['count'],
            lat: statePolygon.visualLatitude,
            long: statePolygon.visualLongitude,
            state: store['state'],
            markerData: []
          };
          this.regionalSeries.US.markerData.push(this.regionalSeries[store['state']]);

        }
        else {
          // State not found
          return;
        }
      }
      else {
        this.regionalSeries[store['state']].stores++;
        this.regionalSeries[store['state']].count += store['count'];
      }

      // Process city-level data
      if (this.regionalSeries[store['city']] == undefined) {
        this.regionalSeries[store['city']] = {
          target: store['city'],
          type: "city",
          name: store['city'],
          count: store['count'],
          stores: store['count'],
          lat: store['lat'],
          long: store['long'],
          state: store['state'],
          markerData: []
        };
        this.regionalSeries[store['state']].markerData.push(this.regionalSeries[store['city']]);
      }
      else {
        this.regionalSeries[store['city']].stores++;
        this.regionalSeries[store['city']].count += store['count'];
      }

      // Process individual store
      this.regionalSeries[store['city']].markerData.push({
        name: store['location'],
        count: store['count'],
        stores: store['count'],
        lat: store['lat'],
        long: store['long'],
        state: store['state']
      });

    });
    this.regionalSeries.US.series.data = this.regionalSeries.US.markerData;
  }
  // ******* End Code CodivMap ********
}
