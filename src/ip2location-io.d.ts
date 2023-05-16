export class Configuration {
    /**
     * Reads and stores the IP2Location.io API key.
     *
     * @param key The IP2Location.io API key.
     */
    constructor(key: any);
    /**
     * Returns the IP2Location.io API key.
     *
     * @returns The IP2Location.io API key.
     */
    getApiKey(): string;
    /**
     * Returns the SDK version.
     *
     * @returns The SDK version.
     */
    getVersion(): string;
    #private;
}
export class IPGeolocation {
    /**
     * Reads and stores the Configuration object.
     *
     * @param key The Configuration object.
     */
    constructor(config: any);
    /**
     * Returns the object containing the geolocation data.
     *
     * @param myIP The IP address to query.
     * @param lang The language to translate.
     * @returns The geolocation data.
     */
    lookup(myIP: any, lang: any): Promise<any>;
    #private;
}
export class DomainWhois {
    /**
     * Reads and stores the Configuration object.
     *
     * @param key The Configuration object.
     */
    constructor(config: any);
    /**
     * Returns the object containing the WHOIS data.
     *
     * @param myDomain The domain name to query.
     * @returns The WHOIS data.
     */
    lookup(myDomain: any): Promise<any>;
    /**
     * Converts domain name to Punycode equivalent.
     *
     * @param domain Domain name to convert to Punycode.
     * @returns Punycode for the domain.
     */
    getPunycode(domain: any): any;
    /**
     * Converts Punycode to domain name equivalent.
     *
     * @param domain Punycode to convert to domain name.
     * @returns Domain name for the Punycode.
     */
    getNormalText(domain: any): any;
    /**
     * Returns the domain name from an URL.
     *
     * @param fullURL The URL to extract the domain name.
     * @returns Domain name for the URL.
     */
    getDomainName(fullURL: any): any;
    /**
     * Returns the domain extension from an URL/domain.
     *
     * @param str The URL/domain to extract the domain extension.
     * @returns Domain extension for the URL/domain.
     */
    getDomainExtension(str: any): any;
    #private;
}