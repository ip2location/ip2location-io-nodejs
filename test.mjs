import ip2locationio from "ip2location-io-nodejs";

let mykey = "YOUR_API_KEY";

// Configures IP2Location.io API key
let config = new ip2locationio.Configuration(mykey);
let ipl = new ip2locationio.IPGeolocation(config);

let myip = "8.8.8.8";
let lang = "en"; // language parameter is only available for Plus and Security plans

// Lookup ip address geolocation data
ipl.lookup(myip, lang)
  .then((data) => {
    // print the data in json format
    console.log(data)
  })
  .catch((error) => {
    // print the error
    console.log(error)
  });

let whois = new ip2locationio.DomainWhois(config);

let mydomain = "locaproxy.com";

// Lookup domain information
whois.lookup(mydomain)
  .then((data) => {
    // print the data in json format
    console.log(data)
  })
  .catch((error) => {
    // print the error
    console.log(error)
  });

// Convert normal text to punycode
console.log(whois.getPunycode("täst.de"));

// Convert punycode to normal text
console.log(whois.getNormalText("xn--tst-qla.de"));

// Get domain name from URL
console.log(whois.getDomainName("https://www.example.com/exe"));

// Get domain extension (gTLD or ccTLD) from URL or domain name
console.log(whois.getDomainExtension("example.com"));

// Lookup hosted domain information
let hd = new ip2locationio.HostedDomain(config);

let myip2 = "8.8.8.8";

// Lookup ip address hosted domain data
hd.lookup(myip2)
  .then((data) => {
    // print the data in json format
    console.log(data)
  })
  .catch((error) => {
    // print the error
    console.log(error)
  });
