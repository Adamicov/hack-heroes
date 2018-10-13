export class Pollutions {
    PM_10: number;
    PM_25: number;
    NO2: number;
    SO3: number; 
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
                 g_C6H6: number;
                 )
    {
        this.PM_10=g_PM_10;
        this.PM_25=g_PM_25;
        this.NO2=g_NO2;
        this.SO3=g_SO3; 
        this.SO2=g_SO2;
        this.O3=g_O3;
        this.C6H6=g_C6H6;
    }

}