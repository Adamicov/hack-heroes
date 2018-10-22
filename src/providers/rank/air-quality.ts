

function AirQuality(name, val){
  let q;
  if(name=='PM10'){
    if(val>0&&val<=20){
      q=0;
    }else if(val>20&&val<=60){
      q=1;
    }else if(val>60&&val<=100){
      q=2;
    }else if(val>100&&val<=140){
      q=3;
    }else if(val>140&&val<=200){
      q=4;
    }else if(val>200){
      q=5;
    }
  }else if(name=='PM25'){
    if(val>0&&val<=12){
      q=0;
    }else if(val>12&&val<=36){
      q=1;
    }else if(val>36&&val<=60){
      q=2;
    }else if(val>60&&val<=84){
      q=3;
    }else if(val>84&&val<=120){
      q=4;
    }else if(val>120){
      q=5;
    }
  }else if(name=='O3'){
    if(val>0&&val<=30){
      q=0;
    }else if(val>30&&val<=70){
      q=1;
    }else if(val>70&&val<=120){
      q=2;
    }else if(val>120&&val<=160){
      q=3;
    }else if(val>160&&val<=240){
      q=4;
    }else if(val>240){
      q=5;
    }
  }else if(name=='NO2'){
    if(val>0&&val<=40){
      q=0;
    }else if(val>40&&val<=100){
      q=1;
    }else if(val>100&&val<=150){
      q=2;
    }else if(val>150&&val<=200){
      q=3;
    }else if(val>200&&val<=400){
      q=4;
    }else if(val>400){
      q=5;
    }
  }else if(name=='SO2'){
    if(val>0&&val<=50){
      q=0;
    }else if(val>50&&val<=100){
      q=1;
    }else if(val>100&&val<=200){
      q=2;
    }else if(val>200&&val<=350){
      q=3;
    }else if(val>350&&val<=500){
      q=4;
    }else if(val>500){
      q=5;
    }
  }else if(name=='C6H6'){
    if(val>0&&val<=5){
      q=0;
    }else if(val>5&&val<=10){
      q=1;
    }else if(val>10&&val<=15){
      q=2;
    }else if(val>15&&val<=20){
      q=3;
    }else if(val>20&&val<=50){
      q=4;
    }else if(val>50){
      q=5;
    }
  }else if(name=='CO'){
    if(val>0&&val<=2){
      q=0;
    }else if(val>2&&val<=6){
      q=1;
    }else if(val>6&&val<=10){
      q=2;
    }else if(val>10&&val<=14){
      q=3;
    }else if(val>14&&val<=20){
      q=4;
    }else if(val>20){
      q=5;
    }
  }
return q;
}
