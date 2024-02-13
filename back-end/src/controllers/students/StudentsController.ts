import { Student } from "../../entities/Student";
import { StudentsService } from "../../services/StudentsService";
import { NextFunction, Request, Response } from "express";

class StudentsController {
  constructor(private studentsService: StudentsService) { }

  async createStudent(request: Request, response: Response, next: NextFunction) {
    try {
      const { ra, name, email, doc } = request.body;
      await this.studentsService.createStudent({ ra, name, email, doc } as Student);
      return response.status(201).send();
    } catch (error) {
      next(error);
    }
  };

  async getStudents(request: Request, response: Response, next: NextFunction) {
    try {
      const page = Number(request.query.page);
      const limit = Number(request.query.limit);
      const search = request.query.search ? String(request.query.search) : "";

      const students = await this.studentsService.getStudents(page, limit, search);
      return response.status(200).json(students);
    } catch (error) {
      next(error);
    }
  };

  async getStudent(request: Request, response: Response, next: NextFunction) {
    try {
      const student = await this.studentsService.getStudent(request.params.ra);
      return response.status(200).json(student);
    } catch (error) {
      next(error);
    }
  };

  async updateStudent(request: Request, response: Response, next: NextFunction) {
    try {
      const { ra } = request.params;
      const { name, email } = request.body;
      await this.studentsService.updateStudent(ra, { name, email } as Student);
      return response.status(204).send();
    } catch (error) {
      next(error);
    }
  };

  async deleteStudent(request: Request, response: Response, next: NextFunction) {
    try {
      await this.studentsService.deleteStudent(request.params.ra);
      return response.status(204).send();
    } catch (error) {
      next(error);
    }
  };
}

export { StudentsController };