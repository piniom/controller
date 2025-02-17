import { AsyncMethodReturns } from "@cartridge/penpal";
import {
  useContext,
  createContext,
  useState,
  useEffect,
  PropsWithChildren,
  useCallback,
} from "react";
import Controller from "utils/controller";
import { connectToController, ConnectionCtx } from "utils/connection";
import { isIframe } from "components/connect/utils";
import { RpcProvider } from "starknet";
import { Policy } from "@cartridge/controller";

const ConnectionContext = createContext<ConnectionContextValue>(undefined);

type ConnectionContextValue = {
  context: ConnectionCtx;
  controller: Controller;
  origin: string;
  rpcUrl: string;
  chainId: string;
  policies: Policy[];
  error: Error;
  setContext: (context: ConnectionCtx) => void;
  setController: (controller: Controller) => void;
  close: () => void;
};

export function ConnectionProvider({ children }: PropsWithChildren) {
  const [parent, setParent] = useState<ParentMethods>();
  const [context, setContext] = useState<ConnectionCtx>();
  const [origin, setOrigin] = useState<string>();
  const [rpcUrl, setRpcUrl] = useState<string>();
  const [chainId, setChainId] = useState<string>();
  const [policies, setPolicies] = useState<Policy[]>([]);
  const [controller, setController] = useState(Controller.fromStore);
  const [error, setError] = useState<Error>();

  const parsePolicies = (policiesStr: string | null): Policy[] => {
    if (!policiesStr) return [];
    return JSON.parse(policiesStr);
  };

  useEffect(() => {
    if (!isIframe()) {
      const urlParams = new URLSearchParams(window.location.search);
      setOrigin(urlParams.get("origin") || process.env.NEXT_PUBLIC_ORIGIN);
      setRpcUrl(
        urlParams.get("rpc_url") || process.env.NEXT_PUBLIC_RPC_SEPOLIA,
      );
      setPolicies(parsePolicies(urlParams.get("policies")));
      return;
    }

    const connection = connectToController({
      setOrigin,
      setRpcUrl,
      setPolicies,
      setContext,
      setController,
    });
    connection.promise.then((parent) =>
      setParent(parent as unknown as ParentMethods),
    );

    return () => {
      connection.destroy();
    };
  }, []);

  useEffect(() => {
    if (rpcUrl) {
      new RpcProvider({ nodeUrl: rpcUrl })
        .getChainId()
        .then(setChainId)
        .catch(() => {
          setError(new Error("Unable to fetch Chain ID from provided RPC URL"));
        });
    }
  }, [rpcUrl]);

  const close = useCallback(async () => {
    if (!parent) return;

    try {
      await parent.close();
    } catch (e) {
      // Always fails for some reason
    }
  }, [parent]);

  return (
    <ConnectionContext.Provider
      value={{
        context,
        controller,
        origin,
        rpcUrl,
        chainId,
        policies,
        error,
        setController,
        setContext,
        close,
      }}
    >
      {children}
    </ConnectionContext.Provider>
  );
}

type ParentMethods = AsyncMethodReturns<{ close: () => Promise<void> }>;

export function useConnection() {
  const ctx = useContext<ConnectionContextValue>(ConnectionContext);
  if (!ctx) {
    throw new Error("ConnectionProvider must be placed");
  }

  return ctx;
}
