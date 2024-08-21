const pagination = async (model, query, include = [], where = {}) => {
    const page = query?.page ? parseInt(query?.page) : 1;
    const limit = query?.limit ? parseInt(query?.limit) : 10;
    const offset = (page - 1) * limit;
    const sortBy = query?.sortBy ? query?.sortBy : "id";
    const sortOrder = query?.sortOrder ? query?.sortOrder : "desc";

    const { count, rows } = await model.findAndCountAll({
        where,
        offset,
        limit,
        order: [[sortBy, sortOrder]],
        include
    });

    return {
        totalItems: count,
        totalPages: Math.ceil(count / limit),
        previousPage: page - 1 > 0 ? page - 1 : null,
        currentPage: page,
        limit,
        data: rows,
    };
};

module.exports = { pagination };
