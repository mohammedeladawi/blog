import { createContext, useCallback } from "react";
import useFetchCol from "../hooks/useFetchCol";

export const PostsContext = createContext();

export const PostsProvider = ({ children }) => {
  const { getData, getNextData, data, loading, error, fetching, lastDoc } =
    useFetchCol("posts");

  const fetch = useCallback(() => {
    if (!data) {
      getData();
    }
  }, [data, getData]);

  const fetchNext = useCallback(() => {
    if (data && !loading && !fetching && lastDoc) {
      console.log("dddddd");
      getNextData(lastDoc);
    }
  }, [data, getNextData, loading, fetching, lastDoc]);

  const refetch = getData;

  return (
    <PostsContext.Provider
      value={{ fetch, data, loading, error, fetchNext, fetching, refetch }}
    >
      {children}
    </PostsContext.Provider>
  );
};
