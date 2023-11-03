# Quickstart

## Dependencies

This module requires API key to function. You may sign up for a free API key at <https://www.ip2location.io/pricing>.

## Installation
```bash

npm install ip2location-io-nodejs

```

## Sample Codes

### Lookup IP Address Geolocation Data

You can make a geolocation data lookup for an IP address as below:

```javascript
import ip2locationio from "ip2location-io-nodejs";

// Configures IP2Location.io API key
let mykey = "YOUR_API_KEY";
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
```

### Lookup Domain Information

You can lookup domain information as below:

```javascript
import ip2locationio from "ip2location-io-nodejs";

// Configures IP2Location.io API key
let mykey = "YOUR_API_KEY";
let config = new ip2locationio.Configuration(mykey);

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
```

### Convert Normal Text to Punycode

You can convert an international domain name to Punycode as below:

```javascript
import ip2locationio from "ip2location-io-nodejs";

let config = new ip2locationio.Configuration();
let whois = new ip2locationio.DomainWhois(config);

// Convert normal text to punycode
console.log(whois.getPunycode("täst.de"));
```

### Convert Punycode to Normal Text

You can convert a Punycode to international domain name as below:

```javascript
import ip2locationio from "ip2location-io-nodejs";

let config = new ip2locationio.Configuration();
let whois = new ip2locationio.DomainWhois(config);

// Convert punycode to normal text
console.log(whois.getNormalText("xn--tst-qla.de"));
```

### Get Domain Name

You can extract the domain name from an url as below:

```javascript
import ip2locationio from "ip2location-io-nodejs";

let config = new ip2locationio.Configuration();
let whois = new ip2locationio.DomainWhois(config);

// Get domain name from URL
console.log(whois.getDomainName("https://www.example.com/exe"));
```

### Get Domain Extension

You can extract the domain extension from a domain name or url as below:

```javascript
import ip2locationio from "ip2location-io-nodejs";

let config = new ip2locationio.Configuration();
let whois = new ip2locationio.DomainWhois(config);

// Get domain extension (gTLD or ccTLD) from URL or domain name
console.log(whois.getDomainExtension("example.com"));
```