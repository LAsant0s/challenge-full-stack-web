import { NextFunction, Router, Request, Response } from "express";
import { StudentsService } from "../services/StudentsService";
import { StudentsRepository } from "../repositories/students/StudentsRepository";
import { StudentsController } from "../controllers/students/StudentsController";
import cors from "cors";

const router = Router();

const studentsRepository = new StudentsRepository();
const studentsService = new StudentsService(studentsRepository);
const studentsController = new StudentsController(studentsService);

router.post("/students", cors(), async (req: Request, res: Response, next: NextFunction) => {
  studentsController.createStudent(req, res, next);
});

router.get("/students", cors(), async (req: Request, res: Response, next: NextFunction) => {
  studentsController.getStudents(req, res, next);
});

router.get("/students/:ra", cors(), async (req: Request, res: Response, next: NextFunction) => {
  studentsController.getStudent(req, res, next);
});

router.put("/students/:ra", cors(), async (req: Request, res: Response, next: NextFunction) => {
  studentsController.updateStudent(req, res, next);
});

router.delete("/students/:ra", cors(), async (req: Request, res: Response, next: NextFunction) => {
  studentsController.deleteStudent(req, res, next);
});

export { router }