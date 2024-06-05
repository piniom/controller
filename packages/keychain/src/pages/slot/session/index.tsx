import { Policy } from "@cartridge/controller";
import { Login, LoadingLogo, CreateController } from "components";
import { useMeQuery } from "generated/graphql";
import { useConnection } from "hooks/connection";
import { useController } from "hooks/controller";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { ConnectCtx } from "utils/connection";
import Controller from "utils/controller";

type SessionQueryParams = Record<string, string> & {
  chain_id: string;
  rpc_url: string;
  policies: string[];
  expires_at: number;
};

/** This page is for creating session with Slot */
const CreateSession: NextPage = () => {
  const router = useRouter();
  const queries = router.query as SessionQueryParams;

  const { data: user, isFetched } = useMeQuery();

  const { setContext } = useConnection();
  const { controller } = useController();

  useEffect(() => {
    const policies: Policy[] = queries.policies.map((p) => JSON.parse(p));

    setContext({
      origin: "https://x.cartridge.gg",
      policies,
    } as ConnectCtx);
  }, [queries.policies, queries.chainId, queries.rpcUrl, setContext]);

  useEffect(() => {
    if (user && controller) {
      console.log("its complete");
    }
  }, [user, controller, router]);

  if (!isFetched) {
    return <LoadingLogo />;
  }

  const onSuccess = (controller: Controller) => {
    router.push("/dashboard");
  };

  // return (
  //   <Login
  //     chainId={chainId}
  //     rpcUrl={rpcUrl}
  //     policies={policies}
  //     origin="https://x.cartridge.gg"
  //     onSignup={() => console.log("im signing up")}
  //     onSuccess={onSuccess}
  //   />
  // );

  return <CreateController />;
};

export default CreateSession;
