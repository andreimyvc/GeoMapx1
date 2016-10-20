var initChartAvanceProyecto0 = function (data) {
    var chart = AmCharts.makeChart("chartAvanceProyecto", {
        "type": "serial",
        "theme": "light",

        "fontFamily": 'Open Sans',
        "color": '#888888',

        "legend": {
            "equalWidths": false,
            "useGraphSettings": true,
            "valueAlign": "left",
            "valueWidth": 120
        },
        "dataProvider": 
            //[{
            //"date": "2012-01-01",
            //"distance": 227,
            //"townName": "New York",
            //"townName2": "New York",
            //"townSize": 25,
            //"latitude": 40.71,
            //"duration": 408  }]
        data,
        "valueAxes": [{
            "id": "montoAxis",
            "axisAlpha": 0,
            "gridAlpha": 0,
            "position": "left",
            "title": "Monto"
        }, {
            "id": "latitude",
            "axisAlpha": 0,
            "gridAlpha": 0,
            "labelsEnabled": false,
            "position": "right"
        }, {
            "id": "porcentajesAxis",
            "duration": "mm",
            "durationUnits": {
                "hh": "h ",
                "mm": "%"
            },
            "axisAlpha": 0,
            "gridAlpha": 0,
            "inside": true,
            "position": "right",
            "title": "porcentaje"
        }],
        "graphs": [{
            "alphaField": "alpha",
            "balloonText": "[[value]] miles",
            "dashLengthField": "dashLength",
            "fillAlphas": 0.7,
            "legendPeriodValueText": "total: [[value.sum]] mi",
            "legendValueText": "[[value]] mi",
            "title": "distance",
            "type": "column",
            "valueField": "MontoEjecutado",
            "valueAxis": "montoAxis"
        }, {
            "balloonText": "latitude:[[value]]",
            "bullet": "round",
            "bulletBorderAlpha": 1,
            "useLineColorForBulletBorder": true,
            "bulletColor": "#FFFFFF",
            "bulletSizeField": "MontoEjecutado",
            "dashLengthField": "dashLength",
            "descriptionField": "townName",
            "labelPosition": "right",
            "labelText": "[[townName2]]",
            "legendValueText": "[[description]]/[[value]]",
            "title": "latitude/city",
            "fillAlphas": 0,
            "valueField": "latitude",
            "valueAxis": "latitudeAxis"
        }, {
            "bullet": "square",
            "bulletBorderAlpha": 1,
            "bulletBorderThickness": 1,
            "dashLengthField": "dashLength",
            "legendValueText": "[[value]]",
            "title": "duration",
            "fillAlphas": 0,
            "valueField": "Porcentaje",
            "valueAxis": "porcentajesAxis"
        }],
        "chartCursor": {
            "categoryBalloonDateFormat": "MMYY",
            "cursorAlpha": 0.1,
            "cursorColor": "#000000",
            "fullWidth": true,
            "valueBalloonsEnabled": false,
            "zoomable": false
        },
        "dataDateFormat": "YYYY-MM-DD",
        "categoryField": "Mes",
        "categoryAxis": {
            "dateFormats": [{
                "period": "DD",
                "format": "DD"
            }, {
                "period": "WW",
                "format": "MMM DD"
            }, {
                "period": "MM",
                "format": "MMM"
            }, {
                "period": "YYYY",
                "format": "YYYY"
            }, {
                "period": "MMYY",
                "format": "MMM YY"
            }],
            "parseDates": true,
            "autoGridCount": false,
            "axisColor": "#555555",
            "gridAlpha": 0.1,
            "gridColor": "#FFFFFF",
            "gridCount": 50
        }, 
        "export": {
            "enabled": true

        },
        //"exportConfig": {
        //    "menuBottom": "20px",
        //    "menuRight": "22px",
        //    "menuItems": [{
        //        "icon": 'http://localhost:50511/assets/global/plugins/amcharts/amcharts/images/export.png',
        //        "format": 'png'
        //    }]
        //}
    });
    function getIconExport() {
        return App.getGlobalPluginsPath() + "amcharts/amcharts/images/export.png";
    }         
}

var initChartAvanceProyecto = function (data) {
    var chart = AmCharts.makeChart("chartAvanceProyecto", {
        "type": "serial",
        "theme": "light",
        "dataDateFormat": "YYYY-MM-DD",
        "precision": 2,
        "valueAxes": [{
            "id": "v1",
            "title": "Montos",
            "position": "left",
            "autoGridCount": true,
            "labelFunction": function (value) {
                return "$" + Math.round(value) + "M";
            }
        }, {
            "id": "v2",
            "title": "Porcentajes",
            "gridAlpha": 0,
            "position": "right",
            "autoGridCount": true
        }],
        "graphs": [{
            "id": "g3",
            "valueAxis": "v1",
            "lineColor": "#e1ede9",
            "fillColors": "#e1ede9",
            "fillAlphas": 1,
            "type": "column",
            "title": "Monto",//Actual Sales
            "valueField": "MontoEjecutado",//sales2
            "clustered": true,
            "columnWidth": 20
            , "legendValueText": "$[[value]]M",
            "balloonText": "[[title]]<br /><b style='font-size: 130%'>$[[value]]M</b>"
        }
        , {
            "id": "g4",
            "valueAxis": "v1",
            "lineColor": "#62cf73",
            "fillColors": "#62cf73",
            "fillAlphas": 1,
            "type": "column",
            "title": "",
            "valueField": "MontoEjecutado",     //sales1
            "clustered": false,
            "columnWidth": 20,
            "showBalloon": false,
            //"legendValueText": "$[[value]]M",
            //"balloonText": "[[title]]<br /><b style='font-size: 130%'>$[[value]]M</b>"
        }
        , {
            "id": "g1",
            "valueAxis": "v2",
            "bullet": "round",
            "bulletBorderAlpha": 1,
            "bulletColor": "#FFFFFF",
            "bulletSize": 5,
            "hideBulletsCount": 50,
            "lineThickness": 2,
            "lineColor": "#20acd4",
            "type": "smoothedLine",
            "title": "",
            "useLineColorForBulletBorder": true,
            "showBalloon": false,
            //"valueField": "Porcentaje"//market1
            //,"balloonText": "[[title]]<br /><b style='font-size: 130%'>[[value]]</b>"
        }
        , {
            "id": "g2",
            "valueAxis": "v2",
            "bullet": "round",
            "bulletBorderAlpha": 1,
            "bulletColor": "#FFFFFF",
            "bulletSize": 5,
            "hideBulletsCount": 50,
            "lineThickness": 2,
            "lineColor": "#e1ede9",
            "type": "smoothedLine",
            "dashLength": 5,
            "title": "Porcentaje",
            "useLineColorForBulletBorder": true,
            "valueField": "Porcentaje",  //market2
            "balloonText": "[[title]]<br /><b style='font-size: 130%'>[[value]]%</b>"
        }],
        "chartScrollbar": {
            "graph": "g1",
            "oppositeAxis": false,
            "offset": 30,
            "scrollbarHeight": 50,
            "backgroundAlpha": 0,
            "selectedBackgroundAlpha": 0.1,
            "selectedBackgroundColor": "#888888",
            "graphFillAlpha": 0,
            "graphLineAlpha": 0.5,
            "selectedGraphFillAlpha": 0,
            "selectedGraphLineAlpha": 1,
            "autoGridCount": true,
            "color": "#AAAAAA"
        },
        "chartCursor": {
            "pan": true,
            "valueLineEnabled": true,
            "valueLineBalloonEnabled": true,
            "cursorAlpha": 0,
            "valueLineAlpha": 0.2
        },
        "categoryField": "Mes",
        "categoryAxis": {
            "parseDates": true,
            "dashLength": 1,
            "minorGridEnabled": true
        },
        "legend": {
            "useGraphSettings": true,
            "position": "top"
        },
        "balloon": {
            "borderThickness": 1,
            "shadowAlpha": 0
        },
        "export": {
            "enabled": true
        },
        "dataProvider": data,
        "listeners": [{
            "event": "clickGraphItem",
            "method": function (event) {
                var scope = angular.element(document.getElementById('homeApp')).scope();
                scope.getMontosEAPByProyecto(event.item.dataContext.ProyectoID, event.item.dataContext.Mes);
                scope.$apply();
            }
        }]
    });
}

var initChartCantidadesByActividad = function (data) {
    var chart = AmCharts.makeChart("chartCantidadesByActividad", {
        "type": "serial",
        "theme": "light",
        "dataDateFormat": "YYYY-MM-DD",
        "precision": 2,
        "valueAxes": [{
            "id": "v1",
            "title": "Montos",//Sales
            "position": "left",
            "autoGridCount": false,
            "labelFunction": function (value) {
                return "$" + Math.round(value) + "M";
            }
        }, {
            "id": "v2",
            "title": "Cantidad",//Market Days
            "gridAlpha": 0,
            "position": "right",
            "autoGridCount": false
        }],
        "graphs": [{
            "id": "g3",
            "valueAxis": "v1",
            "lineColor": "#e1ede9",
            "fillColors": "#e1ede9",
            "fillAlphas": 1,
            "type": "column",
            "title": "Monto",
            "valueField": "MontoEAP",//sales2
            "clustered": false,
            "columnWidth": 0.5,
            "legendValueText": "$[[value]]M",
            "balloonText": "[[title]]<br /><b style='font-size: 130%'>$[[value]]M</b>"
        }, {
            "id": "g4",
            "valueAxis": "v1",
            "lineColor": "#62cf73",
            "fillColors": "#62cf73",
            "fillAlphas": 1,
            "type": "column",
            "title": "CantidadEjecutada",//Target Sales
            "valueField": "CantidadEjecutada",//sales1
            "clustered": false,
            "columnWidth": 0.3,
            "legendValueText": "$[[value]]M",
            "balloonText": "[[title]]<br /><b style='font-size: 130%'>$[[value]]M</b>"
        }, {
            "id": "g1",
            "valueAxis": "v2",
            "bullet": "round",
            "bulletBorderAlpha": 1,
            "bulletColor": "#FFFFFF",
            "bulletSize": 5,
            "hideBulletsCount": 50,
            "lineThickness": 2,
            "lineColor": "#20acd4",
            "type": "smoothedLine",
            "title": "Cantidad",//Market Days
            "useLineColorForBulletBorder": true,
            "valueField": "CantidadEjecutada",//market1
            "balloonText": "[[title]]<br /><b style='font-size: 130%'>[[value]]</b>"
        }, {
            "id": "g2",
            "valueAxis": "v2",
            "bullet": "round",
            "bulletBorderAlpha": 1,
            "bulletColor": "#FFFFFF",
            "bulletSize": 5,
            "hideBulletsCount": 50,
            "lineThickness": 2,
            "lineColor": "#e1ede9",
            "type": "smoothedLine",
            "dashLength": 5,
            "title": "% Ejecutados",//Market Days ALL
            "useLineColorForBulletBorder": true,
            "valueField": "PorcentajeEjecutado",//market2
            "balloonText": "[[title]]<br /><b style='font-size: 130%'>[[value]]</b>"
        }],
        "chartScrollbar": {
            "graph": "g1",
            "oppositeAxis": false,
            "offset": 30,
            "scrollbarHeight": 50,
            "backgroundAlpha": 0,
            "selectedBackgroundAlpha": 0.1,
            "selectedBackgroundColor": "#888888",
            "graphFillAlpha": 0,
            "graphLineAlpha": 0.5,
            "selectedGraphFillAlpha": 0,
            "selectedGraphLineAlpha": 1,
            "autoGridCount": true,
            "color": "#AAAAAA"
        },
        "chartCursor": {
            "pan": true,
            "valueLineEnabled": true,
            "valueLineBalloonEnabled": true,
            "cursorAlpha": 0,
            "valueLineAlpha": 0.2
        },
        "categoryField": "ActividadSecundaria",
        "categoryAxis": {
            //"parseDates": true,
            "dashLength": 1,
            "minorGridEnabled": true
        },
        "legend": {
            "useGraphSettings": true,
            "position": "top"
        },
        "balloon": {
            "borderThickness": 1,
            "shadowAlpha": 0
        },
        "export": {
            "enabled": true
        },
        "dataProvider": data
    });
}

//[{
//    "date": "2013-01-16",
//    "market1": 71,
//    "market2": 4,
//    "sales1": 5,
//    "sales2": 8
//}, {
//    "date": "2013-01-17",
//    "market1": 74,
//    "market2": 78,
//    "sales1": 4,
//    "sales2": 6
//}]


//[{
//    "date": "2013-01-16",
//    "market1": 71,
//    "market2": 4,
//    "sales1": 5,
//    "sales2": 8
//}, {
//    "date": "2013-01-17",
//    "market1": 74,
//    "market2": 78,
//    "sales1": 4,
//    "sales2": 6
//}, {
//    "date": "2013-01-18",
//    "market1": 78,
//    "market2": 88,
//    "sales1": 5,
//    "sales2": 2
//}, {
//    "date": "2013-01-19",
//    "market1": 85,
//    "market2": 89,
//    "sales1": 8,
//    "sales2": 9
//}, {
//    "date": "2013-01-20",
//    "market1": 82,
//    "market2": 89,
//    "sales1": 9,
//    "sales2": 6
//}, {
//    "date": "2013-01-21",
//    "market1": 83,
//    "market2": 85,
//    "sales1": 3,
//    "sales2": 5
//}, {
//    "date": "2013-01-22",
//    "market1": 88,
//    "market2": 92,
//    "sales1": 5,
//    "sales2": 7
//}, {
//    "date": "2013-01-23",
//    "market1": 85,
//    "market2": 90,
//    "sales1": 7,
//    "sales2": 6
//}, {
//    "date": "2013-01-24",
//    "market1": 85,
//    "market2": 91,
//    "sales1": 9,
//    "sales2": 5
//}, {
//    "date": "2013-01-25",
//    "market1": 80,
//    "market2": 84,
//    "sales1": 5,
//    "sales2": 8
//}, {
//    "date": "2013-01-26",
//    "market1": 87,
//    "market2": 92,
//    "sales1": 4,
//    "sales2": 8
//}, {
//    "date": "2013-01-27",
//    "market1": 84,
//    "market2": 87,
//    "sales1": 3,
//    "sales2": 4
//}, {
//    "date": "2013-01-28",
//    "market1": 83,
//    "market2": 88,
//    "sales1": 5,
//    "sales2": 7
//}, {
//    "date": "2013-01-29",
//    "market1": 84,
//    "market2": 87,
//    "sales1": 5,
//    "sales2": 8
//}, {
//    "date": "2013-01-30",
//    "market1": 81,
//    "market2": 85,
//    "sales1": 4,
//    "sales2": 7
//}]