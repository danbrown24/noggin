const getHash = async (message: string, base = 10) => {
  const msgBuffer = new TextEncoder().encode(message);
  const hashBuffer = await crypto.subtle.digest('SHA-256', msgBuffer);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map((b) => b.toString(base)).join('');
};

export const getTodaysDate = () => {
  const addDays = 0;
  const secondsPerDay = 60 * 60 * 24 * 1000;
  return Date.now() - (Date.now() % secondsPerDay) + (addDays || 0) * secondsPerDay; // Today, midnight
};

/**
 * Generates a unique 32-bit hash which is static and unique to today, returned as a string
 * @param base The base in which to return the string representation of the hash
 * @returns A string in the specified base (default 10)
 */
const getTodaysHash = async (base: number) => {
  const seed = getTodaysDate();
  const hash = await getHash(seed.toString(), base);
  return hash;
};

/**
 * Generates two randomised lists of numbers containing all numbers from 0 up to but not including the specified size
 * @param size The number of numbers each list should contain
 * @returns Two arrays of randomised numbers
 */
export const getRandomSequences = async (size: number) => {
  const hash = await getTodaysHash(size);
  const seq = hash.split('').map((n) => parseInt(n, size));
  const set1: number[] = [];
  const set2: number[] = [];

  const fillSetsUsingSequence = (seq: number[]) => {
    const seqLen = seq.length;

    for (let i = 0; i < seqLen; i++) {
      if (!set1.includes(seq[i]) && set1.length < size) {
        set1.push(seq[i]);
      }
      if (!set2.includes(seq[seqLen - 1 - i]) && set2.length < size) {
        set2.push(seq[seqLen - 1 - i]);
      }
    }
  };

  // First start filling each sequence by picking numbers from each end of today's hash (ignoring duplicates)
  fillSetsUsingSequence(seq);

  // Then, if there are any spaces remaining in either set, perform that filling operation again using a new sequence
  // derived from the original hash; specifically, take each hash digit, apply a multiplier, then mod by the requested size
  for (let multiplier = 2; (set1.length < size || set2.length < size) && multiplier < size; multiplier++) {
    const newSeq = seq.map((n) => (multiplier * n) % size).concat([0]); // Add 0 (the only number we can't make via a multiplier)
    fillSetsUsingSequence(newSeq);
  }

  return [set1, set2];
};
