export const getToday = () => {
    
    const currentDate = new Date();
        
    const year = currentDate.getFullYear();
    const month = (currentDate.getMonth()+1 < 10) ? '0'+(currentDate.getMonth()+1) : currentDate.getMonth()+1; 
    const day = currentDate.getDate();

    return year+'-'+month+'-'+day;

}