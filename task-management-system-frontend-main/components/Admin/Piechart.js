// pages/ChartPage.js
"use client";
import { useEffect ,memo} from 'react';
import * as am4core from '@amcharts/amcharts4/core';
import * as am4charts from '@amcharts/amcharts4/charts';
import am4themes_animated from '@amcharts/amcharts4/themes/animated';
import { useState } from 'react';
import Cookies from 'js-cookie';
import { Redirect,redirect } from 'next/navigation';

const PieChart = (val) => {
  const [chartdetail, setChartDetail] = useState([]);
  var temp;
  
    const fetchData = async () => {
      const token=Cookies.get('authToken');
      let apiUrl = '';
      if (val.val == 0) {
        apiUrl = 'http://localhost:8080/admin/taskManagement/resourceManagement/number/tasks';
        temp=0;
      } else {
        apiUrl = 'http://localhost:8080/admin/taskManagement/resourceManagement/number/users';
        temp=1;
      }

      try {
        const response = await fetch(apiUrl, {
          method: 'GET',
          headers: {
              'Authorization': `${token}`,
              'Content-Type': 'application/json',
          },
      });
        if (response.status === 401) {
        console.log("unauthorized access");
        redirect("/login");
        }
        const data = await response.json();
        setChartDetail(data);
      } catch (error) {
        console.error('Failed to fetch data:', error);
      }
    };
    useEffect(() => {
        fetchData();
      }, [val]);


    am4core.ready(function () {
      // Themes begin
      am4core.useTheme(am4themes_animated);
// Themes end

var chart = am4core.create("chartdiv", am4charts.PieChart3D);
chart.hiddenState.properties.opacity = 0; // this creates initial fade-in

chart.legend = new am4charts.Legend();

if(chartdetail.length>0){
    var temp=[];
    for(var i=0;i<chartdetail.length;i++){
        temp.push({tasks:chartdetail[i].name,number:chartdetail[i].val});
    }
    chart.data = temp;
}


      var series = chart.series.push(new am4charts.PieSeries3D());
series.dataFields.value = "number";
series.dataFields.category = "tasks";
      
    });

  

  return <div id="chartdiv" style={{ width: '100%', height: '500px' }} />;
};

export default memo(PieChart);
