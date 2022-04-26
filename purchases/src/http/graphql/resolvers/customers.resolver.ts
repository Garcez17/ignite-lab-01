import { UseGuards } from '@nestjs/common';
import {
  Parent,
  Query,
  ResolveField,
  Resolver,
  ResolveReference,
} from '@nestjs/graphql';
import { AuthUser, CurrentUser } from '../../../http/auth/current-user';
import { PurchasesService } from '../../../services/purchases.service';

import { CustomersService } from '../../../services/customers.service';
import { AuthorizationGuard } from '../../auth/authorization.guard';

import { Customer } from '../models/customer';
import { Purchase } from '../models/purchase';

@Resolver(() => Customer)
export class CustomersResolver {
  constructor(
    private customersService: CustomersService,
    private purchasesService: PurchasesService,
  ) {}

  @UseGuards(AuthorizationGuard)
  @Query(() => Customer)
  public async me(@CurrentUser() user: AuthUser) {
    return this.customersService.getCustomerByAuthUserId(user.sub);
  }

  @ResolveField(() => [Purchase])
  public async purchases(@Parent() customer: Customer) {
    return this.purchasesService.listAllFromCustomer(customer.id);
  }

  @ResolveReference()
  public async resolveReference(reference: { authUserId: string }) {
    return this.customersService.getCustomerByAuthUserId(reference.authUserId);
  }
}
