export = StringHelper;

declare namespace StringHelper {
    /**
     * Takes a plain string and encodes it
     * @param stringToEncode the plain string you wish to encode
     * @returns encoded string
     */
    export function encode(stringToEncode: string): string;

    /**
     * Decode a previously encoded string
     * @param stringToDecode - the encoded string you wish to decode
     * @returns decoded plaintext string
     */
    export function decode(stringToDecode: string): string;

    /**
     * Takes plain string and converts the characters for use in a url slug
     * @param string Plain string to convert
     * @param separator (optional) Word separator. Defaults to '-'
     * @returns string
     */
    export function slugify(string: string, separator?: string): string;

    /**
     * Generates token of given length
     * @param  {number} length The length of the generated token
     * @param  {boolean} lowCase (optional) Include lowercase letters?
     * @param  {boolean} highCase (optional) Include uppercase letters?
     * @param  {boolean} numbers (optional) Include numbers?
     * @returns string
     */
    export function generateToken(length: number, lowCase?: boolean, highCase?: boolean, numbers?: boolean): string;
}
