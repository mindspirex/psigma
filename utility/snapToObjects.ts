export type Point = { x: number; y: number };

type SnapObject = {
  id: string;
  x: number;
  y: number;
  width: number;
  height: number;
};

type SnapCandidate = {
  value: number;
  distance: number;
};

export function snapToObjects(
  pos: Point,
  self: { width: number; height: number },
  others: SnapObject[],
  threshold = 8,
): Point {
  let snapX: SnapCandidate | null = null;
  let snapY: SnapCandidate | null = null;

  for (const obj of others) {
    // ───────── Edges ─────────

    const selfLeft = pos.x;
    const selfRight = pos.x + self.width;
    const selfTop = pos.y;
    const selfBottom = pos.y + self.height;

    const objLeft = obj.x;
    const objRight = obj.x + obj.width;
    const objTop = obj.y;
    const objBottom = obj.y + obj.height;

    // ───────── X AXIS ─────────

    const xCandidates: SnapCandidate[] = [
      // left ↔ right
      {
        value: objRight,
        distance: Math.abs(selfLeft - objRight),
      },

      // right ↔ left
      {
        value: objLeft - self.width,
        distance: Math.abs(selfRight - objLeft),
      },

      // left ↔ left
      {
        value: objLeft,
        distance: Math.abs(selfLeft - objLeft),
      },

      // right ↔ right
      {
        value: objRight - self.width,
        distance: Math.abs(selfRight - objRight),
      },
    ];

    for (const c of xCandidates) {
      if (c.distance < threshold && (!snapX || c.distance < snapX.distance)) {
        snapX = c;
      }
    }

    // ───────── Y AXIS ─────────

    const yCandidates: SnapCandidate[] = [
      // top ↔ bottom
      {
        value: objBottom,
        distance: Math.abs(selfTop - objBottom),
      },

      // bottom ↔ top
      {
        value: objTop - self.height,
        distance: Math.abs(selfBottom - objTop),
      },

      // top ↔ top
      {
        value: objTop,
        distance: Math.abs(selfTop - objTop),
      },

      {
        value: objBottom - self.height,
        distance: Math.abs(selfBottom - objBottom),
      },
    ];

    for (const c of yCandidates) {
      if (c.distance < threshold && (!snapY || c.distance < snapY.distance)) {
        snapY = c;
      }
    }
  }

  return {
    x: snapX ? snapX.value : pos.x,
    y: snapY ? snapY.value : pos.y,
  };
}
