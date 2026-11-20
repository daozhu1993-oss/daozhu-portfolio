'use strict';
// Pure rules also run in the local regression check; no browser state or timers here.
function beaconStep(sequence, position, value) {
  if (value !== sequence[position]) return 'miss';
  return position + 1 === sequence.length ? 'complete' : 'next';
}
if (typeof module !== 'undefined') module.exports = {beaconStep};
