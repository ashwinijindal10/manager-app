export interface Item {
    id :number,
    title: string,
    quatity? : number ,
    creation_date?:Date,
    details ?:string,
    picture ?:string,
    category?:string,
    active?:boolean
  }
  export interface Filter {
    category: string;
    displayName: string;
    options: Option[];
  }
  
  export type FilterState = Record<string, Option>;
  
  export type Option = string | number;
  