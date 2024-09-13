export const paginationRangeInput = (totalPage, page) => {
    let range = [];
    // range.push(1);

   
  if(page == 0){
    range.pop(1)
  }else{
    range.push(1)
  }

   
    if (page - 1 > 2) {
        range.push("... ");
    } else if (page - 1 === 2) {

        range.push(2);
    }

  
    if (page !== 1 && page !== totalPage) {
        range.push(page);
    }

   
    if (totalPage - page > 2) {
        range.push(" ...");
    } else if (totalPage - page === 2) {

        range.push(totalPage - 1);
    }

    if (totalPage !== 1) {
        range.push(totalPage);
    }

    return range;
};
