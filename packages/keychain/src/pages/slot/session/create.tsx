import { Policy } from "@cartridge/controller";
import { Login, LoadingLogo } from "components";
import { useMeQuery } from "generated/graphql";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { Connect } from "pages";
import { useEffect, useState } from "react";
import { constants } from "starknet";

/** This page is for creating session with Slot */
const CreateSession: NextPage = () => {
  const router = useRouter();
  const queries = router.query as Record<string, string>;

  useEffect(() => {
    console.log("router", router.query);
  }, [router]);

  // const [showSignup, setShowSignup] = useState(false);
  // const [prefilledUsername, setPrefilledUsername] = useState<string>();
  // const [controller, setController] = useController();

  const [context, setContext] = useState<Connect>({
    policies: [],
    type: "connect",
    origin: process.env.NEXT_PUBLIC_ORIGIN,
    reject: () => {},
    resolve: () => {},
  });

  const { data: _, isFetched } = useMeQuery();

  // TODO: if oauth is present, how do i get the user associated with the token?

  useEffect(() => {
    if (queries.policies) {
      const query_policies = queries.policies as unknown as any[];
      const policies: Policy[] = query_policies.map((p) => JSON.parse(p));
      setContext((prev) => ({ ...prev, policies }));
    }
  }, [queries.policies]);

  if (!isFetched) {
    return <LoadingLogo />;
  }

  // create context to pass to the Login component

  // if (policies) {
  //   return (
  //     <Connect
  //       chainId={constants.StarknetChainId.SN_SEPOLIA}
  //       origin={"https://x.cartridge.gg"}
  //       policies={policies}
  //       onConnect={onConnect}
  //       onCancel={onCancel}
  //       onLogout={() => {}}
  //     />
  //   );
  // }

  return (
    <Login
      chainId={constants.StarknetChainId.SN_SEPOLIA}
      context={context}
      onSignup={() => console.log("im signing up")}
      onSuccess={() => console.log("im success")}
    />
  );
};

export default CreateSession;
