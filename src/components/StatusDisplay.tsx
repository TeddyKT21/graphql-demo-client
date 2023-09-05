import { ApolloError } from "@apollo/client";

export const StatusDisplay = ({
  loading,
  loadingMessage,
  error,
  errorMessage,
}: {
  loading: boolean;
  loadingMessage: string;
  error: Error | string | ApolloError | undefined;
  errorMessage: string | undefined | null;
}) => {
  return (
    <div
      className={
        "statudDisplay" + loading ? " loading" : "" + error ? " error" : ""
      }
    >
      {loading && loadingMessage}
      {error && errorMessage}
    </div>
  );
};
