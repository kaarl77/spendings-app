export const areObjectsEqual = (a: any, b: any): boolean => {
  if (a === b) return true;

  if (typeof a !== typeof b) return false;

  const typeOfVariables = typeof a;

  const isANaN = typeOfVariables === 'number' && isNaN(a);
  const isBNaN = typeOfVariables === 'number' && isNaN(b);

  if (isANaN && isBNaN) return true;
  if (isANaN || isBNaN) return false;

  if (typeOfVariables !== 'object') {
    if (a !== b) return false;
  }

  if (Array.isArray(a) && Array.isArray(b)) {
    if (a.length !== b.length) return false;

    for (let i = 0; i < a.length; i += 1) {
      if (!areObjectsEqual(a[i], b[i])) {
        return false;
      }
    }

    return true;
  } else if (Array.isArray(a) || Array.isArray(b)) {
    return false;
  }

  const keysA = Object.keys(a);
  const keysB = Object.keys(b);
  for (let i = 0; i < keysA.length; i += 1) {
    const currentKey = keysA[i];
    if (!areObjectsEqual(a[currentKey], b[currentKey])) {
      return false;
    }
  }
  for (let i = 0; i < keysB.length; i += 1) {
    const currentKey = keysB[i];
    if (!areObjectsEqual(a[currentKey], b[currentKey])) {
      return false;
    }
  }

  return true;
};