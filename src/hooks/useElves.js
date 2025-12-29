import { useQuery } from '@tanstack/react-query';
import { firebaseApi } from '../utils/api.js';
import { queryKeys } from '../utils/queryKeys.js';

// Get all elves
export const useElves = () => {
  return useQuery({
    queryKey: queryKeys.elves.list(),
    queryFn: () => firebaseApi.get('/elves'),
  });
};

// Get one elf by ID
export const useElf = (id) => {
  return useQuery({
    queryKey: queryKeys.elves.detail(id),
    queryFn: () => firebaseApi.get(`/elves/${id}`),
    enabled: !!id,
  });
};