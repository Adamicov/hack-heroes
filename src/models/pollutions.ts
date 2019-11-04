export class Pollutions {
    PM10: number;
    "PM2.5": number;
    NO2: number;
    CO: number; 
    SO2: number;
    O3: number;
    C6H6: number;

    constructor (
                 g_PM_10: number,
                 g_PM_25: number,
                 g_NO2: number,
                 g_SO3: number, 
                 g_SO2: number,
                 g_O3: number,
                 g_C6H6: number
                 )
    {
        this["PM10"]=g_PM_10;
        this["PM2.5"]=g_PM_25;
        this.NO2=g_NO2;
        this.CO=g_SO3; 
        this.SO2=g_SO2;
        this.O3=g_O3;
        this.C6H6=g_C6H6;
    }

}