/**
* AWS request signer.
* Refer to {@link http://docs.aws.amazon.com/general/latest/gr/sigv4_signing.html|Signature Version 4}
*
* @class Signer
*/
declare class Signer {
    static sign: (request: any, access_info: any, service_info?: any) => any;
}
export default Signer;
export { Signer };
