import { Page } from "../classes/Page";


var fs = require("fs");

export function findItemByKeyValue(array: any[], key: string, value: any): any {
    return array.find(item => item[key] === value);
}

export function savePages(data:Array<Page>):void {
    fs.writeFile ("pages.json", JSON.stringify(data), function(err:any) {
        if (err) throw err;
        console.log('complete');
        }
    );
}

export function loadPages():Array<Page>{
    var data:Array<Page> = JSON.parse(fs.readFileSync("pages.json"));
    return data;
}
