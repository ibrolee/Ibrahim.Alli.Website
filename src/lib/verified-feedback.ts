/**
 * Genuine feedback only. Do not populate this list without the original
 * statement, written public-use permission and the speaker's approved attribution.
 * Leave it empty until verified feedback exists. No placeholder reviews appear.
 */
export type VerifiedFeedback = {
  quote: string;
  speaker: string;
  approvedRole: string;
  projectSlug?: string;
  permissionDate: string;
};

export const verifiedFeedback: VerifiedFeedback[] = [];
