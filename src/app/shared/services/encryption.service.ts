
import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
//import { scrypt, randomBytes, timingSafeEqual, publicEncrypt, publicDecrypt } from "crypto";
//import * as crypto from 'crypto';
import {  AES, enc, mode, pad, format,algo } from 'crypto-js';


import { Buffer } from 'buffer/' 

function splitEncryptedText( encryptedText: string ) {
  return {
      ivString: encryptedText.slice( 0, 32 ),
      encryptedDataString: encryptedText.slice( 32 ),
  }
}

@Injectable({
  providedIn: 'root'
})
export class EncryptionService {
  encoding: BufferEncoding = 'hex';
  key: string = environment.enc_key;
 
  constructor(
  ) { }

  

  public getIdEncrypted(nId: number){
    return this.encrypt(""+nId);
  } 
  public getIdEncryptedUrlEncoded(nId: number){
    return encodeURIComponent( this.encrypt(""+nId));
  }

  public getIdDecrypted(nId: string){
    return this.decrypt(""+nId);
  }
  public encrypt( dataToEncrypt:string) {
    try{
        return AES.encrypt(dataToEncrypt, environment.enc_key,{
          keySize: 16,
          mode: mode.CBC,
          padding: pad.Pkcs7,
        }).toString();
    }catch(err){
      return "";

    }
  }

  public  decrypt(encryptedBase64) {
    const decrypted = AES.decrypt(encryptedBase64, environment.enc_key,{
      keySize: 16,
      mode: mode.CBC,
      padding: pad.Pkcs7

    });
    if (decrypted) {
      try {
       // console.log(decrypted);
        const str = decrypted.toString(enc.Utf8);
        if (str.length > 0) {
          return str;
        } else {
          return '';
        }
      } catch (e) {
        return '';
      }
    }
    return '';
  }



  /*public encrypt( plaintext: string ) {
    try {
        const iv = crypto.randomBytes( 16 );
        const cipher = crypto.createCipheriv( 'aes-256-cbc', this.key, iv );

        const encrypted = Buffer.concat( [
            cipher.update(
                plaintext, 'utf8'
            ),
            cipher.final(),
        ] );

        return iv.toString( this.encoding ) + encrypted.toString( this.encoding );

    } catch (e) {
        console.error( e );
        return "";
    }
};

public decrypt( cipherText: string ) {
    const {
        encryptedDataString,
        ivString,
    } = splitEncryptedText( cipherText );

    try {
        const iv = Buffer.from( ivString, this.encoding );
        const encryptedText = Buffer.from( encryptedDataString, this.encoding );

        const decipher = crypto.createDecipheriv( 'aes-256-cbc', this.key, iv );

        const decrypted = decipher.update( encryptedText );
        return Buffer.concat( [ decrypted, decipher.final() ] ).toString();
    } catch (e) {
        console.error( e );
        return "";
    }
}*/







}
