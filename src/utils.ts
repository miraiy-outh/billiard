import { TBallMove, TChangeBallCoordinates } from "./types";

export function changeBallCoordinates({x, y, radius, width, height, speedX, speedY}:TChangeBallCoordinates): TBallMove {
    if (x + radius >= width) {
        x -= 2 * radius;
        speedX = -speedX
    }

    if (x - radius <= 0) {
        x += 2 * radius;
        speedX = -speedX
    }

    if (y + radius >= height) {
        y -= 2 * radius;
        speedY = -speedY
    }

    if (y - radius <= 0) {
        y += 2 * radius;
        speedY = -speedY
    }

    return {prevX: x, prevY: y, speedX, speedY}
}