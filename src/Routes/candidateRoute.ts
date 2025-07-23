import express from 'express';
import { createCandidate, getCandidates, updateCandidateStatus, deleteCandidate } from '../Controllers/candidateController';
import { authorizeRoles } from '../Middleware/verifyToken';

const router = express.Router();

router.post('/create', authorizeRoles(), createCandidate); // Create a new candidate
router.get('/list/:agencyId', authorizeRoles(), getCandidates); // Get all candidates for the agency
router.put('/update/:id', authorizeRoles(), updateCandidateStatus); // Update candidate status
router.delete('/delete/:id', authorizeRoles(), deleteCandidate); // Delete a candidate

export default router;
