
//--->PHP Functions - Start  
  
  var php = function(){}; 

  //--->Microtime Function - Start
  php.microtime = function(getAsFloat)   
  {
    var s
    var now
    if (typeof performance !== 'undefined' && performance.now) 
    {
      now = (performance.now() + performance.timing.navigationStart) / 1e3
      if (getAsFloat) 
      {
        return now
      }
      // Math.round(now)
      s = now | 0
      return (Math.round((now - s) * 1e6) / 1e6) + ' ' + s
    } else {
      now = (Date.now ? Date.now() : new Date().getTime()) / 1e3
      if (getAsFloat) {
        return now
      }
      // Math.round(now)
      s = now | 0
      return (Math.round((now - s) * 1e3) / 1e3) + ' ' + s;
    }
  }; 
  //--->Microtime Function - End
  
  
  
  //--->UniqueID Function - Start   
  php.uniqid = function(prefix, more_entropy)    
  {
    //   example 1: uniqid();
    //   returns 1: 'a30285b160c14'
    //   example 2: uniqid('foo');
    //   returns 2: 'fooa30285b1cd361'
    //   example 3: uniqid('bar', true);
    //   returns 3: 'bara20285b23dfd1.31879087'

    if (typeof prefix === 'undefined') {
      prefix = ''
    }

    var retId
    var formatSeed = function (seed, reqWidth) {
      seed = parseInt(seed, 10)
        .toString(16) // to hex str
      if (reqWidth < seed.length) {
        // so long we split
        return seed.slice(seed.length - reqWidth)
      }
      if (reqWidth > seed.length) {
        // so short we pad
        return Array(1 + (reqWidth - seed.length))
          .join('0') + seed
      }
      return seed
    }

    // BEGIN REDUNDANT
    if (!this.php_js) {
      this.php_js = {}
    }
    // END REDUNDANT
    if (!this.php_js.uniqidSeed) {
      // init seed with big random int
      this.php_js.uniqidSeed = Math.floor(Math.random() * 0x75bcd15)
    }
    this.php_js.uniqidSeed++

    // start with prefix, add current milliseconds hex string
    retId = prefix
    retId += formatSeed(parseInt(new Date()
      .getTime() / 1000, 10), 8)
    // add seed hex string
    retId += formatSeed(this.php_js.uniqidSeed, 5)
    if (more_entropy) {
      // for more entropy we add a float lower to 10
      retId += (Math.random() * 10)
        .toFixed(8)
        .toString()
    }

    return retId
  };
  //--->UniqueID Function - End


  php.str_replace = function  (search, replace, string_containing_text, countObj) 
  {
    //   example 1: str_replace(' ', '.', 'Code With Mark')
    //   returns 1: 'Code.With.Mark'
    //   example 2: str_replace(['{name}', 'l'], ['hello', 'm'], '{name}, lars')
    //   returns 2: 'hemmo, mars'
    //   example 3: str_replace(Array('S','F'),'x','ASDFASDF')
    //   returns 3: 'AxDxAxDx'
    //   example 4: var countObj = {}
    //   example 4: str_replace(['A','D'], ['x','y'] , 'ASDFASDF' , countObj)
    //   example 4: var $result = countObj.value
    //   returns 4: 4 
    var i = 0
    var j = 0
    var temp = ''
    var repl = ''
    var sl = 0
    var fl = 0
    var f = [].concat(search)
    var r = [].concat(replace)
    var s = string_containing_text
    var ra = Object.prototype.toString.call(r) === '[object Array]'
    var sa = Object.prototype.toString.call(s) === '[object Array]'
    s = [].concat(s)

    var $global = (typeof window !== 'undefined' ? window : GLOBAL)
    $global.$locutus = $global.$locutus || {}
    var $locutus = $global.$locutus
    $locutus.php = $locutus.php || {}

    if (typeof (search) === 'object' && typeof (replace) === 'string') {
      temp = replace
      replace = []
      for (i = 0; i < search.length; i += 1) {
        replace[i] = temp
      }
      temp = ''
      r = [].concat(replace)
      ra = Object.prototype.toString.call(r) === '[object Array]'
    }

    if (typeof countObj !== 'undefined') {
      countObj.value = 0
    }

    for (i = 0, sl = s.length; i < sl; i++) {
      if (s[i] === '') {
        continue
      }
      for (j = 0, fl = f.length; j < fl; j++) {
        temp = s[i] + ''
        repl = ra ? (r[j] !== undefined ? r[j] : '') : r[0]
        s[i] = (temp).split(f[j]).join(repl)
        if (typeof countObj !== 'undefined') {
          countObj.value += ((temp.split(f[j])).length - 1)
        }
      }
    }

    return sa ? s : s[0]
  };

  php.Decode = function  (input) 
  {
    //Decode the String from PHP ONLY!
    //i.e. base64_encode('codewithmark') will out put: Y29kZXdpdGhtYXJr
    var keyStr = "ABCDEFGHIJKLMNOP" +
    "QRSTUVWXYZabcdef" +
    "ghijklmnopqrstuv" +
    "wxyz0123456789+/" +
    "=";

     var output = "";
     var chr1, chr2, chr3 = "";
     var enc1, enc2, enc3, enc4 = "";
     var i = 0;

     // remove all characters that are not A-Z, a-z, 0-9, +, /, or =
     var base64test = /[^A-Za-z0-9\+\/\=]/g;

     input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");

     do {
        enc1 = keyStr.indexOf(input.charAt(i++));
        enc2 = keyStr.indexOf(input.charAt(i++));
        enc3 = keyStr.indexOf(input.charAt(i++));
        enc4 = keyStr.indexOf(input.charAt(i++));

        chr1 = (enc1 << 2) | (enc2 >> 4);
        chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
        chr3 = ((enc3 & 3) << 6) | enc4;

        output = output + String.fromCharCode(chr1);

        if (enc3 != 64) {
           output = output + String.fromCharCode(chr2);
        }
        if (enc4 != 64) {
           output = output + String.fromCharCode(chr3);
        }

        chr1 = chr2 = chr3 = "";
        enc1 = enc2 = enc3 = enc4 = "";

     } while (i < input.length);

     return unescape(output); 
  };
//--->PHP Functions - End