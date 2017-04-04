XmlData.prototype.load = function(x) {
 var c = x.firstChild;
 while (c) {
  if (c.nodeName == '#text') {this._text += c.nodeValue;}
  else if (c.nodeType == 1) {
   if (typeof this[c.nodeName] == 'undefined') this[c.nodeName] = [];
   this[c.nodeName][this[c.nodeName].length] = new XmlData(c);
  }
  c = c.nextSibling;
 }
 var a = x.attributes;var i = 0;
 if (a) for (var i = 0; i < a.length; i ++) this[a[i].name] = a[i].value;
 if (this._text.match(/^\\s*$/)) delete this._text;
 return this;
}

function XmlData(x) {this._text = '';return this.load(x);}
