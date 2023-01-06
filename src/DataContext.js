import { createContext } from 'react';
import { DataService } from './services/Data';

export const DataContext = createContext(new DataService());
