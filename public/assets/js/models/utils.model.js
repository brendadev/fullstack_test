define([
    'underscore',
    'backbone'
], function(_, Backbone
    ){
    var UtilsModel = Backbone.Model.extend({
        initialize: function() {
            this.debugName = "utilities";
            this.browserName = this.getBrowserName(this.dataBrowser) || "Other";
            this.browserVersion = this.getBrowserVersion(navigator.userAgent) || this.getBrowserName(navigator.appVersion) || "Unknown";
        },
        getQueryStringParameter: function(key){
            return unescape(window.location.search.replace(new RegExp("^(?:.*[&\\?]" + escape(key).replace(/[\.\+\*]/g, "\\$&") + "(?:\\=([^&]*))?)?.*$", "i"), "$1"));
        },
        getDataParameter: function(data,key){
            return unescape(data.replace(new RegExp("^(?:.*[&\\?]" + escape(key).replace(/[\.\+\*]/g, "\\$&") + "(?:\\=([^&]*))?)?.*$", "i"), "$1"));
        },
        getEventElement:function(e) {
            var targ;
            if (!e) var e = window.event;
            if (e.target) targ = e.target;
            else if (e.srcElement) targ = e.srcElement;
            if (targ.nodeType == 3) // defeat Safari bug
                targ = targ.parentNode;
            return targ;
        },
        trim:function(str) {
            var s = str.replace(/^\s+|\s+$/g, '');
            s = s.replace(/(\r\n|\n|\r)/gm,"");
            return s;
        },
        capitalize:function(s) {
            var re = /(\b[a-z](?!\s))/g;
            return s.replace(re, function(x){return x.toUpperCase();});
        },
        isHtml:function(val) {
            var doc = document.createElement('div');
            try {
                doc.innerHTML = val;
                doc = null;
                return true;
            } catch(e) {
                return false;
            }
        },
        stripHtml: function(val) {
            var re = /(<([^>]+)>)/ig;
            return val.replace(re, "");
        },
        highlightKeyword:function(s,filter) {
            var re = new RegExp(""+ filter + "","gi");
            var match = re.exec(s);
            s = s.replace(/&#39;/g, "'");
            if (match != null) {
                return s.replace(re,'<b class="bgGrayLevel4">' + match[0] + '</b>');
            } else {
                return s;
            }
        },
        stripKeyWordsHighlight:function(s) {
            return s.replace(/\<b>/gi,'').replace(/<\/b>/g,'');
        },
        makeDateFromString:function(s) {
            if (s.length == 4) {
                return new Date('01/01/' + s);
            } else {
                return new Date(s);
            }
        },
        makeUrl: function(base) {
            window.utils.output(this.debugName,window.location.pathname);
            //if (window.location.pathname.length > 1) {
            //    return window.location.pathname + base;
            //} else {
            return '/' + base;
            //}
        },
        makeElipsis: function(val,len) {
            if (val.length > len) {
                val = val.substring(0,len-3) + '...';
                return val;
            } else {
                return val;
            }
        },
        isCapsKey: function(event) {
            var charCode = false;
            if (event.which) {
                charCode = event.which;
            } else if (event.keyCode) {
                charCode = event.keyCode;
            }

            var shifton = false;
            if (event.shiftKey) {
                shifton = event.shiftKey;
            } else if (event.modifiers) {
                shifton = !!(event.modifiers & 4);
            }

            if (charCode >= 65 && charCode <= 90 && shifton) {
                return true;
            }
            return false;
        },
        splitWords: function(val) {
            if (typeof val != 'undefined') {
                if (val.indexOf(' ') > 1) {
                    var out = new Array();
                    //var re = /[ |,|;|\.|\?|!|, |; |\. |\? |! ]/;
                    val = val.replace(/[\.,-\/#!$%\^&\*;:{}=\-_`~()]/g,"");
                    val = val.replace(/\s{2,}/g," ");
                    out = val.split(' ');
                    return out;
                }  else {
                    if (val.length > 0) {
                        var arr = new Array();
                        arr.push(val);
                        return arr;
                    } else {
                        return new Array();
                    }
                }
            } else {
                return new Array();
            }
        },
        removeDuplicatesInArray: function(input) {
            var uniqueValues = [];
            if (input.length > 0) {
                _.each(input, function(el){
                    if($.inArray(el, uniqueValues) === -1 && el.length > 0) uniqueValues.push(el);
                });
            }
            return uniqueValues;
        },
        isValidString: function(val) {
            if (val.length > 1) {
                return true;
            } else {
                return false;
            }
        },
        isBlank: function(str) {
            if(typeof str != 'undefined') {
                return str.length == 0 ? true : false;
            } else {
                return true;
            }
        },
        isValidEmailToken:function(val) {
            return (val.length==64) ? true : false;
        },
        isValidName: function(val) {
            var re=/.{2,}/;
            return re.test(val);
        },
        isValidDisclaimer: function(val) {
            var re=/.{30,}/;
            return re.test(val);
        },
        isValidPwd: function(val) {
            var re=/.{6,}/;
            return re.test(val);
        },
        isValidPassword: function(val) {
            var re=/.{6,}/;
            return re.test(val);
        },
        isValidScreenName: function(val) {
            var re=/.{4,}/;
            return re.test(val);
        },
        isValidEmail: function(val) {
            var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            return re.test(val);
        },
        // Check for valid credit card type/number
        creditCardList : [
            //type      prefix   length
            ["amex",    "34",    15],
            ["amex",    "37",    15],
            ["disc",    "6011",  16],
            ["mc",      "51",    16],
            ["mc",      "52",    16],
            ["mc",      "53",    16],
            ["mc",      "54",    16],
            ["mc",      "55",    16],
            ["visa",    "4",     13],
            ["visa",    "4",     16]
        ],
        dataBrowser:[
            { string: navigator.userAgent, subString: "Chrome",  identity: "Chrome" },
            { string: navigator.userAgent, subString: "MSIE",    identity: "Explorer" },
            { string: navigator.userAgent, subString: "Firefox", identity: "Firefox" },
            { string: navigator.userAgent, subString: "Safari",  identity: "Safari" },
            { string: navigator.userAgent, subString: "Opera",   identity: "Opera" }
        ],
        getBrowserName: function (data)
        {
            for (var i=0 ; i < data.length ; i++)
            {
                var dataString = data[i].string;
                this.versionSearchString = data[i].subString;

                if (dataString.indexOf(data[i].subString) != -1)
                {
                    return data[i].identity;
                }
            }
        },
        getBrowserVersion: function (dataString)
        {
            var index = dataString.indexOf(this.versionSearchString);
            if (index == -1) return;
            return parseFloat(dataString.substring(index+this.versionSearchString.length+1));
        },
        isTouch:function() {
            switch(navigator.platform.toLowerCase()) {
                case 'iphone':
                    return true;
                    break;
                case 'ipad simulator':
                    return true;
                    break;
                case 'ipad':
                    return true;
                    break;
                default:
                    return false;
            }
        },
        blurForm:function() {
            if (this.isTouch()) {
                document.activeElement.blur();
                window.scrollTo(0,0);
            }
        },
        clickPosition:function(e,svg) {
            var x;
            var y;
            if (e.pageX || e.pageY) {
                x = e.pageX;
                y = e.pageY;
            }
            else if (e.clientX || e.clientY) {
                x = e.clientX;
                y = e.clientY;
            }
            else {
                x = document.body.scrollLeft + document.documentElement.scrollLeft;
                y = document.body.scrollTop + document.documentElement.scrollTop;
            }

            if (typeof svg != 'undefined') {
                x -= svg.offsetLeft;
                y -= svg.offsetTop;
            }
            return {x:x,y:y};
        },
        screenTop: function() {
            var doc = document.documentElement, body = document.body;
            var left = (doc && doc.scrollLeft || body && body.scrollLeft || 0);
            var top = (doc && doc.scrollTop  || body && body.scrollTop  || window.pageYOffset || 0);
            return {top: top, left: left};
        },
        screenSize: function(){
            var w = 0;var h = 0;
            //IE
            if(!window.innerWidth){
                if(!(document.documentElement.clientWidth == 0)){
                    //strict mode
                    w = document.documentElement.clientWidth;h = document.documentElement.clientHeight;
                } else{
                    //quirks mode
                    w = document.body.clientWidth;h = document.body.clientHeight;
                }
            } else {
                //w3c
                w = window.innerWidth;h = window.innerHeight;
            }
            return {width:w,height:h};
        },
        screenCenter: function(){
            var hWnd = (arguments[0] != null) ? arguments[0] : {width:0,height:0};
            var _x = 0;var _y = 0;var offsetX = 0;var offsetY = 0;
            //IE
            if(!window.pageYOffset){
                //strict mode
                if(!(document.documentElement.scrollTop == 0)){offsetY = document.documentElement.scrollTop;offsetX = document.documentElement.scrollLeft;}
                //quirks mode
                else{offsetY = document.body.scrollTop;offsetX = document.body.scrollLeft;}}
            //w3c
            else    {
                offsetX = window.pageXOffset;
                offsetY = window.pageYOffset;
            }
            _x = ((this.screenSize().width-hWnd.width)/2)+offsetX;_y = ((this.screenSize().height-hWnd.height)/2)+offsetY;
            return{x:_x,y:_y};
        },
        resetUiPosition: function() {
            window.scrollTo(0,0);
            $('.leftPanel').css('top', '0px');
        },
        cleanModelViewFromHistory:function(model) {
            var index = 0;
            var splice = new Array();
            _.each(window.viewHistory,function(vh){
                if (typeof vh.data != 'undefined') {
                    if (typeof vh.data.data != 'undefined') {
                        if (typeof vh.data.data.source != 'undefined') {
                            if (parseInt(vh.data.data.source.refId) == model.get('id')) {
                                splice.push(index);
                            }
                        }
                    }
                }
                index++;
            },this);
            index = 0;
            if (splice.length > 0) {
                _.each(splice,function(s){
                    window.viewHistory.splice(s-index,1);
                    index++;
                },this);

            }
        },
        cleanView: function(view) {
            if (view != null) {
                if (this.removeSubViews(view)) {
                    this.removeSubViews(view);
                } else {
                    view.unbind();
                    view.remove();
                }
            }
        },
        removeSubViews: function(v) {
            if (typeof v.subviews != 'undefined') {
                _.each(v.subviews,function(sv){
                    sv.unbind();
                    sv.remove();
                    return true;
                });
            } else {
                return false;
            }
        },
        isPortrait:function() {
            var s = this.screenSize();
            if (s.width < 769) {
                return true;
            } else {
                return false;
            }
        },

        isValidPhone:function(str) {
            var re = /1?\W*([2-9][0-8][0-9])\W*([2-9][0-9]{2})\W*([0-9]{4})(\se?x?t?(\d*))?/; ///^([\(]{1}[0-9]{3}[\)]{1}[ |\-]{0,1}|^[0-9]{3}[\-| ])?[0-9]{3}(\-| ){1}[0-9]{4}$/;
            return re.test(str);
        },
        isValidColor: function (str) {
            return str.match(/^#[a-f0-9]{6}$/i) !== null;
        },
        validateEmail: function(val) {
            var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            return re.test(val);
        },
        validateMessage: function(val) {
            return this.isBlank(val);
        },
        validateSubject: function(val) {
            return this.isBlank(val);
        },
        validateName: function(val) {
            return this.isBlank(val);
        },
        isValidDate:function(val) {
            try {
                var v = new Date(val);
            }catch(e) {
                return false;
            }
            if (isNaN(v.getTime())) {
                return false;
            } else {
                return true;
            }

        },
        /*isBlank: function(val) {
            var re = /\S/;
            return re.test(val);
        },*/
        isInteger: function(val) {
            var re = /^\s*(\+|-)?\d+\s*$/;
            return re.test(val);
        },
        isDigits: function(val) {
            var re = /^\d+$/;
            return re.test(val);
        },
        isDecimal: function(val) {
            var re = /^\s*(\+|-)?((\d+(\.\d+)?)|(\.\d+))\s*$/;
            return re.test(val);
        },
        isValidUrl:function(val) {
            if (typeof val != 'undefined') {
                var re = new RegExp(
                    "^" +
                        "(?:(?:http(s)?)://)?" +
                        "(?:\\S+(?::\\S*)?@)?" +
                        "(?:" +
                        "(?!(?:10|127)(?:\\.\\d{1,3}){3})" +
                        "(?!(?:169\\.254|192\\.168)(?:\\.\\d{1,3}){2})" +
                        "(?!172\\.(?:1[6-9]|2\\d|3[0-1])(?:\\.\\d{1,3}){2})" +
                        "(?:[1-9]\\d?|1\\d\\d|2[01]\\d|22[0-3])" +
                        "(?:\\.(?:1?\\d{1,2}|2[0-4]\\d|25[0-5])){2}" +
                        "(?:\\.(?:[1-9]\\d?|1\\d\\d|2[0-4]\\d|25[0-4]))" +
                        "|" +
                        "(?:(?:[a-z\\u00a1-\\uffff0-9]+-?)*[a-z\\u00a1-\\uffff0-9]+)" +
                        "(?:\\.(?:[a-z\\u00a1-\\uffff0-9]+-?)*[a-z\\u00a1-\\uffff0-9]+)*" +
                        "(?:\\.(?:[a-z\\u00a1-\\uffff]{2,}))" +
                        ")" +
                        "(?::\\d{2,5})?" +
                        "(?:/[^\\s]*)?" +
                        "$", "i"
                );
                return re.test(val);
            } else {
                return false;
            }
        },
        isValidLuhn: function(val) {
            var sum = 0;
            var i;

            for (i = val.length - 2; i >= 0; i -= 2) {
                sum += new Array(0, 2, 4, 6, 8, 1, 3, 5, 7, 9) [parseInt (val.charAt (i), 10)];
            }
            for (i = val.length - 1; i >= 0; i -= 2) {
                sum += parseInt (val.charAt (i), 10);
            }
            return (sum % 10) == 0;
        },
        isValidCC: function(cctype,ccnumber) {
            this.cc = ccnumber.replace (/[^\d]/g,'');
            if (this.isValidLuhn(this.cc)) {
                for (var i in this.creditCardList) {
                    if (this.creditCardList[i][0] == (cctype.toLowerCase ())) {
                        if (this.cc.indexOf (this.creditCardList [i][1]) == 0) {
                            if (this.creditCardList [i][2] == this.cc.length) {
                                return true;
                            }
                        }
                    }
                }
            }
            return false;
        },
        sha256: function(s) {
            var chrsz   = 8;
            var hexcase = 0;

            function safe_add (x, y) {
                var lsw = (x & 0xFFFF) + (y & 0xFFFF);
                var msw = (x >> 16) + (y >> 16) + (lsw >> 16);
                return (msw << 16) | (lsw & 0xFFFF);
            }

            function S (X, n) { return ( X >>> n ) | (X << (32 - n)); }
            function R (X, n) { return ( X >>> n ); }
            function Ch(x, y, z) { return ((x & y) ^ ((~x) & z)); }
            function Maj(x, y, z) { return ((x & y) ^ (x & z) ^ (y & z)); }
            function Sigma0256(x) { return (S(x, 2) ^ S(x, 13) ^ S(x, 22)); }
            function Sigma1256(x) { return (S(x, 6) ^ S(x, 11) ^ S(x, 25)); }
            function Gamma0256(x) { return (S(x, 7) ^ S(x, 18) ^ R(x, 3)); }
            function Gamma1256(x) { return (S(x, 17) ^ S(x, 19) ^ R(x, 10)); }

            function core_sha256 (m, l) {
                var K = new Array(0x428A2F98, 0x71374491, 0xB5C0FBCF, 0xE9B5DBA5, 0x3956C25B, 0x59F111F1, 0x923F82A4, 0xAB1C5ED5, 0xD807AA98, 0x12835B01, 0x243185BE, 0x550C7DC3, 0x72BE5D74, 0x80DEB1FE, 0x9BDC06A7, 0xC19BF174, 0xE49B69C1, 0xEFBE4786, 0xFC19DC6, 0x240CA1CC, 0x2DE92C6F, 0x4A7484AA, 0x5CB0A9DC, 0x76F988DA, 0x983E5152, 0xA831C66D, 0xB00327C8, 0xBF597FC7, 0xC6E00BF3, 0xD5A79147, 0x6CA6351, 0x14292967, 0x27B70A85, 0x2E1B2138, 0x4D2C6DFC, 0x53380D13, 0x650A7354, 0x766A0ABB, 0x81C2C92E, 0x92722C85, 0xA2BFE8A1, 0xA81A664B, 0xC24B8B70, 0xC76C51A3, 0xD192E819, 0xD6990624, 0xF40E3585, 0x106AA070, 0x19A4C116, 0x1E376C08, 0x2748774C, 0x34B0BCB5, 0x391C0CB3, 0x4ED8AA4A, 0x5B9CCA4F, 0x682E6FF3, 0x748F82EE, 0x78A5636F, 0x84C87814, 0x8CC70208, 0x90BEFFFA, 0xA4506CEB, 0xBEF9A3F7, 0xC67178F2);
                var HASH = new Array(0x6A09E667, 0xBB67AE85, 0x3C6EF372, 0xA54FF53A, 0x510E527F, 0x9B05688C, 0x1F83D9AB, 0x5BE0CD19);
                var W = new Array(64);
                var a, b, c, d, e, f, g, h, i, j;
                var T1, T2;

                m[l >> 5] |= 0x80 << (24 - l % 32);
                m[((l + 64 >> 9) << 4) + 15] = l;

                for ( var i = 0; i<m.length; i+=16 ) {
                    a = HASH[0];
                    b = HASH[1];
                    c = HASH[2];
                    d = HASH[3];
                    e = HASH[4];
                    f = HASH[5];
                    g = HASH[6];
                    h = HASH[7];

                    for ( var j = 0; j<64; j++) {
                        if (j < 16) W[j] = m[j + i];
                        else W[j] = safe_add(safe_add(safe_add(Gamma1256(W[j - 2]), W[j - 7]), Gamma0256(W[j - 15])), W[j - 16]);

                        T1 = safe_add(safe_add(safe_add(safe_add(h, Sigma1256(e)), Ch(e, f, g)), K[j]), W[j]);
                        T2 = safe_add(Sigma0256(a), Maj(a, b, c));

                        h = g;
                        g = f;
                        f = e;
                        e = safe_add(d, T1);
                        d = c;
                        c = b;
                        b = a;
                        a = safe_add(T1, T2);
                    }

                    HASH[0] = safe_add(a, HASH[0]);
                    HASH[1] = safe_add(b, HASH[1]);
                    HASH[2] = safe_add(c, HASH[2]);
                    HASH[3] = safe_add(d, HASH[3]);
                    HASH[4] = safe_add(e, HASH[4]);
                    HASH[5] = safe_add(f, HASH[5]);
                    HASH[6] = safe_add(g, HASH[6]);
                    HASH[7] = safe_add(h, HASH[7]);
                }
                return HASH;
            }

            function str2binb (str) {
                var bin = Array();
                var mask = (1 << chrsz) - 1;
                for(var i = 0; i < str.length * chrsz; i += chrsz) {
                    bin[i>>5] |= (str.charCodeAt(i / chrsz) & mask) << (24 - i%32);
                }
                return bin;
            }

            function Utf8Encode(string) {
                if (string.length == 0) return;
                string = string.replace(/\r\n/g,"\n");
                var utftext = "";

                for (var n = 0; n < string.length; n++) {

                    var c = string.charCodeAt(n);

                    if (c < 128) {
                        utftext += String.fromCharCode(c);
                    }
                    else if((c > 127) && (c < 2048)) {
                        utftext += String.fromCharCode((c >> 6) | 192);
                        utftext += String.fromCharCode((c & 63) | 128);
                    }
                    else {
                        utftext += String.fromCharCode((c >> 12) | 224);
                        utftext += String.fromCharCode(((c >> 6) & 63) | 128);
                        utftext += String.fromCharCode((c & 63) | 128);
                    }

                }

                return utftext;
            }

            function binb2hex (binarray) {
                var hex_tab = hexcase ? "0123456789ABCDEF" : "0123456789abcdef";
                var str = "";
                for(var i = 0; i < binarray.length * 4; i++) {
                    str += hex_tab.charAt((binarray[i>>2] >> ((3 - i%4)*8+4)) & 0xF) +
                        hex_tab.charAt((binarray[i>>2] >> ((3 - i%4)*8  )) & 0xF);
                }
                return str;
            }

            s = Utf8Encode(s);
            return binb2hex(core_sha256(str2binb(s), s.length * chrsz));
        },
        outputObject:function(title,o) {
            if (typeof console != 'undefined') {
                console.group(title);
                console.dir(o);
                console.groupEnd();
            }
        },
        output: function(o,s) {
            if (typeof console != 'undefined') {
                console.log(new Date().toUTCString() + ': ' + o + ' - ' + s);
            }
        },
        rawOutput: function(s) {
            if (window.settings.get('debug')) {
                if (typeof console != 'undefined') {
                    console.log(new Date().toUTCString() + ': ' + s);
                }
            }
        },
        trackEvent: function(object,action,label) {
            if (typeof _gaq != 'undefined') {
                _gaq.push(['_trackEvent', object, action, label]);
            }
        },
        supportCookie: function() {
            if (typeof document.cookie == 'undefined') {
                return false;
            } else {
                return true;
            }
        },
        createCookie: function(name,value,days) {
            if (typeof document.cookie == 'undefined') {
                return false
            } else {
                if (days) {
                    var date = new Date();
                    date.setTime(date.getTime()+(days*24*60*60*1000));
                    var expires = "; expires="+date.toGMTString();
                }
                else var expires = "";
                document.cookie = name+"="+value+expires+"; path=/";
                return true;
            }
        },
        readCookie: function(name) {
            var nameEQ = name + "=";
            var ca = document.cookie.split(';');
            for(var i=0;i < ca.length;i++) {
                var c = ca[i];
                while (c.charAt(0)==' ') c = c.substring(1,c.length);
                if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
            }
            return null;
        },
        eraseCookie: function(name) {
            this.createCookie(name,"",-1);
        },
        /**ui methods**/
        setPosition:function(that,elem,horizontal) {
            var position = that.$(elem).position();
            if (horizontal == 'left') {
                that.$('.tooltip').css('top',position.top + 'px').css('left',position.left + 'px');
            } else {
                that.$('.tooltip').css('top',position.top + 'px').css('right',position.right + 'px');
            }

        },
        trackEvent:function(obj,cat) {
            try {
                if (typeof _gaq != 'undefined') {
                    _gaq.push(['_trackEvent', obj, cat, new Date().toUTCString()]);
                }
            } catch(e) {
                this.output(this.debugName,'error in ga ' + e);
            }
        },
        daysBetweenDates:function(firstDate,secondDate) {
            var oneDay = 24*60*60*1000;
            return Math.round(Math.abs((firstDate.getTime() - secondDate.getTime())/(oneDay)));
        },
        addDaysToDate:function(date,days) {
            return date.setDate(date.getDate() + days);
        },
        sortBool: function(a, b) {
            return a == b ?  0
                : a      ? -1
                :          +1;
        },
        sortString: function(a, b) {
            return a == b ?  0
                : a <  b ? -1
                :          +1;
        },
        sortNumber:function(a,b) {
            return a-b;
        },
        sortDate:function(a,b) {
            return a == b ?  0
                : a <  b ? -1
                :          +1;
        },
        makeBins: function(a,b,n,r) {
            if(typeof n === "undefined") n = Math.max(Math.round(b-a)+1,1);
            if(n<2) { return n===1?[a]:[]; }
            var i,ret = Array(n);
            n--;
            for(i=n;i>=0;i--) { ret[i] = Math.ceil(((i*b+(n-i)*a)/n)/r)*r; }
            return ret;
        },
        setChartWidth: function() {
            var w = window.utils.screenSize().width;
            var cw = w-200;//minus left nav
            cw = cw*0.96; //profile div
            cw = cw*0.47; //half width panel

            if (w > 768) {
                return cw;
            } else {
                return w*0.8;
            }

        },
        capitaliseFirstLetter: function(string)
        {
            return string.charAt(0).toUpperCase() + string.slice(1);
        },
        unescapeString:function(s) {
            if (typeof s == 'undefined') {
                return '';
            } else {
                return s.replace("\\","");
            }
        },
        escapeString:function(s) {
            return s.replace(/'/g, "\\'");
        },
        getTimezone:function(){

            var rightNow = new Date();
            var jan1 = new Date(rightNow.getFullYear(), 0, 1, 0, 0, 0, 0);
            var temp = jan1.toGMTString();
            var jan2 = new Date(temp.substring(0, temp.lastIndexOf(" ")-1));
            var std_time_offset = (jan1 - jan2) / (1000 * 60 * 60);

            var june1 = new Date(rightNow.getFullYear(), 6, 1, 0, 0, 0, 0);
            temp = june1.toGMTString();
            var june2 = new Date(temp.substring(0, temp.lastIndexOf(" ")-1));
            var daylight_time_offset = (june1 - june2) / (1000 * 60 * 60);
            var dst;
            if (std_time_offset == daylight_time_offset) {
                dst = "0"; // daylight savings time is NOT observed
            } else {
                dst = "1"; // daylight savings time is observed
            }
            return {
                offset:      std_time_offset,
                dst:         dst
            };
        }
    });
    return UtilsModel;
});

(function() {
    /**
     * Decimal adjustment of a number.
     *
     * @param {String}  type  The type of adjustment.
     * @param {Number}  value The number.
     * @param {Integer} exp   The exponent (the 10 logarithm of the adjustment base).
     * @returns {Number} The adjusted value.
     */
    function decimalAdjust(type, value, exp) {
        // If the exp is undefined or zero...
        if (typeof exp === 'undefined' || +exp === 0) {
            return Math[type](value);
        }
        value = +value;
        exp = +exp;
        // If the value is not a number or the exp is not an integer...
        if (isNaN(value) || !(typeof exp === 'number' && exp % 1 === 0)) {
            return NaN;
        }
        // Shift
        value = value.toString().split('e');
        value = Math[type](+(value[0] + 'e' + (value[1] ? (+value[1] - exp) : -exp)));
        // Shift back
        value = value.toString().split('e');
        return +(value[0] + 'e' + (value[1] ? (+value[1] + exp) : exp));
    }

    // Decimal round
    if (!Math.round10) {
        Math.round10 = function(value, exp) {
            return decimalAdjust('round', value, exp);
        };
    }
    // Decimal floor
    if (!Math.floor10) {
        Math.floor10 = function(value, exp) {
            return decimalAdjust('floor', value, exp);
        };
    }
    // Decimal ceil
    if (!Math.ceil10) {
        Math.ceil10 = function(value, exp) {
            return decimalAdjust('ceil', value, exp);
        };
    }
})();
