import { Injectable } from '@nestjs/common';

import { PrismaService } from '../database/prisma/prisma.service';

interface CreateCustomerParams {
  authUserId: string;
}

@Injectable()
export class CustomersService {
  constructor(private prisma: PrismaService) {}

  public async getCustomerByAuthUserId(authUserId: string) {
    return this.prisma.customer.findUnique({ where: { authUserId } });
  }

  public async createCustomer({ authUserId }: CreateCustomerParams) {
    return this.prisma.customer.create({
      data: {
        authUserId,
      },
    });
  }
}
