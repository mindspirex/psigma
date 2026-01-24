export type Point = { x: number; y: number };

type SnapObject = {
  _id: string;
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

  for (const object of others) {
    // ───────── Edges ─────────

    const selfLeft = pos.x;
    const selfRight = pos.x + self.width;
    const selfTop = pos.y;
    const selfBottom = pos.y + self.height;

    const objectLeft = object.x;
    const objectRight = object.x + object.width;
    const objectTop = object.y;
    const objectBottom = object.y + object.height;

    // ───────── X AXIS ─────────

    const xCandidates: SnapCandidate[] = [
      // left ↔ right
      {
        value: objectRight,
        distance: Math.abs(selfLeft - objectRight),
      },

      // right ↔ left
      {
        value: objectLeft - self.width,
        distance: Math.abs(selfRight - objectLeft),
      },

      // left ↔ left
      {
        value: objectLeft,
        distance: Math.abs(selfLeft - objectLeft),
      },

      // right ↔ right
      {
        value: objectRight - self.width,
        distance: Math.abs(selfRight - objectRight),
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
        value: objectBottom,
        distance: Math.abs(selfTop - objectBottom),
      },

      // bottom ↔ top
      {
        value: objectTop - self.height,
        distance: Math.abs(selfBottom - objectTop),
      },

      // top ↔ top
      {
        value: objectTop,
        distance: Math.abs(selfTop - objectTop),
      },

      {
        value: objectBottom - self.height,
        distance: Math.abs(selfBottom - objectBottom),
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
