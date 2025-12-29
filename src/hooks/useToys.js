import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { firebaseApi } from '../utils/api.js';
import { queryKeys } from '../utils/queryKeys.js';

// Get all toys
export const useToys = () => {
  return useQuery({
    queryKey: queryKeys.toys.list(),
    queryFn: async () => await firebaseApi.get('/toys'),
  });
};

// Get one toy by ID
export const useToy = (id) => {
  return useQuery({
    queryKey: queryKeys.toys.detail(id),
    queryFn: async () => await firebaseApi.get(`/toys/${id}`),
    enabled: !!id,
  });
};

// Toggle Stock with PATCH
export const useToggleToyStock = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, inStock }) => await firebaseApi.patch(`/toys/${id}`, { inStock }),
    onSuccess: (data, variables) => {
      
      queryClient.invalidateQueries({ queryKey: queryKeys.toys.list() });

      queryClient.invalidateQueries({ queryKey: queryKeys.toys.detail(variables.id) });
    },
  });
};