import { Request, Response } from "express";
import joiValidation from "../helper/joi.validation";
import queries from "../models/querries";

const create_queries = async (req: Request, res: Response) => {
    try {
        const valid = joiValidation.validateQuerries(req.body); // Corrected method name
        if (valid.error) {
            return res.status(400).json({ error: (valid.error as Error).message });
        } else {
            const created_queries = new queries({
                user: req.body.user,
                message: req.body.message,
            });
            await created_queries.save();
            return res.status(201).json({ message: "Query created successfully" });
        }
    } catch (error: any) {
        return res.status(500).json({ error: error.message });
    }
};

const fetch_queries = async (req: Request, res: Response) => {
    try {
        const allQueries = await queries.find();
        return res.status(200).json({ queries: allQueries });
    } catch (error: any) {
        return res.status(500).json({ error: error.message });
    }
};

const remove_queries = async (req: Request, res: Response) => {
    try {
        const id = req.params.id;
        const deletedQuery = await queries.findByIdAndDelete(id);
        if (deletedQuery) {
            return res.status(200).json({ message: "Query deleted successfully" });
        } else {
            return res.status(404).json({ error: "Query not found" });
        }
    } catch (error: any) {
        return res.status(500).json({ error: error.message });
    }
};

export default {
    create_queries,
    fetch_queries,
    remove_queries,
};
