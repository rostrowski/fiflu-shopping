import orderBy from "lodash.orderby";

export const mergeWithOrder = (items, order) => {
  if (!items || !order) {
    return [];
  }

  const itemsWithOrder = items.reduce((aggregate, current) => {
    const itemOrder = order.indexOf(current.id);

    if (itemOrder > -1) {
      aggregate.push({ ...current, order: itemOrder });
    }

    return aggregate;
  }, []);

  return orderBy(itemsWithOrder, ["order"], ["asc"]);
};
