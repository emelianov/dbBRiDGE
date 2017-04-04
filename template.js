//////////////////////////////////////////////
//
// dbBRiDGE library [client side]
//  2016.1
//
// (c)2016, a.m.emelianov@gmail.com
//

var getAct=false;	//Depricated

// Switch Edit/ReadOnly for fields
// form - form template
// on - true for Edit
function setEdit(form, on) {
 for (var i = 0; i < form.field.length; i++) {
	document.getElementById(form.field[i].name).disabled = (!on || (form.field[i].disabled[0]._text == 1));
 }
}

// Set item's list order according to specific
// data - database data
// dbname - database to sort name
// fieldname - key field
// order - array, values to sort according to
// return ordered data
function localSort(data, dbname, fieldname, order) {
 if (typeof data[dbname] !== 'undefined') {
     var db = data[dbname][0];
     var j = 0;
     for (var k = 0; k < order.length; k++) {
      for (var i = k; i < db[fieldname].length; i++) {
	if (db[fieldname][i]._text == order[k]) {
	 data = swapRows(data, dbname, k, i);
	 break;
	}
      }
     }
 }
 return data;
}

// localSort subroutine
function swapRows(data, dbname, ii, ij) {
 for (var key in data[dbname][0]) {
    var tmp = data[dbname][0][key][ii];
    data[dbname][0][key][ii] = data[dbname][0][key][ij];
    data[dbname][0][key][ij] = tmp;
 }
 return data;
}

// Display items list
// box - DIV to output list to
// list - list template
// data - database data
function showList(box, list, data, tableName='selecttable') {
     var table1 = document.createElement('table');
     table1.className = 'box';
     table1.id = tableName;
     var tr = new Array();
     for (var i = 0; i < list[0].col.length; i++) {
	if (typeof list[0].col[i].db[0] !== 'undefined' && typeof list[0].col[i].field[0] !== 'undefined') {
	    if (typeof data[list[0].col[i].db[0]._text] !== 'undefined') {
//		var col = data[list[0].col[i].db[0]._text][1][list[0].col[i].field[0]._text];
		var col = data[list[0].col[i].db[0]._text][0][list[0].col[i].field[0]._text];
//console.log(col);
		if (typeof col !== 'undefined') {
		    for (var j = 0; j < col.length; j++) {
			if (typeof tr[j] === 'undefined') {
			    tr[j] = document.createElement('tr');
			    table1.appendChild(tr[j]);
			}
			var td = document.createElement('td');
			if (typeof list[0].col[i].link !== 'undefined') {
			    var lnk = document.createElement('a');
			    lnk.href = "javascript:" + list[0].col[i].link[0]._text + "('" + col[j]._text + "');";
			    if (typeof list[0].col[i].filler !== 'undefined') {
				lnk.innerHTML = list[0].col[i].filler[0]._text;
			    } else {
				lnk.innerHTML = col[j]._text;
			    }
			    td.appendChild(lnk);
			} else {
			    td.innerHTML = col[j]._text;
			}
			tr[j].appendChild(td);
		    }
		}
	    }
	}
     }
    box.appendChild(table1);
}

function showForm(box, form, data, fill=-1) {

     var table = document.createElement('table');
     table.className = 'box';
     for (var i=0; i<form.field.length; i++) {
	var field = form.field[i];
	var name = field.name;
var db = field.dbname[0]._text;
var dbfield = field.dbfield[0]._text;
    //console.log(field);
      var tr = document.createElement('tr');
      if (!(i&1)) tr.className='odd';
      var td = [];
       td[0] = document.createElement('td');
	if (typeof field.label !== 'undefined') {
       		td[0].innerHTML = field.label[0]._text;
	}
       td[0].className = 'left';
       tr.appendChild(td[0]);
       switch (field.type) {
	case 'date':
	case 'text':
	case 'hidden':
	       var elem = document.createElement('input');
	       elem.type = field.type;
//		if (typeof data[name] !== 'undefined') {
console.log(data[db][0][dbfield][0]);
		if (fill > -1 && typeof data[db][0][dbfield][fill] !== 'undefined') {
			elem.value = data[db][0][dbfield][fill]._text;
		}
	break;
	case 'select':
	       var elem = document.createElement('select');
	       if (typeof field.width !== 'undefined') {
		       elem.size = field.width[0]._text;
	       }
		if (typeof field.help !== 'undefined') {
			var option = document.createElement('option');
			option.text = field.help[0]._text;
			option.value = '';
			option.disabled = true;
			elem.appendChild(option);
		}
		if (field.dic[0]['type'] == 'static') {
		    var dbname = field.dic[0].dbname[0]._text;
		    var valuename = field.dic[0].value[0]._text;
		    var textname = field.dic[0].text[0]._text;
		    if (typeof data[dbname] !== 'undefined') {
			for (var j=0; j < data[dbname][0][valuename].length; j++) {
				var option = document.createElement('option');
				option.text = data[dbname][0][textname][j]._text;
				option.value = data[dbname][0][valuename][j]._text;
				elem.appendChild(option);
			}
		    }
		} else if (field.dic[0]['type'] == 'const') {
			for (var j=0; j < field.dic[0].text.length; j++) {
				var option = document.createElement('option');
				option.text = field.dic[0].text[j]._text;
				option.value = field.dic[0].value[j]._text;
				elem.appendChild(option)
				if (typeof field.defaultvalue !== 'undefined') {
				    elem.value = field.defaultvalue[0]._text;
				    //option.selected = true;
				} 
;
			}
		}
	break;
	}
	elem.className = "inputs";
        elem.id = name;
	elem.name = name;
	var dbname = field.dbname[0]._text;
	var fieldname = field.dbfield[0]._text;
	if (typeof data[dbname] !== 'undefined') {
//		elem.value = data[dbname][0][fieldname][0]._text;
	}
	if (typeof field.width !== 'undefined') {
	       elem.size = field.width[0]._text;
	}
	if (typeof field.readonly !== 'undefined') {
		elem.readOnly = (field.readonly[0]._text == 1);
	} else {
		form.field[i].readonly = [''];
		form.field[i].readonly[0]._text = 0;
	}
	if (typeof field.hidden !== 'undefined') {
		form.field[i].hidden = [''];
		elem.hidden = (field.hidden[0]._text == 1);
	}
	if (typeof field.disabled !== 'undefined') {
		elem.disabled = (field.disabled[0]._text == 1);
	} else {
		form.field[i].disabled = [''];
		form.field[i].disabled[0]._text = 0;
	}
       td[1] = document.createElement('td');
       td[1].appendChild(elem);
       tr.appendChild(td[1]);
	table.appendChild(tr);
     }

     //while (box.hasChildNodes()) box.removeChild(box.lastChild);
      box.appendChild(table);

}

function clear(box) {
 while (box.hasChildNodes()) box.removeChild(box.lastChild);
}

function displayTemplate() {
   if(this.readyState==4 && this.status==200) {
    var resp=this.responseXML;
    if(resp!=null){
     var got = new XmlData(resp);			//Convert XML to array
     var list = got.page[0].list;			//LIST template
     var form = got.page[0].form[0];			//FORM template
     var data = got.page[0].data[0];			// database DATA
                    //DATA part
     if (typeof got.page[0].header[0]._text !== 'undefined') {
	document.title = got.page[0].header[0]._text;
     }
     if (typeof got.page[0].label !== 'undefined') {
	document.getElementById('title').innerHTML = got.page[0].label[0]._text;
     }
     var box = document.getElementById('box');
     showList(box, list, data);
     showForm(box, form, data);
     setEdit(form, false);
   }
 }
}
