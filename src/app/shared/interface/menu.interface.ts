export interface Menu {
   title:string;
   path?:string;
   icon?:string;
   type:string; //menu or link
   active?:boolean;
   children?: Menu[]
}


// title: string;
// path?: string;
// icon?: string;
// type: string;
// active?: boolean;
// children?: Menu[]