const calculateDiscountPercentage = (mainPrice, discountedPrice) => {
  const discountAmount = mainPrice - discountedPrice;
  const discountPercentage = (discountAmount / mainPrice) * 100;
  return discountPercentage.toFixed(2);
};

const getSaveUpto = (mainPrice, comboPrice) => {
  const saveAmount = mainPrice - comboPrice;
  return saveAmount;
};

module.exports = {
  calculateDiscountPercentage,
  getSaveUpto
};
