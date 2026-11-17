# IP2Location.io Node.js SDK — IP Geolocation, Domain WHOIS & Hosted Domain Lookup

[![npm version](https://img.shields.io/npm/v/ip2location-io-nodejs.svg)](https://www.npmjs.com/package/ip2location-io-nodejs)
[![npm downloads](https://img.shields.io/npm/dm/ip2location-io-nodejs.svg)](https://www.npmjs.com/package/ip2location-io-nodejs)

**IP2Location.io Node.js SDK** (`ip2location-io-nodejs`) lets Node.js applications retrieve **IPv4 and IPv6 geolocation, ASN, network, and proxy intelligence** through the [IP2Location.io API](https://www.ip2location.io/). The package also includes domain WHOIS and hosted-domain lookup interfaces. It supports both **ES modules and CommonJS**.

**Quick links:** [Get an API key](https://www.ip2location.io/pricing) · [Developer documentation](https://ip2location-io-nodejs.readthedocs.io/en/latest/index.html) · [SDK API reference](https://ip2location-io-nodejs.readthedocs.io/en/latest/code.html) · [npm package](https://www.npmjs.com/package/ip2location-io-nodejs)

## Features

- **IPv4 and IPv6 geolocation:** Country, region, district, city, postal code, approximate coordinates, and time zone.
- **Network and ASN intelligence:** ASN, AS name, ISP, domain, network speed, and additional AS information where available.
- **Proxy and security signals:** Available proxy-related flags, network classifications, and fraud scores, depending on the API plan.
- **Localization and other attributes:** Optional translated place names, mobile network identifiers, country metadata, and other IP intelligence fields.
- **Hosted-domain lookup:** Retrieve domain names associated with an IP address.
- **Domain WHOIS and utilities:** Lookup domain registration information and work with Punycode and domain name helpers. See the WHOIS note below.
- **Node.js module support:** Promise-based lookups with both `import` and `require`.

> **Plan availability:** Response fields and API quotas vary by subscription plan and IP address. See [pricing and feature availability](https://www.ip2location.io/pricing).

## SDK components

| Component | Description |
| --- | --- |
| `new Configuration(apiKey)` | Creates API configuration using your key. |
| `new IPGeolocation(config)` | Initializes IP geolocation lookups. |
| `IPGeolocation.lookup(ip, language?)` | Retrieves geolocation and available network/security fields; optional translation language. |
| `new HostedDomain(config)` | Initializes hosted-domain lookups. |
| `HostedDomain.lookup(ip, page?)` | Retrieves domains associated with an IP address; optional page number. |
| `new DomainWhois(config)` | Provides the existing domain WHOIS interface and domain utilities. |
| `DomainWhois.lookup(domain)` | Retrieves domain WHOIS information through the existing SDK interface. |
| `DomainWhois.getPunycode()`, `getNormalText()`, `getDomainName()`, `getDomainExtension()` | Domain-related utilities. |

See the [full SDK reference](https://ip2location-io-nodejs.readthedocs.io/en/latest/code.html) for method signatures and response fields.

## API access and query limits

IP2Location.io offers a **Free plan with an API key** as well as paid plans. Current published Free-plan allowances are:

| API service | Free plan (with API key) |
| --- | ---: |
| IP Geolocation API | 50,000 queries/month |
| Domain WHOIS API | 500 queries/month |
| Hosted Domain API | 50 queries/month |

- **SDK authentication:** The examples below configure an API key using `Configuration`.
- **Keyless REST API:** Limited keyless geolocation access is available separately through the [REST API](https://www.ip2location.io/ip2location-documentation); it is not the authentication path demonstrated here.
- **Attribution:** Free-plan usage may require attribution. Check the [pricing page](https://www.ip2location.io/pricing) for conditions.
- **Paid plans:** Refer to the [pricing page](https://www.ip2location.io/pricing) for updated quotas and additional attributes.

## Requirements

- A supported [Node.js](https://nodejs.org/) runtime and npm.
- An [IP2Location.io API key](https://www.ip2location.io/pricing).
- Internet access to the IP2Location.io service.

## Installation

### 1. Create a project and install the SDK

```bash
mkdir ip2location-example
cd ip2location-example
npm init -y
npm install ip2location-io-nodejs
```

### 2. Configure your API key

Set `IP2LOCATION_API_KEY` as an environment variable instead of placing credentials in your source code.

**Linux / macOS:**

```bash
export IP2LOCATION_API_KEY='YOUR_API_KEY'
```

**Windows Command Prompt:**

```bat
set IP2LOCATION_API_KEY=YOUR_API_KEY
```

**Windows PowerShell:**

```powershell
$env:IP2LOCATION_API_KEY = 'YOUR_API_KEY'
```

## Quickstart: IP geolocation lookup

Create `lookup.mjs`:

```javascript
import ip2locationio from 'ip2location-io-nodejs';

const apiKey = process.env.IP2LOCATION_API_KEY;
if (!apiKey) {
  throw new Error('Set IP2LOCATION_API_KEY before running this example.');
}

const config = new ip2locationio.Configuration(apiKey);
const geo = new ip2locationio.IPGeolocation(config);

try {
  const result = await geo.lookup('8.8.8.8');
  console.log(result);
} catch (error) {
  console.error('IP lookup failed:', error.message);
  process.exitCode = 1;
}
```

Run:

```bash
node lookup.mjs
```

The lookup returns a Promise containing the API response. Available fields depend on the queried IP and your subscription plan.

### CommonJS alternative

Use `require()` in a `.cjs` file if your application uses CommonJS:

```javascript
const ip2locationio = require('ip2location-io-nodejs');

const config = new ip2locationio.Configuration(process.env.IP2LOCATION_API_KEY);
const geo = new ip2locationio.IPGeolocation(config);

geo.lookup('8.8.8.8')
  .then(console.log)
  .catch(console.error);
```

## More usage examples

The following examples assume `config` and `geo` have been initialized as in the quickstart. The asynchronous examples can run inside an ES module with top-level `await` or an `async` function.

### Request translated location names

The optional language argument requests translations for eligible continent, country, region, and city names. Translation is available on **Plus and Security** plans.

```javascript
const translated = await geo.lookup('8.8.8.8', 'es');
console.log(translated);
```

### Inspect ASN and network information

Geolocation results may include `asn`, `as`, `isp`, and additional `as_info` fields, depending on the plan.

```javascript
const result = await geo.lookup('8.8.8.8');
console.log({
  asn: result.asn,
  asName: result.as,
  isp: result.isp,
  asInfo: result.as_info
});
```

An **Autonomous System Number (ASN)** identifies a network operated under a common routing policy. ASN lookups can help with traffic analytics, network troubleshooting, and understanding which network operates an IP address. For offline options, see [IP2Location ASN LITE](https://www.ip2location.com/database/lite).

### Inspect available proxy and security information

```javascript
const result = await geo.lookup('8.8.8.8');
console.log({ isProxy: result.is_proxy, fraudScore: result.fraud_score, proxy: result.proxy });
```

These indicators are plan-dependent and should supplement, not replace, other security checks.

### Find domains hosted on an IP address

```javascript
const hosted = new ip2locationio.HostedDomain(config);
const domains = await hosted.lookup('8.8.8.8');
console.log(domains);
```

The SDK also accepts an optional page argument (see the [API reference](https://ip2location-io-nodejs.readthedocs.io/en/latest/code.html)).

### Look up domain WHOIS information

The existing SDK contains a `DomainWhois` class:

```javascript
const whois = new ip2locationio.DomainWhois(config);
const record = await whois.lookup('example.com');
console.log(record);
```

> **WHOIS note:** For new projects requiring domain WHOIS functionality, consider the dedicated [IP2WHOIS Node.js SDK](https://github.com/ip2location/ip2whois-nodejs). The `DomainWhois` interface is retained here to document existing SDK functionality.

### Use domain and Punycode utilities

```javascript
const whois = new ip2locationio.DomainWhois(config);

console.log(whois.getPunycode('täst.de'));
console.log(whois.getNormalText('xn--tst-qla.de'));
console.log(whois.getDomainName('https://www.example.com/path'));
console.log(whois.getDomainExtension('example.com'));
```

## Node.js-specific notes and troubleshooting

| Problem | Suggested check |
| --- | --- |
| `Cannot find package` | Run `npm install ip2location-io-nodejs` in the project directory. |
| Module import issues | Use `import` in `.mjs` or an ES-module project; use `require` in `.cjs` for CommonJS. |
| Missing or invalid API key | Ensure `IP2LOCATION_API_KEY` is set in the same shell or runtime environment. |
| HTTP 400/401 or lookup error | Check the input IP, credentials, plan access, and API error message. |
| Missing response fields | Check the current plan and whether the field is available for that IP. |
| Translation not returned | Check the `language` code and your Plus/Security plan eligibility. |
| Quota exceeded | Review API usage and allowances on the [pricing page](https://www.ip2location.io/pricing). |

Do not commit API keys or expose them in client-side JavaScript. This SDK should be used in trusted Node.js environments.

## Common use cases

- **Localization:** Suggest relevant languages and regional content using approximate IP location.
- **Analytics:** Enrich logs and traffic records with location, ASN, and ISP information.
- **Security:** Add network and proxy indicators to fraud or abuse review workflows.
- **Network research:** Identify autonomous systems and investigate associated IP networks.
- **Domain research:** Explore WHOIS records and hosted-domain information.

## Related IP2Location products

| Product | Purpose |
|---|---|
| [IP2Location.io](https://www.ip2location.io/) | Hosted IP geolocation, ASN, and network intelligence APIs. |
| [IP2Location LITE](https://www.ip2location.com/lite) | Free downloadable IP geolocation and ASN databases for offline use. |
| [IP2Location Database](https://www.ip2location.com/database/ip2location) | Commercial offline IP geolocation databases. |
| [IP2Proxy](https://www.ip2location.com/database/proxy) | IP proxy, VPN, TOR and anonymizer intelligence. |
| [IP2WHOIS](https://www.ip2whois.com/) | Domain WHOIS lookup services. |

## Accuracy and responsible use

IP geolocation is **not GPS**: returned coordinates are approximate and may identify a network or broader area rather than a user's actual position. VPNs, proxies, mobile networks, and shared infrastructure can affect results. Do not use IP intelligence as the sole basis for high-impact decisions.

## Documentation and support

- [Node.js SDK quickstart](https://ip2location-io-nodejs.readthedocs.io/en/latest/quickstart.html)
- [Node.js SDK API reference](https://ip2location-io-nodejs.readthedocs.io/en/latest/code.html)
- [npm package](https://www.npmjs.com/package/ip2location-io-nodejs)
- [IP2Location.io API documentation](https://www.ip2location.io/ip2location-documentation)
- [API plans and query limits](https://www.ip2location.io/pricing)
- [GitHub issues](https://github.com/ip2location/ip2location-io-nodejs/issues)
- [IP2Location.io support](https://www.ip2location.io/contact-us)

## License

Licensed under the **MIT License**. See [LICENSE](./LICENSE).
