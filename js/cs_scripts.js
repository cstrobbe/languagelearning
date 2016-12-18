
// Modifications to the original script: addition of "use strict"; == replaced with ===.
/**
 * Load an external JavaScript without blocking other downloads or page processes.
 * @param {String} url The URL of the JavaScript file. This URL is either an absolute URL, or relative to the HTML file that should load the script.
 * @param {Function} callback The function that should be called when the external JavaScript file has finished loading.
 * @author Nicholas C. Zakas
 * @see Nicholas C. Zakas's article <a href="http://www.nczonline.net/blog/2009/07/28/the-best-way-to-load-external-javascript/">The best way to load external JavaScript</a> (NCZOnline, 28 July 2009).
 * @see Nicholas C. Zakas's article <a href="http://www.nczonline.net/blog/2009/06/23/loading-javascript-without-blocking/">Loading JavaScript without blocking</a> (NCZOnline, 23 June 2009).
 * @see Jack Slingerland's article <a href="http://www.re-cycledair.com/load-javascript-dynamically-with-lazy-load">Load Javascript Dynamically With Lazy Load</a> (Re-Cycled Air, 11 September 2010).
 */
function loadScript(url, callback) {
    "use strict";
    var script = document.createElement("script");
    script.type = "text/javascript";

    if (script.readyState) {  //IE
        script.onreadystatechange = function() {
            if (script.readyState === "loaded" ||
                    script.readyState === "complete") {
                script.onreadystatechange = null;
                callback();
            } // else { console.log("IE: DoMhelp.js not ready");}
        };
    } else {  //Others
        script.onload = function() {
            callback();
        };
    }
    script.src = url;
    document.getElementsByTagName("head")[0].appendChild(script);
}


/**
 * @namespace csrc @@add description.
 * @author Christophe Strobbe
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

var DEBUG = true;

var csrc = {
	init: function() {
	    "use strict";
		if (!document.getElementById || !document.createTextNode) {return;}


		var DOMhelpURL = "http://cstrobbe.github.io/languagelearning/jslibs/DOMhelp.js"; // http://localhost:8088/github/languagelearning/jslibs/DOMhelp.js
		var hostPageURL = document.URL;
        //console.log("hostPageURL (document.URL) = " + hostPageURL);
		if (hostPageURL.indexOf("localhost:8088") > 0) { // does not work with "http://localhost:8088/" 
		    DOMhelpURL = DOMhelpURL.replace("http://cstrobbe.github.io/languagelearning", "http://localhost:8088/github/languagelearning");
		    //console.log("DOMhelpURL = " + DOMhelpURL);
		}


        loadScript(DOMhelpURL, function() {
            if (DEBUG) { console.log("DOMhelp.js loaded."); }
        });
        //console.log("window.location = " + window.location);
        //console.log("document.location = " + document.location);
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

	// @@check: is NodeList object an array? Check at https://www.w3.org/TR/selectors-api/#nodelist & https://developer.mozilla.org/en-US/docs/Web/API/NodeList 
    /**
     * Get all heading elements (h1 - h6) that are descendants of the given context (a DOM node).
     * @param {Element} context DOM node in which the headings should be found.
     * @returns {Array} A NodeList object containing all the headings in the given context. Note: This list is not live.
     * @author Christophe Strobbe
     */
	getHeadingsInContext: function(nodes) {
        "use strict";
        var context         = null,
            headinglist     = null;

        // if (DEBUG) console.log("nodes length = " + nodes.length);
        context = nodes[0];
        if (DEBUG) console.log("context name = " + context.tagName);

        if (context) {
            // element.querySelectorAll(): https://developer.mozilla.org/en-US/docs/Web/API/Element/querySelectorAll
            headinglist = context.querySelectorAll('h1', 'h2', 'h3', 'h4', 'h5', 'h6');
        }
        if (DEBUG) console.log("headinglist.length = " + headinglist.length);
	    return headinglist; // NodeList object; 
	    // see:  http://www.w3schools.com/jsref/met_document_queryselectorall.asp
	    // see: https://developer.mozilla.org/en-US/docs/Web/API/Element/querySelectorAll 
	    // see: https://www.w3.org/TR/selectors-api/#queryselectorall 
	}
};

csrc.addEvent(window, 'load', csrc.init, false);

csrc.getHeadingsInContext(document.getElementsByTagName("main"));

