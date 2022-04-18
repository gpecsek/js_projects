export function detectCollision(ball, gameObject) {
    
    let bottomOfBall = ball.position.y + ball.size;
    let topOfBall = ball.position.y;

    let topOfObject = gameObject.position.y;
    let bottomOfObject = gameObject.position.y + gameObject.height;

    let leftSideOfObject = gameObject.position.x;
    let rightSideOfObject = gameObject.position.x + gameObject.width;

    if(
        bottomOfBall >= topOfObject &&
        topOfBall <= bottomOfObject && 
        ball.position.x + ball.size >= leftSideOfObject &&
        ball.position.x <= rightSideOfObject
    ) {
        return true;
    } else {
        return false;
    }
}

export function detectCollisionBySide(ball, gameObject) {
    let bottomOfBall = ball.position.y + ball.size;
    let topOfBall = ball.position.y;
    let leftSideOfBall = ball.position.x;
    let rightSideOfBall = ball.position.x + ball.size;

    let topOfObject = gameObject.position.y;
    let bottomOfObject = gameObject.position.y + gameObject.height;
    let leftSideOfObject = gameObject.position.x;
    let rightSideOfObject = gameObject.position.x + gameObject.width;

    let collision = 'none';

    if(
        bottomOfBall >= topOfObject &&
        topOfBall <= bottomOfObject && 
        rightSideOfBall >= leftSideOfObject &&
        leftSideOfBall <= rightSideOfObject
    ) {
        let diffTop = Math.abs(bottomOfBall - topOfObject);
        let diffBottom = Math.abs(topOfBall - bottomOfObject);
        let diffLeft = Math.abs(rightSideOfBall - leftSideOfObject);
        let diffRight = Math.abs(leftSideOfBall - rightSideOfObject);
        if (diffTop < diffBottom && diffTop < diffLeft && diffTop < diffRight) collision = 'top';
        if (diffBottom < diffTop && diffBottom < diffLeft && diffBottom < diffRight) collision = 'bottom';
        if (diffLeft < diffTop && diffLeft < diffBottom && diffLeft < diffRight) collision = 'left';
        if (diffRight < diffTop && diffRight < diffBottom && diffRight < diffLeft) collision = 'right';
    }

    return (collision);
}