import { Router } from 'express';
import getReviews from '../services/reviews/getReviews.js';
import createReview from '../services/reviews/createReview.js';
import getReviewById from '../services/reviews/getReviewById.js';
import deleteReviewById from '../services/reviews/deleteReview.js';
import updateReviewById from '../services/reviews/updateReview.js';
import auth from '../../middleware/auth.js';

const router = Router();

// GET all reviews
router.get('/', async (req, res, next) => {
    try {
        const reviews = await getReviews();

        if (reviews.length === 0) {
            return res.status(404).json({
                message: "No reviews found.",
            });
        }
        return res.status(200).json(reviews);

    } catch (error) {
        next(error);
    }
});


// GET review by ID
router.get('/:id', async (req, res, next) => {
    try {
        const { id } = req.params;
        const review = await getReviewById(id);

        res.status(200).json(review);
    } catch (error) {
        next(error);
    }
});

// CREATE a review
router.post('/', auth, async (req, res, next) => {
    try {
        const {
            userId,
            propertyId,
            rating,
            comment,
        } = req.body;

        if (!userId || !propertyId || rating === undefined || rating === null) {
            return res.status(400).json({
                message: "userId, propertyId and rating are required.",
            });
        }

        const newReview = await createReview(
            userId,
            propertyId,
            rating,
            comment
        );

        res.status(201).json(newReview);
    } catch (error) {
        next(error);
    }
});

// DELETE a review by ID
router.delete('/:id', auth, async (req, res, next) => {
    try {
        const { id } = req.params;
        const review = await deleteReviewById(id);

        res.status(200).json({
            message: `Review with id ${id} successfully deleted`,
            review,
        });
    } catch (error) {
        next(error);
    }
});

// UPDATE a review by ID
router.put('/:id', auth, async (req, res, next) => {
    try {
        const { id } = req.params;
        const { rating, comment } = req.body;

        const updatedReview = await updateReviewById(id, {
            rating,
            comment,
        });

        res.status(200).json({
            message: `Review with id ${id} successfully updated`,
            review: updatedReview,
        });
    } catch (error) {
        next(error);
    }
});

export default router;
