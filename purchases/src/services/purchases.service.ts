import { Injectable } from '@nestjs/common';

import { PrismaService } from '../database/prisma/prisma.service';
import { KafkaService } from '../messaging/kafka.service';

interface CreatePurchaseParams {
  customerId: string;
  productId: string;
}

@Injectable()
export class PurchasesService {
  constructor(private prisma: PrismaService, private kafka: KafkaService) {}

  public async listAllPurchases() {
    return this.prisma.purchase.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  public async listAllFromCustomer(id: string) {
    return this.prisma.purchase.findMany({
      where: {
        customer: {
          id,
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  public async createPurchase({ productId, customerId }: CreatePurchaseParams) {
    const product = await this.prisma.product.findUnique({
      where: {
        id: productId,
      },
    });

    if (!product) throw new Error('Product not found');

    const purchase = await this.prisma.purchase.create({
      data: {
        customerId,
        productId: product.id,
      },
    });

    const customer = await this.prisma.customer.findUnique({
      where: {
        id: customerId,
      },
    });

    this.kafka.emit('purchases.new-purchase', {
      customer: {
        authUserId: customer.authUserId,
      },
      product: {
        id: product.id,
        title: product.title,
        slug: product.slug,
      },
    });

    return purchase;
  }
}
