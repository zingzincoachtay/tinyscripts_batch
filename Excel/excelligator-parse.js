const scope = require('./excelligator-scope.js');
var Excel;
if(typeof require !== 'undefined') Excel = require('xlsx');

const pickSheetName = (proposedNames) => {
  if(proposedNames.length==1) return proposedNames[0];
  let validNames = proposedNames.filter(function(n){
    let isValid = new Set( scope.setSheetNamesVariants.map( (re)=>re.test(n) ) );
    return isValid.has(true);
  });
  return (validNames.length>0) ? validNames[0] : '';
}
const getWBp = (target) => {
  let Sheets = (typeof Excel.readFile(target) !== 'undefined') ? Excel.readFile(target) : [];
  let SheetName = (typeof Sheets.SheetNames !== 'undefined') ? pickSheetName(Sheets.SheetNames) : '';
  if(SheetName.length==0) return [];//will stop when Sheets.SheetNames was undefined
  let Sheet = (typeof Sheets.Sheets[SheetName] !== 'undefined') ? Sheets.Sheets[SheetName] : [];
  return Sheet;
}
const getColumn = function(target,column){
  const eye = new RegExp('^'+column,'i');
  let Sheet = getWBp(target);
  var Lookout = Object.keys(Sheet).filter( (c)=>eye.test(c) );
  return Lookout.map( (r)=>Sheet[r].v );
}
const getColumns = (target,columns) => columns.map( (column)=>getColumn(target,column) );

const testType = function(data,fp){
  //Workbook or Sheets were unexpected.
  //Sheets were malformed.
  let isUndef = new Set( fp.map( (jetty)=>(typeof data[jetty] === 'undefined')                     ));
  //let values = fp.map( (jetty)=>(typeof data[jetty] === 'undefined') ? '' : data[jetty].f );
  let values =           fp.map( (jetty)=>(typeof data[jetty] === 'undefined') ? 0 : data[jetty].v );
  return {'likely':!isUndef.has(true),'values':values};
}
const getSheetType = function(target){
  let Sheet = getWBp(target);
  let fp = {
    'newcellhist':{},
    'newcellsubs':{},
    'oldcellhist':{},
    'oldcellsubs':{},
    'isnew':false,
    'isold':false
  };
  fp.newcellhist = testType(Sheet,scope.getNewCellHistFingerprint);
  fp.newcellsubs = testType(Sheet,scope.getNewCellSubsFingerprint);
  fp.oldcellhist = testType(Sheet,scope.getOldCellHistFingerprint);
  fp.oldcellsubs = testType(Sheet,scope.getOldCellSubsFingerprint);
  fp.isnew = (fp.newcellhist.likely && fp.newcellsubs.likely);
  // If the new form was not detected, assume the old form and be backward compatible.
  // Judge by Sheet['!ref']?
  //fp.isold = (!fp.isnew && fp.oldcellhist.likely && fp.oldcellsubs.likely);
  fp.isold = (!fp.isnew);
  return fp;
}

const getDigest = function(uri){
  let readExcel = [];
  uri.forEach((addr, i) => {
    let SheetType = getSheetType(addr);
    if (!SheetType.isnew && !SheetType.isold) {
      // Maybe the sheet name is unexpected.
      // Maybe the sheet is not a quote.
      console.log(addr,SheetType.newcellhist,SheetType.newcellsubs,SheetType.oldcellhist,SheetType.oldcellsubs,SheetType.isnew,SheetType.isold);
    } else {
      readExcel.push(
        (SheetType.isnew) ? {'sheet':addr,'age':'new','total':pickLatest(SheetType.newcellhist.values)} :
        (SheetType.isold) ? {'sheet':addr,'age':'old','total':pickLatest(SheetType.oldcellhist.values)} :
                            {'sheet':i,'addr':addr,'error':'Irregular exception error: getDigest'}
      );
    }
  });
  return readExcel;
}
const csvsafe = (s) => s;
const iterableField = (data,values,fields) => {
  let o = fields;
  for(let k=1;k<fields.length;k++){
    for(const [key,jetty] of Object.entries(fields[k]))
      o[k][key] = (typeof data[jetty] === 'undefined') ? o[k][key] : csvsafe(data[jetty].v);// keep default values, or static string, "NF"?
  }
  return o;
}
const traverse = (trails,O) => (trails.length>0) ? traverse(trails.slice(1),O[trails[0]]) : O;
const setfield = (trails,O) => ({[trails[0]]:(trails.length>1) ? setfield(trails.slice(1),O) : O});
const getFieldValues = (data,v,xy) => {
  let o = xy;
  for(let keydef of scope.getDatabaseBlueprint.dbKeyDefCol){
    let trails = keydef.split(/\W+/g);
    Object.assign(traverse(trails,o), iterableField(data, traverse(trails,v), traverse(trails,xy)) );
  }
  return o;
}
const iterablePage = (target,values,cells) => {
  let o = cells;
  let Sheet = getWBp(target);
  for(let i in cells)
    o[i] = getFieldValues(Sheet,values[i],cells[i]);
  return o;
}
const decodeURI = function(uri){
  //let groups = uri.match(/^[A-Z]:(\\{1,2}).+\1([^\\\/]+)\1(\S+?)\s+([^\\\/]+)\1[^\\\/]+\1(\S+?)\s+([^\\\/]+)\.xlsx?$/);
  let groups = uri.match( new RegExp(scope.getDatabaseBlueprint.dirinterpreter.re) );
  return scope.getDatabaseBlueprint.dirinterpreter.pick.map( (e)=>groups[e] );
}
const getDetail = function(uri){
  let readExcel = new Array();
  let relativity = new Map();
  uri.forEach((addr, i) => {
    relativity.set(i,decodeURI(addr));
    let template = JSON.parse(scope.initForm);// Deep Copy
    let SheetType = getSheetType(addr);
    if (!SheetType.isnew && !SheetType.isold) {
      // Maybe the sheet name is unexpected.
      // Maybe the sheet is not a quote.
      console.log(addr,SheetType.newcellhist,SheetType.newcellsubs,SheetType.oldcellhist,SheetType.oldcellsubs,SheetType.isnew,SheetType.isold);
    } else {
      console.log("Reading: "+addr);
      readExcel.push(
        (SheetType.isnew) ? Object.assign( {'sheet':i,'age':'new'}, iterablePage(addr,template.setNewFormDefault,template.getNewCellPositions) ) :
        (SheetType.isold) ? Object.assign( {'sheet':i,'age':'old'}, iterablePage(addr,template.setOldFormDefault,template.getOldCellPositions) ) :
                            {'sheet':i,'addr':addr,'error':'Irregular exception error: getDetail'}
      );
    }
  });
  return {"dump":readExcel,"index":relativity};
}

const pickLatest = (vals) => (vals.length==0) ? 0 : (vals[0]>0) ? vals[0] : pickLatest(vals.slice(1));
const readCellValue = (data,jetty) => (typeof data[jetty] === 'undefined') ? 0 : data[jetty].v;

module.exports.getColumn  = getColumn;
module.exports.getColumns = getColumns;
module.exports.getDigest = getDigest;
module.exports.getDetail = getDetail;