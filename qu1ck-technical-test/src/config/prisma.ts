import { PrismaClient } from "@prisma/client";

class Singleton {
  private prismaInstance: PrismaClient;
  constructor() {}
  public getInstance() {
    if (!this.prismaInstance) {
      this.prismaInstance = new PrismaClient();
    }
    return this.prismaInstance;
  }
}

export const prisma = new Singleton().getInstance();
