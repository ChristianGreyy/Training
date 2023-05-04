const db = require("../index.js");

export default async function (Model: any, filter: any, options: any) {
  let sort: any[] = [];
  if (options.sortBy) {
    options.sortBy.split(",").forEach((sortOption: any) => {
      const [key, order] = sortOption.split(":");
      sort.push([key, order.toUpperCase()]);
    });
  }

  const limit =
    options.limit && parseInt(options.limit, 10) > 0
      ? parseInt(options.limit, 10)
      : 10;
  const page =
    options.page && parseInt(options.page, 10) > 0
      ? parseInt(options.page, 10)
      : 1;
  const skip = (page - 1) * limit;

  const countPromise = Model.count({ where: filter });

  let populate: any[] = [];
  if (options.populate) {
    options.populate.split(",").forEach((populateOption: any) => {
      let length = populateOption.split(".").length;
      let item = populateOption
        .split(".")
        .reduce((acc: any, modelfk: any, index: number) => {
          console.log(modelfk);
          const model = modelfk.split("*")[0];
          const fk = modelfk.split("*")[1];

          if (index >= 1) {
            acc["include"] = {
              model: db[model],
              foreignKey: fk ? fk : "",
              include: [],
            };
            return acc;
          } else {
            return {
              model: db[model],
              foreignKey: fk ? fk : "",
              include: [],
            };
          }
        }, {});
      populate.push(item);
    });
  }
  console.log(populate);
  let docsPromise = Model.findAll({
    where: filter,
    order: sort,
    offset: skip,
    limit: limit,
    include: populate,
  });

  return Promise.all([countPromise, docsPromise]).then((values) => {
    const [totalResults, results] = values;
    const totalPages = Math.ceil(totalResults / limit);
    const result = {
      results,
      page,
      limit,
      totalPages,
      totalResults,
    };
    return Promise.resolve(result);
  });
}
