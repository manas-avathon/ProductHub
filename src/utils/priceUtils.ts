

const discountedPrice = (price:number,discount:number) => {
    const newPrice = price - (price*discount)/100;
    return Number((newPrice).toFixed(2));
};

export default discountedPrice;