// import mongoose from 'mongoose'

const scopeSearch: any = req => {
  let $and = {};
  let $option = {};

  for (const [key, value] of Object.entries(req)) {
    const query = [
      'page',
      'orderByField',
      'orderBy',
      'startDate',
      'endDate',
      'size',
      'createdAt',
      'filterBy',
      'is_video',
      'is_paid',
      'premiumPermission',
      'trial',
      'limit',
    ];
    if (!value || value != '' || value === undefined) {
      //   if (mongoose.Types.ObjectId.isValid(value)) {
      //     $and = Object.assign($and, { [key]: value });
      //   } else
      if (!query.includes(key) && value) {
        $and = Object.assign($and, { [key]: value });
      } else {
        $option = Object.assign($option, { [key]: value });
      }
      //   if (!query.includes(key) && value) {
      //     $and = Object.assign($and, { [key]: { $regex: value } });
      //   }
    }
  }

  const query = $and ? $and : {};

  const sort = { createdAt: -1 };
  //   if (req.query.orderByField && req.query.orderBy)
  //     sort = {
  //       [req.query.orderByField]:
  //         req.query.orderBy.toLowerCase() == 'desc' ? -1 : 1,
  //     };
  return { query: query, option: $option, sort };
};

export default scopeSearch;
