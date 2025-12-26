
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { firebaseApi } from '../utils/api.js';
import { queryKeys } from '../utils/queryKeys.js';

// Get orders
export const useOrders = () => {
  return useQuery({
    queryKey: queryKeys.orders.list(),
    queryFn: () => firebaseApi.get('/orders'),
  });
};

// Create order
export const useCreateOrder = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (newOrder) => firebaseApi.post('/orders', newOrder),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.orders.list() });
    },
  });
};