import packageMain from "ip2location-io-nodejs";

let mykey = "YOUR_API_KEY";

// Configures IP2Location.io API key
let config = new packageMain.Configuration(mykey);
let ipl = new packageMain.IPGeolocation(config);

let myip = "8.8.8.8";
let lang = "en"; // language parameter is only available for Plus and Security plans

// Lookup ip address geolocation data
ipl
  .lookup(myip, lang)
  .then((myobj) => console.log(myobj))
  .catch((err) => console.log(err));

let whois = new packageMain.DomainWhois(config);

let mydomain = "locaproxy.com";

// Lookup domain information
whois
  .lookup(mydomain)
  .then((myobj) => console.log(myobj))
  .catch((err) => console.log(err));

// Convert normal text to punycode
console.log(whois.getPunycode("täst.de"));

// Convert punycode to normal text
console.log(whois.getNormalText("xn--tst-qla.de"));

// Get domain name from URL
console.log(whois.getDomainName("https://www.example.com/exe"));

// Get domain extension (gTLD or ccTLD) from URL or domain name
console.log(whois.getDomainExtension("example.com"));
