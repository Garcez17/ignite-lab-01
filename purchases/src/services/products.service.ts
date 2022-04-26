import { Injectable } from '@nestjs/common';
import slugify from 'slugify';

import { PrismaService } from '../database/prisma/prisma.service';

interface CreateProductParams {
  title: string;
}

@Injectable()
export class ProductsService {
  constructor(private prisma: PrismaService) {}

  public async listAllProducts() {
    return this.prisma.product.findMany();
  }

  public async getProductById(id: string) {
    return this.prisma.product.findUnique({ where: { id } });
  }

  public async createProduct({ title }: CreateProductParams) {
    const slug = slugify(title, {
      lower: true,
    });

    const findExistentProduct = await this.prisma.product.findUnique({
      where: {
        slug,
      },
    });

    if (findExistentProduct)
      throw new Error('Another project with same slug already exits');

    return this.prisma.product.create({
      data: {
        title,
        slug,
      },
    });
  }
}
