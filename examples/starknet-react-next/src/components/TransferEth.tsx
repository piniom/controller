import { useAccount, useExplorer } from "@starknet-react/core";
import { useCallback, useState } from "react";
import { constants } from "starknet";

const ETH_CONTRACT =
  "0x049d36570d4e46f48e99674bd3fcc84644ddd6b96f7c741b1562b82f9e004dc7";

export const TransferEth = () => {
  const [chainId] = useState<constants.StarknetChainId>(
    constants.StarknetChainId.SN_SEPOLIA,
  );
  const [submitted, setSubmitted] = useState<boolean>(false);
  const { account } = useAccount();
  const explorer = useExplorer();
  const [txnHash, setTxnHash] = useState<string>();
  const execute005 = useCallback(async () => {
    if (!account) {
      return;
    }
    setSubmitted(true);
    setTxnHash(undefined);
    const res = await account.execute(
      [
        {
          contractAddress: ETH_CONTRACT,
          entrypoint: "approve",
          calldata: [account?.address, "0x11C37937E08000", "0x0"],
        },
        {
          contractAddress: ETH_CONTRACT,
          entrypoint: "transfer",
          calldata: [account?.address, "0x11C37937E08000", "0x0"],
        },
      ],
      undefined,
      {
        chainId,
      } as any,
    );

    setTxnHash(res.transaction_hash);
    setSubmitted(false);
    account
      .waitForTransaction(res.transaction_hash)
      .catch((err) => console.error(err))
      .finally(() => console.log("done"));
  }, [account, chainId]);

  if (!account) {
    return null;
  }

  return (
    <>
      <h2>Transfer Eth</h2>
      <p>Address: {ETH_CONTRACT}</p>

      <button onClick={() => execute005()} disabled={submitted}>
        Transfer 0.005 ETH to self
      </button>
      {txnHash && (
        <p>
          Transaction hash:{" "}
          <a
            href={explorer.transaction(txnHash)}
            target="_blank"
            rel="noreferrer"
          >
            {txnHash}
          </a>
        </p>
      )}
    </>
  );
};
