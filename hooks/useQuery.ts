import { useLocation } from 'react-router-native'

export const useQuery = () => new URLSearchParams(useLocation().search);
