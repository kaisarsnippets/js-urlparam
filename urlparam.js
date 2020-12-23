// Get URL parameter
function URLParam(key) {
    var query = window.location.search.substring(1);
    var vars = query.split("&");
    var pms = {};
    for (var i = 0; i < vars.length; i++) {
        var pair = vars[i].split("=");
        var p0 = pair[0];
        var p1 = pair[1];
        if (p0 || p1) {
            typeof p1 !== 'undefined' ?
            pms[p0] = p1 :
            pms[p0] = '';
        }
    }
    if (typeof key !== 'undefined') return pms[key];
    return pms;
}

// Set URL Parameter
function setURLParam(pk, pv, noreload, replace) {
    noreload = noreload || 0;
    replace = replace || false;
    var url = window.location.href;
    var hash = location.hash;
    url = url.replace(hash, '');
    if (url.indexOf(pk + "=") >= 0) {
        var prefix = url.substring(0, url.indexOf(pk));
        var suffix = url.substring(url.indexOf(pk));
        suffix = suffix.substring(suffix.indexOf("=") + 1);
        suffix = (suffix.indexOf("&") >= 0) ?
        suffix.substring(suffix.indexOf("&")) : "";
        url = prefix + pk + "=" + pv + suffix;
    } else if (url.indexOf("?") < 0) {
        url += "?" + pk + "=" + pv;
    } else {
        url += "&" + pk + "=" + pv;
    }
    if (noreload) {
        if (replace) {
            history.replaceState
            (null, null, url+hash);
        } else {
            history.pushState
            (null, null, url+hash);
        }
    } else {
        window.location.href = url + hash;
    }
}
