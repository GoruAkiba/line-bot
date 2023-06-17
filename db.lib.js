/**
 * GAS sheetdb
 * @description spreadsheet database controller
 * @author  gb_sources
 * @vers  v_0.0.1
 */

class db{
  constructor(db_id, db_index){
    this.db_id = db_id;
    this.db_index = db_index;
    this.sp = null;
    this.worksheet = null;
  }

  init(db_index){
    db_index = db_index? db_index : this.db_index;

    if(!this.db_id) throw "please provide db_id";

    this.sp = SpreadsheetApp.openById(this.db_id);
    this.worksheet = this.sp.getSheetByName(db_index);


    return this;
  }


  getAll(){
    if(!this.worksheet) return null;
    var ws = this.worksheet;
    var last_col = ws.getLastColumn();
    var last_row = ws.getLastRow();

    var data = ws.getRange(1,1,last_row,2);
    return data.getValues();
  }


  bulkWrite(arr){
    if(!this.worksheet) return null;
    var ws = this.worksheet;
    var last_col = ws.getLastColumn();
    var last_row = ws.getLastRow();

    var range = ws.getRange(last_row +1, 1, arr.length, 2);
    range.setValues(arr);

    return this;
  }
}