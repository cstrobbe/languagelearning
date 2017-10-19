/*
	DOMhelp 1.0
	written by Chris Heilmann
	http://beginningjavascript.com/
	To be featured in "Beginning JavaScript with DOM Scripting and Ajax" 
*/
/**
 * @namespace DOMhelp libary, with function that facilitate DOM manipulation and dealing with events.
 * @author Christian Heilmann
 * @see <a href="http://beginningjavascript.com/">Beginning JavaScript with DOM Scripting and Ajax</a>.
 * @fileOverview Licensed under the Apache License, Version 2.0 (the "License");
        you may not use this file except in compliance with the License.
        You may obtain a copy of the License at
        
           http://www.apache.org/licenses/LICENSE-2.0
        
        Unless required by applicable law or agreed to in writing, software
        distributed under the License is distributed on an "AS IS" BASIS,
        WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
        See the License for the specific language governing permissions and
        limitations under the License.
 */
var DOMhelp = {
	debugWindowId: 'DOMhelpdebug',
	init: function() {
	    "use strict";
		if (!document.getElementById || !document.createTextNode) {return;}
	},

	// See Beginning JS, p. 119.
	lastSibling: function(node) {
	    "use strict";
		var tempObj = node.parentNode.lastChild;
		//while(tempObj.nodeType !== Node.ELEMENT_NODE && tempObj.previousSibling !== null) {
		while(tempObj.nodeType !== 1 && tempObj.previousSibling !== null) {
			tempObj = tempObj.previousSibling;
		}
		//return (tempObj.nodeType === Node.ELEMENT_NODE) ? tempObj : false;
		return (tempObj.nodeType === 1) ? tempObj : false;
	},

	// See Beginning JS, p. 119.
	firstSibling: function(node) {
	    "use strict";
		var tempObj = node.parentNode.firstChild;
		//while(tempObj.nodeType !== Node.ELEMENT_NODE && tempObj.nextSibling !== null) {
		while(tempObj.nodeType !== 1 && tempObj.nextSibling !== null) {
			tempObj = tempObj.nextSibling;
		}
		//return (tempObj.nodeType === Node.ELEMENT_NODE) ? tempObj : false;
		return (tempObj.nodeType === 1) ? tempObj : false;
	},

	// See Beginning JS, p. 119.
	getText: function(node) {
	    "use strict";
		if (!node.hasChildNodes()) {return false;}
		var reg = /^\s+$/;
		var tempObj = node.firstChild;
		//while(tempObj.nodeType !== Node.TEXT_NODE && tempObj.nextSibling !== null || reg.test(tempObj.nodeValue)) {
		while(tempObj.nodeType !== 3 && tempObj.nextSibling !== null || reg.test(tempObj.nodeValue)) {
			tempObj = tempObj.nextSibling;
		}
		//return tempObj.nodeType === Node.TEXT_NODE ? tempObj.nodeValue : false;
		return tempObj.nodeType === 3 ? tempObj.nodeValue : false;
	},

	// See Beginning JS, p. 120.
	setText: function(node,txt) {
	    "use strict";
		if (!node.hasChildNodes()) {return false;}
		var reg = /^\s+$/;
		var tempObj = node.firstChild;
		//while(tempObj.nodeType !== Node.TEXT_NODE && tempObj.nextSibling !== null || reg.test(tempObj.nodeValue)) {
		while(tempObj.nodeType !== 3 && tempObj.nextSibling !== null || reg.test(tempObj.nodeValue)) {
			tempObj = tempObj.nextSibling;
		}
		//if (tempObj.nodeType === Node.TEXT_NODE) {tempObj.nodeValue=txt} else {return false;}
		if (tempObj.nodeType === 3) {tempObj.nodeValue=txt} else {return false;}
	},

	// See Beginning JS, p. 120.
	createLink: function(to,txt) {
	    "use strict";
		var tempObj = document.createElement('a');
		tempObj.appendChild(document.createTextNode(txt));
		tempObj.setAttribute('href',to);
		return tempObj;
	},

	// See Beginning JS, p. 120.
	createTextElm: function(elm,txt) {
	    "use strict";
		var tempObj = document.createElement(elm);
		tempObj.appendChild(document.createTextNode(txt));
		return tempObj;
	},

	// See Beginning JS, p. 121.
	closestSibling: function(node,direction) {
	    "use strict";
		var tempObj;
		if (direction === -1 && node.previousSibling !== null) {
			tempObj = node.previousSibling;
			//while(tempObj.nodeType !== Node.ELEMENT_NODE && tempObj.previousSibling !== null) {
			while(tempObj.nodeType !== 1 && tempObj.previousSibling !== null) {
				 tempObj=tempObj.previousSibling;
			}
		//} else if (direction === Node.ELEMENT_NODE && node.nextSibling !== null) {
		} else if (direction === 1 && node.nextSibling !== null) {
			tempObj = node.nextSibling;
			//while(tempObj.nodeType !== Node.ELEMENT_NODE && tempObj.nextSibling !== null) {
			while(tempObj.nodeType !== 1 && tempObj.nextSibling !== null) {
				 tempObj = tempObj.nextSibling;
			}
		}
		//return tempObj.nodeType === Node.ELEMENT_NODE ? tempObj : false;
		return tempObj.nodeType === 1 ? tempObj : false;
	},

	// See Beginning JS, p. 121.
	initDebug: function() {
	    "use strict";
		if (DOMhelp.debug) {DOMhelp.stopDebug();}
		DOMhelp.debug = document.createElement('div');
		DOMhelp.debug.setAttribute('id',DOMhelp.debugWindowId);
		document.body.insertBefore(DOMhelp.debug,document.body.firstChild);
	},

	// See Beginning JS, p. 121.
	setDebug: function(bug) {
	    "use strict";
		if (!DOMhelp.debug) {DOMhelp.initDebug();}
		DOMhelp.debug.innerHTML += bug+'\n';
	},

	// See Beginning JS, p. 122.
	stopDebug: function() {
	    "use strict";
		if (DOMhelp.debug) {
			DOMhelp.debug.parentNode.removeChild(DOMhelp.debug);
			DOMhelp.debug = null;
		}
	},

	getKey: function(e) {
	    "use strict";
		if (window.event) {
	      var key = window.event.keyCode;
	    } else if (e) {
	      var key = e.keyCode;
	    }
		return key;
	},

	// helper methods
	// NOTE: Also check for nodeType to address Safari bug; see http://www.quirksmode.org/js/events_properties.html
	// See Beginning JS, p. 167-168.
	getTarget: function(e) {
	    "use strict";
		var target = window.event ? window.event.srcElement : e ? e.target : null;
		if (!target) {return false;}
		//while(target.nodeType !== Node.ELEMENT_NODE && target.nodeName.toLowerCase() !== 'body') {
		while(target.nodeType !== 1 && target.nodeName.toLowerCase() !== 'body') {
			target = target.parentNode;
		}
		return target;
	},

	// See Beginning JS, p. 168.
	stopBubble: function(e) {
	    "use strict";
		if (window.event && window.event.cancelBubble) {   // MSIE
			window.event.cancelBubble = true;
		} 
		if (e && e.stopPropagation) {                      // W3C DOM Level 2 event support
			e.stopPropagation();
		}
	},

	// See Beginning JS, p. 168.
	stopDefault: function(e) {
	    "use strict";
		if (window.event && window.event.returnValue) {    // MSIE
			window.event.returnValue = false;
		} 
		if (e && e.preventDefault) {                       // W3C DOM Level 2 event support
			e.preventDefault();
		}
	},

	// See Beginning JS, p. 169.
	// See also The Art and Science of JavaScript, p. 63 & 71.
	cancelClick: function(e) {
	    "use strict";
		if (window.event) {
			window.event.cancelBubble = true;
			window.event.returnValue = false;
		}
		if (e && e.stopPropagation && e.preventDefault) {
			e.stopPropagation();
			e.preventDefault();
		}
	},

	// By Scott Andrew. See Beginning JS, p. 166. 
	// See also The Art and Science of JavaScript p. 61 & 64 -> http://www.scottandrew.com/weblog/articles/cbs-events
	addEvent: function(elm, evType, fn, useCapture) {
	    "use strict";
		if (elm.addEventListener) { // W3C DOM
			elm.addEventListener(evType, fn, useCapture);
			return true;
		} else if (elm.attachEvent) { // MSIE 8 or earlier
			var r = elm.attachEvent('on' + evType, fn);
			return r;
		} else { // MSIE on Mac
			elm['on' + evType] = fn;
		}
	},

	// See Beginning JS, p. 128.
	cssjs: function(a,o,c1,c2) {
	    "use strict";
		switch (a) {
			case 'swap':
				o.className = !DOMhelp.cssjs('check',o,c1) ? o.className.replace(c2,c1) : o.className.replace(c1,c2); // Does the last part assume that the developer got the order of the arguments wrong?
			break;
			case 'add':
				if (!DOMhelp.cssjs('check', o, c1)) {o.className += o.className ? (' ' + c1) : c1;}
			break;
			case 'remove':
				var rep = o.className.match(' ' + c1) ? (' ' + c1) : c1;
				o.className = o.className.replace(rep, '');
			break;
			case 'check':
				var found = false;
				// ?? add: if (!o.getAttribute('class') { return found; }
				var temparray = o.className.split(' ');
				for (var i=0; i<temparray.length; i++) {
					if (temparray[i] === c1) {found = true;}
				}
				return found;
			break;
		}
	},

	// See Beginning JS, p. 170
    safariClickFix: function() {
        "use strict";
        return false;
    }
}
DOMhelp.addEvent(window, 'load', DOMhelp.init, false);
