import { Injectable } from '@angular/core';
import * as CryptoJS from 'crypto-js';

@Injectable(
    {
        providedIn: 'root'
    }
)
export class EncryptionService {
    conversionEncryptOutputforKey: any;
    encrpyttobase64: any;
    conversionDecryptOutputForValue: any;
    valueOfSession: string;
    base64ForKey: string;
    DecryptedKey: any;
    Key: any;
    Value: any;
    encryptedKeyOutput: any;
    DecryptedValue: any;
    keyData: any;

    //method is used to encrypt Text 
    public encryptingProcess(key, value) {
        //Assigning key and value to variable
        this.Key = key;
        this.Value = value;

        //Encrypting the  key 
        this.encryptedKeyOutput = CryptoJS.AES.encrypt(this.Key, this.Value).toString();

        //Encrypting the above encryptedKeyOutput  using base64
        this.encrpyttobase64 = btoa(this.encryptedKeyOutput);

        //Encrypting the  Value 
        this.conversionDecryptOutputForValue = CryptoJS.AES.encrypt(this.Value, this.encrpyttobase64).toString();

        //Storing the output after encrypting key and value in local Storage
        localStorage.setItem(this.encryptedKeyOutput, this.conversionDecryptOutputForValue);

    }

    public decryptingProcess(params: any) {
        const keys = Object.keys(localStorage),
            i = keys.length;
        var rtnValue = "";
        keys.forEach(element => {
            var id = element;
            var arr = id.split("-");
           
            if ( arr[1] !== "usec" && arr[0] !== "_grecaptcha" && element !== "getSessionStorage") {
              
                // tslint:disable-next-line: no-debugger
                //Encrypting the key using base 64
                this.base64ForKey = btoa(element);

                // Getting the value with the help of key
                this.valueOfSession = localStorage.getItem(element);

                //Decrypting the value 
                this.DecryptedValue = CryptoJS.AES.decrypt(this.valueOfSession, this.base64ForKey).toString(CryptoJS.enc.Utf8);

                //  Decrypting the  Key
                this.DecryptedKey = CryptoJS.AES.decrypt(element, this.DecryptedValue).toString(CryptoJS.enc.Utf8);
                if (params === this.DecryptedKey) {
                    rtnValue = this.DecryptedValue;
                }
              
            }

        });

        return rtnValue;
    }

    /**
     * getDecryptedValue
     */
    public getDecryptedValue() {
        switch (this.keyData) {
            case this.DecryptedKey: {
                //statements; 
                return this.DecryptedValue;
                break;
            }
            default: {
                //statements; 
                return this.DecryptedValue;
                break;
            }
        }
        // if (this.DecryptedKey === this.keyData) {

        //     // return this.DecryptedValue;
        //     return this.DecryptedValue;

        // }
        // else {
        //     return ' Invalid key, Please check the key ';
        // }

    }

    encryptAesToString(stringToEncrypt: string, key: string): string {
        // first way
        // let encrypted;
        // try {
        //   encrypted = CryptoJS.AES.encrypt(JSON.stringify(stringToEncrypt), key);
        // } catch (e) {
        //   console.log(e);
        // }
        // encrypted = CryptoJS.enc.Hex.stringify(encrypted.ciphertext);
        // return encrypted;
    
        // second way
        // var b64 = CryptoJS.AES.encrypt(stringToEncrypt, key).toString();
        // var e64 = CryptoJS.enc.Base64.parse(b64);
        // var eHex = e64.toString(CryptoJS.enc.Hex);
        // return eHex;
    
        // third way
        const stringToEncryptStr = stringToEncrypt.toString();
        const key2 = CryptoJS.enc.Utf8.parse(key);
        const iv = CryptoJS.enc.Utf8.parse(key);
        const encrypted = CryptoJS.AES.encrypt(stringToEncryptStr, key2, {
          keySize: 16,
          iv: iv,
          mode: CryptoJS.mode.ECB,
          padding: CryptoJS.pad.Pkcs7,
        });
        let eHex = CryptoJS.enc.Hex.stringify(encrypted.ciphertext);
        return encrypted;
      }
    
      decryptAesformString(value, keys): string {

        var key = CryptoJS.enc.Utf8.parse(keys);
        var iv = CryptoJS.enc.Utf8.parse(keys);
        var decrypted = CryptoJS.AES.decrypt(value, key, {
          keySize: 16,
          iv: iv,
          mode: CryptoJS.mode.ECB,
          padding: CryptoJS.pad.Pkcs7,
        });
    
        return decrypted.toString(CryptoJS.enc.Utf8);
      
      }
}