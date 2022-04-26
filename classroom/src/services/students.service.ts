import { Injectable } from '@nestjs/common';
import { PrismaService } from '../database/prisma/prisma.service';

@Injectable()
export class StudentsService {
  constructor(private prisma: PrismaService) {}

  public async getStudentByAuthUserId(authUserId: string) {
    return this.prisma.student.findUnique({
      where: {
        authUserId,
      },
    });
  }

  public async listAllStudents() {
    return this.prisma.student.findMany();
  }

  public async getStudentById(id: string) {
    return this.prisma.student.findUnique({
      where: {
        id,
      },
    });
  }

  public async createStudent(authUserId: string) {
    return this.prisma.student.create({
      data: {
        authUserId,
      },
    });
  }
}
