const time2Ago = (ts) => {
    // This function computes the delta between the
    // provided timestamp and the current time, then test
    // the delta for predefined ranges.
    var d=new Date();  // Gets the current time
    ts = ts/1000;
    var nowTs = Date.parse(d.toString())/1000; // getTime() returns milliseconds, and we need seconds, hence the Math.floor and division by 1000

    var seconds = nowTs-ts;

    // more that two days
    if (seconds > 2*24*3600) {
       return "a few days ago";
    }
    // a day
    if (seconds > 24*3600) {
       return "yesterday";
    }

    if (seconds > 3600) {
       return "a few hours ago";
    }
    if (seconds > 1800) {
       return "half an hour ago";
    }
    if (seconds > 120) {
       return Math.floor(seconds/60) + " minutes ago";
    }
    if (seconds > 60) {
        return "one minute ago"
    }
    if (seconds < 60) {
        return "less than one minute ago";
    }
}

export default time2Ago;
