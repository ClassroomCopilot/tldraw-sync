import { ReactNode, createContext, useContext, useState, useEffect } from 'react';
import { UserNodeInterface } from '../types/graph_node_types';
import { TLUser } from 'tldraw';

export const getFromLocalStorage = (key: string) => {
  const item = localStorage.getItem(key);
  if (item === null || item === 'undefined') return null;
  try {
    return JSON.parse(item);
  } catch (error) {
    console.error(`Error parsing JSON for key ${key}:`, error);
    return null;
  }
};

export const setToLocalStorage = (key: string, value: any) => {
  localStorage.setItem(key, JSON.stringify(value));
};

export const removeFromLocalStorage = (key: string) => {
  localStorage.removeItem(key);
};

export const setStateAndStorage = (setter: React.Dispatch<React.SetStateAction<any>>, key: string, value: any) => {
  setter(value);
  setToLocalStorage(key, value);
};

const AuthContext = createContext({
  userRole: null as string | null,
  firebaseIdToken: null as string | null,
  msAccessToken: null as string | null,
  neo4jDbName: null as string | null,
  userNode: null as UserNodeInterface | null,
  tldrawUserFilePath: null as string | null,
  oneNoteNotebook: null as any,
  isLoading: false,
  error: null as string | null,
  logout: async () => {},
  getIdToken: async () => Promise.resolve('') as Promise<string>,
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<TLUser | null>(getFromLocalStorage('user'));
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [userRole, setUserRole] = useState<string | null>(getFromLocalStorage('userRole'));
  const [firebaseIdToken, setToken] = useState<string | null>(getFromLocalStorage('firebaseIdToken'));
  const [msAccessToken, setMsToken] = useState<string | null>(getFromLocalStorage('msAccessToken'));
  const [neo4jDbName, setNeo4jDbName] = useState<string | null>(getFromLocalStorage('neo4jDbName'));
  const [userNode, setUserNode] = useState<UserNodeInterface | null>(getFromLocalStorage('userNode'));
  const [tldrawUserFilePath, setTldrawUserFilePath] = useState<string | null>(getFromLocalStorage('tldrawUserFilePath'));
  const [oneNoteNotebook, setOneNoteNotebook] = useState<any>(getFromLocalStorage('oneNoteNotebook'));
  const [error, setError] = useState<string | null>(null);


  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      setIsLoading(true);
      try {
        if (user) {
          console.log("AuthProvider - useEffect - User state changed:", user);
          const storedUserRole = getFromLocalStorage('userRole');
          const storedFirebaseIdToken = await user.getIdToken();
          const storedMsAccessToken = getFromLocalStorage('msAccessToken');
          const storedNeo4jDbName = getFromLocalStorage('neo4jDbName');
          const storedUserNode = getFromLocalStorage('userNode');
          const storedOneNoteNotebook = getFromLocalStorage('oneNoteNotebook');

          setStateAndStorage(setUser, 'user', user);
          setStateAndStorage(setUserRole, 'userRole', storedUserRole);
          setStateAndStorage(setToken, 'firebaseIdToken', storedFirebaseIdToken);
          setStateAndStorage(setMsToken, 'msAccessToken', storedMsAccessToken);
          setStateAndStorage(setNeo4jDbName, 'neo4jDbName', storedNeo4jDbName);
          setStateAndStorage(setUserNode, 'userNode', storedUserNode);
          setStateAndStorage(setTldrawUserFilePath, 'tldrawUserFilePath', storedUserNode?.path);
          setStateAndStorage(setOneNoteNotebook, 'oneNoteNotebook', storedOneNoteNotebook);

          console.log("AuthProvider - useEffect - Updated state:", { user, userRole: storedUserRole });
        } else {
          setStateAndStorage(setUser, 'user', null);
          setStateAndStorage(setUserRole, 'userRole', null);
          setStateAndStorage(setToken, 'firebaseIdToken', null);
          setStateAndStorage(setMsToken, 'msAccessToken', null);
          setStateAndStorage(setNeo4jDbName, 'neo4jDbName', null);
          setStateAndStorage(setUserNode, 'userNode', null);
          setStateAndStorage(setTldrawUserFilePath, 'tldrawUserFilePath', null);
          setStateAndStorage(setOneNoteNotebook, 'oneNoteNotebook', null);
          
          removeFromLocalStorage('userRole');
          removeFromLocalStorage('msAccessToken');
          removeFromLocalStorage('neo4jDbName');
          removeFromLocalStorage('userNode');
          removeFromLocalStorage('oneNoteNotebook');
        }
      } catch (error) {
        setError(error instanceof Error ? error.message : 'An unknown error occurred');
      } finally {
        setIsLoading(false);
      }
    });

    return () => unsubscribe();
  }, []);

  const login = async (email: string, password: string, role: string) => {
    try {
      const { user, firebaseIdToken, firestoreUserDoc } = await emailLogin(email, password);
      const userRole = role || firestoreUserDoc?.userRole || null;
      const userNode = await fetchUserNode(user.uid);
      
      setStateAndStorage(setUser, 'user', user);
      setStateAndStorage(setUserRole, 'userRole', userRole);
      setStateAndStorage(setToken, 'firebaseIdToken', firebaseIdToken);
      setStateAndStorage(setUserNode, 'userNode', userNode);
      setStateAndStorage(setTldrawUserFilePath, 'tldrawUserFilePath', userNode.path);
      return { user, firebaseIdToken, userNode, userRole, message: 'Login successful' };
    } catch (error) {
      setError(error instanceof Error ? error.message : 'An unknown error occurred');
      return { user: null, firebaseIdToken: null, userNode: null, userRole: null, message: 'Login failed' };
    }
  };

  const logout = async () => {
    console.log("Logging out...");
    setIsLoading(true);
    setError(null);
    try {
      await logoutUser();
      setStateAndStorage(setUser, 'user', null);
      setStateAndStorage(setUserRole, 'userRole', null);
      setStateAndStorage(setToken, 'firebaseIdToken', null);
      setStateAndStorage(setMsToken, 'msAccessToken', null);
      setStateAndStorage(setNeo4jDbName, 'neo4jDbName', null);
      setStateAndStorage(setUserNode, 'userNode', null);
      setStateAndStorage(setTldrawUserFilePath, 'tldrawUserFilePath', null);
      setStateAndStorage(setOneNoteNotebook, 'oneNoteNotebook', null);
      removeFromLocalStorage('user');
      removeFromLocalStorage('firebaseIdToken');
      removeFromLocalStorage('msAccessToken');
      removeFromLocalStorage('neo4jDbName');
      removeFromLocalStorage('userNode');
      removeFromLocalStorage('tldrawUserFilePath');
      removeFromLocalStorage('oneNoteNotebook');
    } catch (error) {
      setError(error instanceof Error ? error.message : 'An unknown error occurred');
    } finally {
      console.log("Finished logging out");
      setIsLoading(false);
    }
  };

  const registerUser = async (email: string, password: string, username: string, userRole: string): Promise<{ user: User | null; firebaseIdToken: string | null; userNode: UserNodeInterface | null; userRole: string | null; message: string | null }> => {
    try {
      const { user, firebaseIdToken, neo4jDbName, userNode, tldrawUserFilePath } = await registerUserWithEmailAndPassword(email, password, username, userRole);
      setStateAndStorage(setUser, 'user', user);
      setStateAndStorage(setUserRole, 'userRole', userRole);
      setStateAndStorage(setToken, 'firebaseIdToken', firebaseIdToken);
      setStateAndStorage(setNeo4jDbName, 'neo4jDbName', neo4jDbName);
      setStateAndStorage(setUserNode, 'userNode', userNode);
      setStateAndStorage(setTldrawUserFilePath, 'tldrawUserFilePath', userNode.path);
      return { user, firebaseIdToken, userNode, userRole, message: 'Email user registered successfully' };
    } catch (error) {
      return { user: null, firebaseIdToken: null, userNode: null, userRole: null, message: error instanceof Error ? error.message : 'An unknown error occurred' };
    }
  };

  const registerOrLoginWithMicrosoft = async (role: string): Promise<{ user: User | null; firebaseIdToken: string | null; msAccessToken: string | null; userNode: UserNodeInterface | null; userRole: string | null; message: string | null; oneNoteNotebook: any }> => {
    try {
      console.log("registerOrLoginWithMicrosoft - Starting");
      console.log(`Ready to sign in with Microsoft as ${role}`);
      const { user, firebaseIdToken, msAccessToken, neo4jDbName, userNode, oneNoteNotebook, isNewUser } = await signInWithMicrosoft(role);
      setStateAndStorage(setUser, 'user', user || null);
      setStateAndStorage(setUserRole, 'userRole', role);
      setStateAndStorage(setToken, 'firebaseIdToken', firebaseIdToken || null);
      setStateAndStorage(setMsToken, 'msAccessToken', msAccessToken || null);
      setStateAndStorage(setNeo4jDbName, 'neo4jDbName', neo4jDbName || null);
      setStateAndStorage(setUserNode, 'userNode', userNode || null);
      setStateAndStorage(setTldrawUserFilePath, 'tldrawUserFilePath', userNode?.path || null);
      setStateAndStorage(setOneNoteNotebook, 'oneNoteNotebook', oneNoteNotebook || null);
      
      console.log(`Signed in with Microsoft as ${role}`);
      console.log("OneNote Notebook:", oneNoteNotebook);
      setIsLoading(false);
      return { user, userRole: role, firebaseIdToken, msAccessToken, userNode, oneNoteNotebook, message: isNewUser ? 'User registered successfully with Microsoft' : 'User logged in successfully with Microsoft' };
    } catch (error) {
      setError(error instanceof Error ? error.message : 'An unknown error occurred');
      setIsLoading(false);
      return { user: null, userRole: null, firebaseIdToken: null, msAccessToken: null, userNode: null, oneNoteNotebook: null, message: 'Failed to sign in with Microsoft' };
    }
  };

  const getIdToken = async () => {
    if (user) {
      return await user.getIdToken(true);
    }
    throw new Error('User not authenticated');
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        userRole,
        firebaseIdToken,
        msAccessToken,
        userNode,
        tldrawUserFilePath,
        oneNoteNotebook,
        login,
        logout,
        registerUser,
        registerOrLoginWithMicrosoft,
        error,
        isLoading,
        neo4jDbName,
        clearError: () => setError(null),
        getIdToken,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
