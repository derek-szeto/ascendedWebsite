import { teamMembers } from './teamMembers';

const founderNames = new Set([
  'Aarush Bharthepudi',
  'Rishabh Dalal',
  'Vedsai Maddu',
  'Derek Szeto',
  'Miles Mantasoot',
]);

export const founders = teamMembers.filter((member) => founderNames.has(member.name));
export const otherMembers = teamMembers.filter((member) => !founderNames.has(member.name));
