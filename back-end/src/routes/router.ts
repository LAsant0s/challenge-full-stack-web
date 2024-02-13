import { NextFunction, Router, Request, Response } from "express";
import { StudentsService } from "../services/StudentsService";
import { StudentsRepository } from "../repositories/students/StudentsRepository";
import { StudentsController } from "../controllers/students/StudentsController";

const router = Router();

const studentsRepository = new StudentsRepository();
const studentsService = new StudentsService(studentsRepository);
const studentsController = new StudentsController(studentsService);

router.post("/students", async (req: Request, res: Response, next: NextFunction) => {
  studentsController.createStudent(req, res, next);
});

router.get("/students", async (req: Request, res: Response, next: NextFunction) => {
  studentsController.getStudents(req, res, next);
});

router.get("/students/:ra", async (req: Request, res: Response, next: NextFunction) => {
  studentsController.getStudent(req, res, next);
});

router.put("/students/:ra", async (req: Request, res: Response, next: NextFunction) => {
  studentsController.updateStudent(req, res, next);
});

router.delete("/students/:ra", async (req: Request, res: Response, next: NextFunction) => {
  studentsController.deleteStudent(req, res, next);
});

export { router }