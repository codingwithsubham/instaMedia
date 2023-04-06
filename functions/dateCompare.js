const isGreaterDate = (date) => {
  const d1 = new Date();
  const d2 = new Date(date);

  if (d2.getTime() >= d1.getTime()) {
    return true;
  } else {
    return false;
  }
};

const addDays = (date, days) => {
    var result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
  }

module.exports = { isGreaterDate, addDays };
