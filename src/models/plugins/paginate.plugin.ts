const db = require("../index.js");

export default async function (Model: any, filter: any, options: any) {
  let sort: any[] = [];
  // ?sort=createdAt:desc
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
      let item = populateOption
        .split(".")
        .reduce((acc: any, modelalias: any, index: number) => {
          const alias = modelalias;
          let model: any;
          if (
            alias == "creator_id" ||
            alias == "assignee_id" ||
            alias == "members"
          ) {
            model = "User";
          } else if (alias == "status") model = "Status";
          else if (alias == "type") model = "Type";
          else if (alias == "priority") model = "Priority";
          else if (
            alias == "creator_tasks" ||
            alias == "assignee_tasks" ||
            alias == "tasks"
          ) {
            model = "Task";
          }

          if (index >= 1) {
            if (alias) {
              acc["include"] = {
                model: db[model],
                as: alias,
                include: [],
              };
            } else {
              acc["include"] = {
                model: db[model],
                include: [],
              };
            }
            return acc;
          } else {
            if (alias) {
              return {
                model: db[model],
                as: alias,
                include: [],
              };
            } else {
              return {
                model: db[model],
                include: [],
              };
            }
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
