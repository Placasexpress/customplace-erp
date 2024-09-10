import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AddressService } from './address.services';
import { CreateAddressDto } from './dto/create-address.dto';
import { AuthRequest } from '../auth/models/AuthRequest';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags('Address')
@Controller('address')
export class AddressController {
  constructor(private readonly addressService: AddressService) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'List All Addresses',
    description:
      'Retrieve a list of all addresses associated with the authenticated user.',
  })
  @ApiResponse({
    status: 200,
    description: 'Successfully retrieved the list of addresses.',
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized. The user must be authenticated.',
  })
  async listAll(@Request() req: AuthRequest) {
    const { user } = req;
    return this.addressService.listAll(user);
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'Create Address',
    description: 'Create a new address for the authenticated user.',
  })
  @ApiResponse({
    status: 200,
    description: 'Address successfully created.',
  })
  @ApiResponse({
    status: 400,
    description: 'Bad Request. The input data is invalid.',
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized. The user must be authenticated.',
  })
  async create(
    @Body() createAddressDto: CreateAddressDto,
    @Request() req: AuthRequest,
  ) {
    const { user } = req;
    return this.addressService.create(createAddressDto, user);
  }
}
