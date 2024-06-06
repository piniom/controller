import { useState } from "react";
import { Signup } from "./Signup";
import { Login } from "./Login";
import { useConnection } from "hooks/connection";

export function CreateController({ isSlot }: { isSlot?: boolean }) {
  const { setController, error } = useConnection();
  const [showSignup, setShowSignup] = useState(false);
  const [prefilledUsername, setPrefilledUsername] = useState<string>();

  if (error) {
    return <>{error.message}</>;
  }

  return showSignup ? (
    <Signup
      prefilledName={prefilledUsername}
      onLogin={(username) => {
        setPrefilledUsername(username);
        setShowSignup(false);
      }}
      onSuccess={setController}
      isSlot={isSlot}
    />
  ) : (
    <Login
      prefilledName={prefilledUsername}
      onSignup={(username) => {
        setPrefilledUsername(username);
        setShowSignup(true);
      }}
      onSuccess={setController}
      isSlot={isSlot}
    />
  );
}
