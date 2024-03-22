export type TBall = {
    x: number, 
    y: number, 
    radius: number, 
    color: string
}

export type TBallWithContext = TBall & {
    ctx: CanvasRenderingContext2D | null
}

export type TCanvasProps = {
    balls: TBall[],
    onCanvasClick: () => void
}

export type TMenu = {
    setColor: (color: string) => void
}

export type TBallMove = {
    prevX: number,
    prevY: number
    speedX: number,
    speedY: number
}

export type TChangeBallCoordinates = {
    x: number, 
    y: number, 
    radius: number, 
    width: number, 
    height: number, 
    speedX: number, 
    speedY: number
}