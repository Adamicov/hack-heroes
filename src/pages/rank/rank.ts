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
  barChart: any;
  labels: string[];
  data: number[];
  choosenType: string = "PM_25";
  numberOfRanked: number = 5;
  rankDatas: RankData[];
  typesOfPollutions: string[] = [
    'PM_10','PM_25','NO2','SO3','SO2','O3','C6H6'
  ];
  constructor(public navCtrl: NavController, public navParams: NavParams, public rankProvider: RankProvider) {}

  ngOnInit(rankProvider: RankProvider){
    this.rankProvider.stationRank.subscribe((value:RankData[])=>this.rankDatas=value);
  }

  ionViewDidLoad(){
    this.createChart();
  }

  prepareData(){
    this.labels=[];
    this.data=[];
    let tempArray: DataCell[]=[];
    for(let i=0;i<this.rankDatas.length&&i<this.numberOfRanked;i++){
      tempArray.push({name: this.rankDatas[i].station.city.name,number: this.rankDatas[i].pollutions[this.choosenType]});

    }
    tempArray=tempArray.sort((n1 ,n2)=>n2.number-n1.number);
    for(let i=0;i<tempArray.length;i++){
      this.labels.push(tempArray[i].name);
      this.data.push(tempArray[i].number);
    }
  }

  createChart(){
    this.prepareData();
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
        legend: {
          display: false
        },

        title: {
          display: true,
          text: "Zanieczyszczenie "+this.choosenType
        },

        scales: {
          yAxes: [{
            tics: {
              beginAtZero:true
            }
          }]
        }
      }
    })
  }
}
