import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateStepDto, UpdateStepDto } from './dto/step.dto';

@Injectable()
export class StepService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createStepDto: CreateStepDto) {
    return this.prisma.step.create({
      data: createStepDto,
    });
  }

  async findAll() {
    return this.prisma.step.findMany();
  }

  async findOne(id: number) {
    return this.prisma.step.findUnique({
      where: { id },
    });
  }

  async update(id: number, updateStepDto: UpdateStepDto) {
    return this.prisma.step.update({
      where: { id },
      data: updateStepDto,
    });
  }

  async remove(id: number) {
    return this.prisma.step.delete({
      where: { id },
    });
  }
}
