import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { RestProvider } from '../../providers/rest/rest'

import { RankData } from '../../models/rankData';
import { DataCell } from '../../models/dataCell';
import { RankProvider } from '../../providers/rank/rank';
import { Chart } from 'chart.js'
/**
 * Generated class for the RankPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-rank',
  templateUrl: 'rank.html',
})
export class RankPage {

  @ViewChild('barCanvas') barCanvas;
  barChart: any=null;
  labels: string[];
  data: number[];
  choosenType: string = "PM_25";
  numberOfRanked: number = 5;
  rankDatas: RankData[]=[];
  typesOfPollutions: string[] = [
    'PM10','PM2.5','NO2','CO','SO2','O3','C6H6'
  ];
  constructor(public navCtrl: NavController, public navParams: NavParams, public restProvider: RestProvider) {

        this.restProvider.stationRank().then((value:RankData[])=>{this.rankDatas=value;this.createChart();});
    
  }

  ngOnInit(rankProvider: RankProvider){
    
    
  }

  ionViewDidLoad(){
    Chart.scaleService.updateScaleDefaults('bar', {
      ticks: {
          min: 0
      }
    });
    //console.log("rankPage");

  }

  prepareData(){
    this.labels=[];
    this.data=[];

    let tempArray: DataCell[]=[];
    console.log(this.rankDatas);
    for(let i=0;i<this.rankDatas.length;i++){
      if(this.rankDatas[i].pollutions[this.choosenType]!=null){
        tempArray.push({name: this.rankDatas[i].station.city.name,number: this.rankDatas[i].pollutions[this.choosenType]});
      }
      

    }
    tempArray=tempArray.sort(function(n1 ,n2){return n2.number-n1.number});
    
    for(let i=0;i<tempArray.length&&i<this.numberOfRanked;i++){
      //console.log(tempArray[i]);
      this.labels.push(tempArray[i].name);
      this.data.push(tempArray[i].number);
    }
  }

  createChart(){
    this.prepareData();
    if(this.barChart!=null){
      this.barChart.destroy();
    }
    this.barChart=new Chart(this.barCanvas.nativeElement,{
      type: 'bar',
      data: {
        labels: this.labels,
        datasets: [{
          borderColor: 'black',
          borderWidth: '2',
          backgroungColor:'blue',
          label: this.choosenType,
          data: this.data
        }]
      },
      options: {
        scales: {
          yAxes: [{
            ticks: {
                beginAtZero: true
            }
          }]
        },
        legend: {
          display: false
        },

        title: {
          display: true,
          text: "Zanieczyszczenie "+this.choosenType
        }

        
      }
    })
  }
}


class Pomoc{
  number: number;
  name:string;
}

