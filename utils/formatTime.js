
module.exports = formatTotalHours = (totalHours) =>{
    
    const hours = Math.floor(totalHours);
    const minutes = Math.round((totalHours - hours) * 60);

    let result = '';

    // 
    if(hours > 0){
        result += `${hours} hour${ hours !== 1 ? 's' : ''}`;
    }
    
    if(minutes > 0){
        result += ` ${minutes} minute${ minutes !== 1 ? 's' : ''}`;
    }
    return result || '0 minutes'; 
};