import { compareWithFlags, PRIMARY as UCA_L1_FLAG, SECONDARY as UCA_L2_FLAG } from 'unicode-collation-algorithm2';

// UCA_L1_FLAG はベース文字、UCA_L2_FLAG は濁点・半濁点・アクセントを区別する (sensitivity: accent に相当)
const SENSITIVITY_ACCENT_FLAG = UCA_L1_FLAG ^ UCA_L2_FLAG;

type Params = {
  query: string;
  target: string;
};
function isMatch(targetChar: string, queryChar: string, sensitivityFlag: number): boolean {
  return compareWithFlags(targetChar, queryChar, sensitivityFlag) === 0;
}

export function isContains({ query, target }: Params): boolean {
  if (query.length > target.length) return false;

  TARGET_LOOP: for (let offset = 0; offset <= target.length - query.length; offset++) {
    for (let idx = 0; idx < query.length; idx++) {
      const targetChar = target[offset + idx] as string;
      const queryChar = query[idx] as string;

      if (!isMatch(targetChar, queryChar, SENSITIVITY_ACCENT_FLAG)) {
        continue TARGET_LOOP;
      }
    }
    return true;
  }

  return false;
}
