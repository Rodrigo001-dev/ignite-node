import { makeOrder } from 'test/factories/make-order';
import { InMemoryCustomerAddressesRepository } from 'test/repositories/in-memory-customer-addresses-repository';
import { InMemoryCustomersRepository } from 'test/repositories/in-memory-customers-repository';
import { InMemoryImagesRepository } from 'test/repositories/in-memory-images-repository';
import { InMemoryNotificationsRepository } from 'test/repositories/in-memory-notifications-repository';
import { InMemoryOrderImagesRepository } from 'test/repositories/in-memory-order-images-repository';
import { InMemoryOrdersRepository } from 'test/repositories/in-memory-orders-repository';
import { waitFor } from 'test/utils/wait-for';
import { SpyInstance } from 'vitest';

import {
  SendNotificationUseCase,
  SendNotificationUseCaseRequest,
  SendNotificationUseCaseResponse,
} from '../use-cases/send-notification';
import { OnOrderDelivered } from './on-order-delivered';

let inMemoryCustomersRepository: InMemoryCustomersRepository;
let inMemoryCustomerAddressesRepository: InMemoryCustomerAddressesRepository;
let inMemoryOrderImagesRepository: InMemoryOrderImagesRepository;
let inMemoryImagesRepository: InMemoryImagesRepository;
let inMemoryOrdersRepository: InMemoryOrdersRepository;
let inMemoryNotificationsRepository: InMemoryNotificationsRepository;

let sendNotification: SendNotificationUseCase;

let sendNotificationExecuteSpy: SpyInstance<
  [SendNotificationUseCaseRequest],
  Promise<SendNotificationUseCaseResponse>
>;

describe('On Order Delivered', () => {
  beforeEach(() => {
    inMemoryCustomerAddressesRepository =
      new InMemoryCustomerAddressesRepository();
    inMemoryCustomersRepository = new InMemoryCustomersRepository();
    inMemoryOrderImagesRepository = new InMemoryOrderImagesRepository();
    inMemoryImagesRepository = new InMemoryImagesRepository();
    inMemoryOrdersRepository = new InMemoryOrdersRepository(
      inMemoryOrderImagesRepository,
      inMemoryImagesRepository,
      inMemoryCustomersRepository,
      inMemoryCustomerAddressesRepository,
    );
    inMemoryNotificationsRepository = new InMemoryNotificationsRepository();

    sendNotification = new SendNotificationUseCase(
      inMemoryNotificationsRepository,
    );

    sendNotificationExecuteSpy = vi.spyOn(sendNotification, 'execute');

    new OnOrderDelivered(sendNotification);
  });

  it('should send notification when order is delivered', async () => {
    const order = makeOrder();
    inMemoryOrdersRepository.items.push(order);

    order.deliver();

    inMemoryOrdersRepository.save(order);

    await waitFor(() => {
      expect(sendNotificationExecuteSpy).toHaveBeenCalled();
    });
  });
});
