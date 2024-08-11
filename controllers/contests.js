import { Contest } from "../models/Contest.js";

export const get_all_contests = async (req, res, next) => {
    try {
        const contests = await Contest.find()
            .populate("problems.problem")
            .populate("creator_id");
        res.status(200).json(contests);
    } catch (err) {
        next(err);
    }
};

export const get_contest_by_id = async (req, res, next) => {
    try {
        const contest = await Contest.findById(req.params.contest_id)
            .populate("problems.problem")
            .populate("creator_id");

        if (!contest) {
            return next(create_error(404, "contest not found"));
        }

        res.status(200).json(contest);
    } catch (err) {
        next(err);
    }
};

export const create_contest = async (req, res, next) => {
    try {
        const contest = new Contest(req.body);
        await contest.save();

        res.status(201).json(contest);
    } catch (error) {
        next(error);
    }
};

export const update_contest = async (req, res, next) => {
    try {
        const contest = await Contest.findByIdAndUpdate(
            req.params.contest_id,
            req.body
        )
            .populate("problems.problem")
            .populate("creator_id");

        res.status(200).json(contest);
    } catch (err) {
        next(err);
    }
};

export const delete_contest = async (req, res, next) => {
    try {
        await Contest.findByIdAndDelete(req.params.contest_id);
        res.status(200).json({
            contest_id: req.params.contest_id,
        });
    } catch (err) {
        next(err);
    }
};
