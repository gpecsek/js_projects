export function pathFinding(openSet, closedSet, start, end, path, pathFindingRunning) {
    //let path = [];

    while(openSet.length > 0) {

        if(openSet.length > 0) {
            // Keep going
            var winner = 0;
            for (let i = 0; i < openSet.length; i++) {
                if(openSet[i].f < openSet[winner].f) {
                    winner = i;
                }
            }

            var current = openSet[winner];
            
            if(current === end) {
                console.log("DONE!!!!");
                pathFindingRunning = false;
            }

            removeFromArray(openSet, current);
            closedSet.push(current);

            var neighbors = current.neighbor;
            for (let i = 0; i < neighbors.length; i++) {
                var neighbor = neighbors[i];

                if(!closedSet.includes(neighbor) && !neighbor.blocked) {
                    var tempG = neighbor.g + 1;

                    if(openSet.includes(neighbor)) {
                        if(tempG < neighbor.g) {
                            neighbor.g = tempG;
                        }
                    } else {
                        neighbor.g = tempG;
                        openSet.push(neighbor);
                    }

                    neighbor.h = Math.abs(neighbor.i - end.i) + Math.abs(neighbor.j - end.j);

                    neighbor.f = neighbor.g + neighbor.h;
                    neighbor.previous = current;
                }
                
            }

        } else {
            console.log("No solution!");
            pathFindingRunning = false;
            // No solution
        }

        // Find the path 
        
        if (current) {
            var temp = current;
            path.push(temp);
            while (temp.previous) {
                path.push(temp.previous);
                temp = temp.previous;
            }
        }
    }
    
    return path, pathFindingRunning;
}


// Remove element from an array
function removeFromArray(arr, elt) {
    for (let i = arr.length - 1; i >= 0; i--) {
        if (arr[i] == elt) {
            arr.splice(i, 1);
        }
    }
}