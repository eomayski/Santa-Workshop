import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "../utils/queryKeys.js";

// Get Countries
export const useCountries = () => {
    return useQuery({
        queryKey: queryKeys.countries.list(),
        queryFn: async () => {

            const response = await fetch('https://restcountries.com/v3.1/all?fields=name,flag,cca2');

            if (!response.ok) {
                const errorMessage = await response.text();
                return Promise.reject(new Error(errorMessage || 'Error on fetching data'));
            }

            if (response.status === 204) return null;

            return response.json();
        },
    });
};