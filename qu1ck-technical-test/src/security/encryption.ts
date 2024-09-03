import { createCipheriv, createDecipheriv, scrypt } from "crypto";
import { promisify } from "util";

class Encryption {
  private encryptionPassword: string;
  private iv: Buffer;
  private key: Buffer | null;
  private algorithm = "aes-256-gcm";

  constructor() {
    this.encryptionPassword = process.env["EncryptionPassword"];
    this.iv = Buffer.from(process.env["EncryptionIv"], "hex");
  }
  private async getKey() {
    if (!this.key) {
      const key = (await promisify(scrypt)(
        this.encryptionPassword,
        "salt",
        32
      )) as Buffer;
      this.key = key;
      return key;
    }
    return this.key;
  }
  private async getCipher() {
    return createCipheriv(this.algorithm, await this.getKey(), this.iv);
  }
  private async getDecipher() {
    return createDecipheriv(this.algorithm, await this.getKey(), this.iv);
  }
  async encryptText(text: string) {
    const cipher = await this.getCipher();
    let encrypted = cipher.update(text, "utf-8", "hex");
    encrypted += cipher.final("hex");
    return encrypted;
  }
  async decipherText(text: string) {
    const decipher = await this.getDecipher();
    const decrypted = decipher.update(text, "hex", "utf8");
    return decrypted;
  }
}

export const encryption = new Encryption();
