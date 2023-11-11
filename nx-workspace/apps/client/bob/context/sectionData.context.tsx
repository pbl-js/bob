import { createContext, useContext, useReducer } from 'react';
import { builderSectionDataReducer } from './sectionData.reducer';

// import { BOB } from '../../utils/bob';
import { SectionDataContext } from './sectionData.types';

export const initialState: SectionDataContext = {
  state: {
    draft: undefined,
    isComunicationOpen: false,
    // registeredComponents: BOB._customComponents,
  },
  dispatch: () => null,
};

const SectionDataContext = createContext(initialState);

export const SectionDataContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer(builderSectionDataReducer, initialState.state);

  return (
    <SectionDataContext.Provider value={{ state, dispatch }}>
      {children}
    </SectionDataContext.Provider>
  );
};

export const useSectionData = () => {
  const context = useContext(SectionDataContext);
  if (context === undefined) {
    throw new Error('useSectionData must be used within a SectionDataContextProvider');
  }
  return context;
};
