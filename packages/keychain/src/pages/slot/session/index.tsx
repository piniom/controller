import { CreateController } from "components";
import { useController } from "hooks/controller";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect } from "react";

type SessionQueryParams = Record<string, string> & {
  callback_uri: string;
};

/** This page is for creating session with Slot */
const CreateSession: NextPage = () => {
  const router = useRouter();
  const queries = router.query as SessionQueryParams;

  const { controller } = useController();

  useEffect(() => {
    if (controller && queries.callback_uri) {
      const session = controller.session(origin);
      console.log("origin", origin, "my session", session);

      if (session) {
        const callbackUri = decodeURIComponent(queries.callback_uri);

        fetch(callbackUri, {
          method: "POST",
          body: JSON.stringify(session),
          headers: {
            "Content-Type": "application/json",
          },
        })
          .then((res) => {
            res.status === 200
              ? router.replace(`/slot/auth/success`)
              : new Promise((_, reject) => reject(res));
          })
          .catch((e) => {
            console.error(e);
            router.replace(`/slot/auth/failure`);
          });
      }
    }
  }, [controller, router, queries]);

  return <CreateController />;
};

export default CreateSession;
