import type { Depth, Subject } from '@/content/types';

/**
 * The depth each subject is actually studied at.
 *
 * Biology is studied at AP depth because AP Biology is not available in the
 * owner's school timetable, so the app is the course rather than a supplement
 * to one. Chemistry runs alongside an Honors Chemistry class, and the local
 * district uses one unit order for both levels, so there is a single
 * chemistry sequence; difficulty is carried by an item's `tier`, not by
 * splitting the content into two tracks.
 *
 * This lives here, not in the app, because the content integrity suite has to
 * assert against the same values. When the app held its own private copy, an
 * item could be authored at a depth nothing studied at and silently never
 * appear.
 */
export const STUDY_DEPTH: Record<Subject, Depth> = { bio: 'ap', chem: 'honors' };
