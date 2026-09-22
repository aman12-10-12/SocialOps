import express from "express"
import { protect } from "../middlewares/authMiddleware.js";
import { addAccount, discconectAccount, getAccounts } from "../controllers/accountControllers.js";

const accountRouter = express.Router();

accountRouter.get('/', protect, getAccounts)
accountRouter.post('/', protect, addAccount)
accountRouter.delete('/:id', protect, discconectAccount);

export default accountRouter;