import { PaginationParams } from '@/core/repositories/pagination-params';
import { NotificationsRepository } from '@/domain/notification/application/repositories/notifications-repository';
import { Notification } from '@/domain/notification/enterprise/entities/notification';

export class InMemoryNotificationsRepository
  implements NotificationsRepository
{
  public items: Notification[] = [];

  async findManyByRecipientId(
    recipientId: string,
    { page, perPage }: PaginationParams,
  ): Promise<Notification[]> {
    const notifications = this.items
      .filter((item) => item.recipientId.toString() === recipientId)
      .slice((page - 1) * perPage, page * perPage);

    return notifications;
  }

  async findById(id: string): Promise<Notification | null> {
    const notification = this.items.find((item) => item.id.toString() === id);

    if (!notification) {
      return null;
    }

    return notification;
  }

  async create(notification: Notification): Promise<void> {
    this.items.push(notification);
  }

  async save(notification: Notification): Promise<void> {
    const itemIndex = this.items.findIndex((item) =>
      item.id.equals(notification.id),
    );

    if (itemIndex >= 0) {
      this.items[itemIndex] = notification;
    }
  }
}
