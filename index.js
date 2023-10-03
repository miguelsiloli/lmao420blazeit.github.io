/**
 * ---------------------------------------
 * This demo was created using amCharts 4.
 * 
 * For more information visit:
 * https://www.amcharts.com/
 * 
 * Documentation is available at:
 * https://www.amcharts.com/docs/v4/
 * ---------------------------------------
 */

// Themes begin
am4core.useTheme(am4themes_animated);
// Themes end

var chart = am4core.create("chartdiv", am4charts.XYChart);
chart.hiddenState.properties.opacity = 0; // this creates initial fade-in

chart.paddingRight = 30;
//chart.dateFormatter.inputDateFormat = "yyyy-MM-dd";

var colorSet = new am4core.ColorSet();
colorSet.saturation = 0.4;

var Group1 = chart.colors.getIndex(0);
var Group2 = chart.colors.getIndex(2);
var Group3 = chart.colors.getIndex(4);
var Group4 = chart.colors.getIndex(6);
var Group5 = chart.colors.getIndex(8);

chart.data = [
  {
    name: "Requirements",
    fromDate: "2022-03-01",
    toDate: "2022-03-15",
    color: Group1,
    tooltipText: "> Meeting stakeholders\n > Gathering process documentation \n> Learning domain knowledge\n > Gathering project requirements"
  },
  {
    name: "Design",
    fromDate: "2022-03-16",
    toDate: "2022-04-20",
    color: Group2,
    tooltipText: "> Development of a data validation plan at source\n> Translate project requirements into technical requirements\n> Study technologies to implement technical requirements \n> Development of the data model"
  },
  {
    name: "Implementation",
    fromDate: "2022-04-21",
    toDate: "2022-08-15",
    color: Group3,
    tooltipText: "> Implementation the validation plan per machine group\n > Development of a data pipeline & data mart \n > Development of the user interface"
  },
  {
    name: "Integration\n& Testing",
    fromDate: "2022-08-16",
    toDate: "2022-09-01",
    color: Group4,
    tooltipText: "> Implementation of final interfaces between user interface and data components\n > Getting key users feedback"
  },
  {
    name: "Refinement",
    fromDate: "2022-09-02",
    toDate: "2022-10-01",
    color: Group5,
    tooltipText: "> Close all issues\n > Implement optimizations & code refactoring"
  },
];

var categoryAxis = chart.yAxes.push(new am4charts.CategoryAxis());
categoryAxis.dataFields.category = "name";
categoryAxis.renderer.grid.template.location = 0;
categoryAxis.renderer.inversed = true;
categoryAxis.renderer.labels.template.fontSize = 14;
categoryAxis.renderer.minGridDistance = 20;

var dateAxis = chart.xAxes.push(new am4charts.DateAxis());
dateAxis.dateFormatter.dateFormat = "yyyy-MM-dd";
dateAxis.renderer.minGridDistance = 70;
dateAxis.baseInterval = { count: 1, timeUnit: "week" };
dateAxis.max = new Date(2022, 9, 1, 0, 0, 0, 0).getTime();
dateAxis.min = new Date(2022, 2, 1, 0, 0, 0, 0).getTime();
dateAxis.strictMinMax = true;
dateAxis.renderer.tooltipLocation = 0;
//dateAxis.dateFormats.setKey('week', "yyyy-MM-dd");

var series1 = chart.series.push(new am4charts.ColumnSeries());
//series1.columns.template.width = am4core.percent(80);
series1.columns.template.tooltipText = "{openDateX} - {dateX}: \n{tooltipText}";
series1.dataFields.openDateX = "fromDate";
series1.dataFields.dateX = "toDate";
series1.dataFields.categoryY = "name";
series1.columns.template.propertyFields.fill = "color"; // get color from data
series1.columns.template.propertyFields.stroke = "color";
series1.columns.template.strokeOpacity = 1;


chart.legend = new am4charts.Legend();
chart.legend.useDefaultMarker = true;
chart.legend.fontSize = 14;
//chart.legend.CategoryAxis.template.fontSize = 14;
chart.legend.data = [
    {
    "name": "Requirements",
    "fill": Group1,
    }, {
    "name": "Design",
    "fill": Group2,
    }, {
    "name": "Implementation",
    "fill": Group3,
    }, {
    "name": "Integration",
    "fill": Group4,
    }, {
    "name": "Refinement",
    "fill": Group5,
    }];