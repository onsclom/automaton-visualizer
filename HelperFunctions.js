function clamp_between(cur,min,max,start,end) {
    if (cur<=start) {
        return min
    }
    else if (cur >= end) {
        return max 
    }
    
    let ratio = (cur-start)/(end-start)

    return (max-min)*ratio + min
}