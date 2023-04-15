import { Response, Request, } from "express";

const getIndex = (_req: Request, res: Response) => {
    res.status(200).json({ title: "test" });
};

export { getIndex };