// Honest, transparent match scoring for the core action.
//
// The score is simply the share of a project's required-skill tags that the
// talent's own tags (skills + interests) cover. No random numbers: see
// VISION.md:53-55 — "replace fake match scores with actual scoring (overlap
// between talent skill/interest tags and project required-skill tags). Honest
// simple scoring beats fake sophisticated scoring."

const normalizeTag = (tag: string): string => tag.trim().toLowerCase();

/**
 * Compute a match percentage between a talent's tags and a project's required
 * skill tags, as the share of the project's required tags that the talent
 * covers (0–100, rounded).
 *
 * Returns `undefined` when the project lists no required skills, so the UI can
 * omit a score rather than invent one.
 */
export function computeMatchPercentage(
  talentTags: string[],
  projectRequiredTags: string[]
): number | undefined {
  const required = Array.from(
    new Set(projectRequiredTags.map(normalizeTag).filter(Boolean))
  );
  if (required.length === 0) return undefined;

  const talent = new Set(talentTags.map(normalizeTag).filter(Boolean));
  const covered = required.filter((tag) => talent.has(tag)).length;
  return Math.round((covered / required.length) * 100);
}
