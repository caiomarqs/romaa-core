import http from "http"
const dontSleep = _ => {
    setInterval(function () {
        http.get("http://romaa-core.herokuapp.com/");
    }, 600000) //10min 
}

export { dontSleep }