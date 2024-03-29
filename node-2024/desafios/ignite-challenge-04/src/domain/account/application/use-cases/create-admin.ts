import { Either, left, right } from '@/core/either';
import { Injectable } from '@nestjs/common';

import { Admin } from '../../enterprise/entities/admin';
import { CPF } from '../../enterprise/entities/value-objects/cpf';
import { HashGenerator } from '../cryptography/hash-generator';
import { AdminsRepository } from '../repositories/admins-repository';
import { AccountAlreadyExistsError } from './errors/account-already-exists-error';

interface CreateAdminUseCaseRequest {
  name: string;
  cpf: string;
  password: string;
}

type CreateAdminUseCaseResponse = Either<
  AccountAlreadyExistsError,
  {
    admin: Admin;
  }
>;

@Injectable()
export class CreateAdminUseCase {
  constructor(
    private adminsRepository: AdminsRepository,
    private hashGenerator: HashGenerator,
  ) {}

  async execute(
    request: CreateAdminUseCaseRequest,
  ): Promise<CreateAdminUseCaseResponse> {
    const { name, cpf, password } = request;

    const adminWithSameCpf = await this.adminsRepository.findByCpf(cpf);

    if (adminWithSameCpf) {
      return left(new AccountAlreadyExistsError(cpf));
    }

    const hashedPassword = await this.hashGenerator.hash(password);

    const admin = Admin.create({
      name,
      cpf: CPF.create(cpf),
      password: hashedPassword,
    });

    await this.adminsRepository.create(admin);

    return right({
      admin,
    });
  }
}
