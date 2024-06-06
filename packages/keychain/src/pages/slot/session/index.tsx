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
    if (controller) {
      const session = controller.session(origin);
      console.log("origin", origin, "my session", session);

      if (session) {
        const callbackUri = decodeURIComponent(queries.callback_uri);
        const encodedSession = decodeURIComponent(JSON.stringify(session));
        const callbackUriWithSession = `${callbackUri}?session=${encodedSession}`;
        // console.log("callback uri", callbackUri);

        // fetch(callbackUri, {
        //   method: "POST",
        //   body: JSON.stringify(session),
        //   headers: {
        //     "Content-Type": "application/json",
        //   },
        //   mode: "no-cors",
        // })
        fetch(callbackUriWithSession, { mode: "no-cors" });
        // .then((res) => {
        //   res.status === 200
        //     ? router.replace(`/slot/auth/success`)
        //     : router.replace(`/slot/auth/failure`);
        // })
        // .catch(() => router.replace(`/slot/auth/failure`));
      }
    }
  }, [controller, router, queries]);

  return <CreateController />;
};

export default CreateSession;
