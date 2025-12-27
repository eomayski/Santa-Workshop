
export const queryKeys = {
  toys: {
    all: ['toys'],
    list: () => [...queryKeys.toys.all, 'list'], //For filters eventually
    detail: (id) => [...queryKeys.toys.all, 'detail', id],
  },
  orders: {
    all: ['orders'],
    list: () => [...queryKeys.orders.all, 'list'],
    detail: (id) => [...queryKeys.orders.all, 'detail', id],
  },
  elves: {
    all: ['elves'],
    list: () => [...queryKeys.elves.all, 'list'],
    detail: (id) => [...queryKeys.elves.all, 'detail', id],
  },
  countries: {
    all: ['countries'],
    list: () => [...queryKeys.countries.all, 'list'],
  },
};