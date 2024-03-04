import type { Prisma } from '@prisma/client';

import { OrderImage } from '@/domain/order/enterprise/entities/order-image';

export class PrismaOrderImageMapper {
  static toPrismaUpdate(
    orderImage: OrderImage,
  ): Prisma.ImageUncheckedUpdateInput {
    return {
      orderId: orderImage.orderId.toString(),
    };
  }
}
