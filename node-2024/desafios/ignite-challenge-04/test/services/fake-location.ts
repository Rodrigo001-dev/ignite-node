import { faker } from '@faker-js/faker';

import { Location } from '@/domain/account/application/services/location';

export class FakeLocation implements Location {
  async search(): Promise<{ latitude: number; longitude: number }> {
    const latitude = faker.location.latitude();
    const longitude = faker.location.longitude();

    return {
      latitude,
      longitude,
    };
  }
}
