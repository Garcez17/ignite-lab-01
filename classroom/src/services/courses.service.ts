import { Injectable } from '@nestjs/common';
import slugify from 'slugify';
import { PrismaService } from '../database/prisma/prisma.service';

interface CreateCourseParams {
  title: string;
  slug?: string;
}

@Injectable()
export class CoursesService {
  constructor(private prisma: PrismaService) {}

  public async listAllCourses() {
    return this.prisma.course.findMany();
  }

  public async getCourseById(id: string) {
    return this.prisma.course.findUnique({
      where: {
        id,
      },
    });
  }

  public async getCourseBySlug(slug: string) {
    return this.prisma.course.findUnique({
      where: {
        slug,
      },
    });
  }

  public async createCourse({
    title,
    slug = slugify(title, { lower: true }),
  }: CreateCourseParams) {
    const courseWithSameSlug = await this.prisma.course.findUnique({
      where: {
        slug,
      },
    });

    if (courseWithSameSlug) {
      throw new Error('Another product with same slug already exists.');
    }

    return this.prisma.course.create({
      data: {
        slug,
        title,
      },
    });
  }
}
