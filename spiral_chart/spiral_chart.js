/* SOURCE: https://www.amcharts.com/demos-v4/spiral-chart-v4/ */

import {data} from "./data.js";

am4core.useTheme(am4themes_animated);


let chart = am4core.create("spiralplot_container", am4plugins_timeline.SpiralChart);
chart.levelCount = 3;
chart.curveContainer.padding(40, 40, 40, 40);

chart.data = data;

let dateAxis = chart.xAxes.push(new am4charts.DateAxis());
dateAxis.renderer.grid.template.location = 0;
dateAxis.renderer.line.disabled = true;
dateAxis.cursorTooltipEnabled = false;
dateAxis.renderer.minGridDistance = 30;
dateAxis.baseInterval.timeUnit = "year";
dateAxis.tooltipDateFormat = "yyyy";
dateAxis.minZoomCount = 5;
dateAxis.dateFormatter = new am4core.DateFormatter();
dateAxis.dateFormatter.dateFormat = "yyyy";

window.xaxis = dateAxis;

let labelTemplate = dateAxis.renderer.labels.template;
labelTemplate.fontSize = 13;
labelTemplate.verticalCenter = "middle";
labelTemplate.horizontalCenter = "middle";
labelTemplate.padding(3, 3, 3, 3);

labelTemplate.adapter.add("rotation", function (rotation, target) {
    let value = target.dataItem.value;
    let endvalue = target.dataItem.endValue;

    let position = dateAxis.valueToPosition(value + (endvalue - value) / 2);

    let angle = dateAxis.renderer.positionToAngle(position);

    return angle;
})

let valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
valueAxis.numberFormatter = new am4core.NumberFormatter();
valueAxis.numberFormatter.numberFormat = "#  kWh";
valueAxis.tooltip.disabled = true;
valueAxis.renderer.innerRadius = -25;
valueAxis.renderer.radius = 25;
valueAxis.renderer.minGridDistance = 15;
valueAxis.renderer.axisLocation = 1;


let valueAxisLabelTemplate = valueAxis.renderer.labels.template;
valueAxisLabelTemplate.rotation = - 90;
valueAxisLabelTemplate.fontSize = 10;
valueAxisLabelTemplate.horizontalCenter = "left";


valueAxisLabelTemplate.adapter.add("rotation", function (rotation, target) {
    return dateAxis.renderer.positionToAngle(1) - 90;
})

chart.seriesContainer.zIndex = -1;

let series = chart.series.push(new am4plugins_timeline.CurveColumnSeries());
series.dataFields.dateX = "year";
series.dataFields.valueY = "value";
series.tooltipText = "{valueY} kWh";
series.tooltip.pointerOrientation = "vertical";
series.tooltip.background.fillOpacity = 0.7;
series.strokeWidth = 2;
series.heatRules.push({
    "target": series.columns.template,
    "property": "stroke",
    "min": am4core.color("#005f96"),
    "max": am4core.color("#73EDFF"),
    "dataField": "valueY"
});
series.heatRules.push({
    "target": series.columns.template,
    "property": "fill",
    "min": am4core.color("#005f96"),
    "max": am4core.color("#73EDFF"),
    "dataField": "valueY"
});

chart.dateFormatter.dateFormat = "yyyy";
chart.cursor = new am4plugins_timeline.CurveCursor();
chart.cursor.xAxis = dateAxis;
chart.cursor.yAxis = valueAxis;
chart.cursor.lineY.disabled = true;

chart.scrollbarX = new am4core.Scrollbar();
chart.scrollbarX.width = am4core.percent(80);
chart.scrollbarX.align = "center";
