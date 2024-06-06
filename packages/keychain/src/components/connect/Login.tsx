import { Field } from "@cartridge/ui";
import { VStack, Button } from "@chakra-ui/react";
import {
  Container,
  FOOTER_MIN_HEIGHT,
  Banner,
  Footer,
  Content,
} from "components/layout";
import { Form as FormikForm, Field as FormikField, Formik } from "formik";
import { useCallback, useState } from "react";
import Controller from "utils/controller";
import { FormValues, LoginProps } from "./types";
import { useAnalytics } from "hooks/analytics";
import { fetchAccount, validateUsernameFor } from "./utils";
import { RegistrationLink } from "./RegistrationLink";
import { useControllerTheme } from "hooks/theme";
import { doLogin } from "hooks/account";
import { Error as ErrorComp } from "components/Error";

export function Login({
  chainId,
  rpcUrl,
  origin,
  policies,
  prefilledName = "",
  isSlot,
  onSuccess,
  onSignup,
}: LoginProps) {
  const { event: log } = useAnalytics();
  const theme = useControllerTheme();
  const [isLoading, setIsLoading] = useState(false);
  const [expiresAt] = useState<bigint>(3000000000n);
  const [error, setError] = useState();

  const onSubmit = useCallback(
    async (values: FormValues) => {
      setIsLoading(true);

      const {
        account: {
          credentials: {
            webauthn: [{ id: credentialId, publicKey }],
          },
          contractAddress: address,
        },
      } = await fetchAccount(values.username);

      try {
        const controller = new Controller({
          chainId,
          rpcUrl,
          address,
          username: values.username,
          publicKey,
          credentialId,
        });

        if (isSlot) {
          await doLogin(values.username, credentialId, publicKey);
        } else {
          await controller.approve(origin, expiresAt, policies);
        }

        controller.store();
        onSuccess(controller);

        log({ type: "webauthn_login", address });
      } catch (e) {
        setError(e);

        log({
          type: "webauthn_login_error",
          payload: {
            error: e?.message,
          },
          address,
        });
      }

      setIsLoading(false);
    },
    [chainId, rpcUrl, origin, policies, expiresAt, isSlot, log, onSuccess],
  );

  return (
    <Container overflowY={error ? "auto" : undefined}>
      <Formik
        initialValues={{ username: prefilledName }}
        onSubmit={onSubmit}
        validateOnChange={false}
        validateOnBlur={false}
      >
        {(props) => (
          <FormikForm style={{ width: "100%" }}>
            <Banner
              title={
                theme.id === "cartridge"
                  ? "Play with Cartridge Controller"
                  : `Play ${theme.name}`
              }
              description="Enter your Controller username"
            />

            <Content>
              <VStack
                align="stretch"
                pb={error ? FOOTER_MIN_HEIGHT : undefined}
              >
                <FormikField
                  name="username"
                  placeholder="Username"
                  validate={validateUsernameFor("login")}
                >
                  {({ field, meta, form }) => (
                    <Field
                      {...field}
                      autoFocus
                      placeholder="Username"
                      touched={meta.touched}
                      error={meta.error}
                      isLoading={props.isValidating}
                      isDisabled={isLoading}
                      onClear={() => form.setFieldValue(field.name, "")}
                    />
                  )}
                </FormikField>

                <ErrorComp error={error} />
              </VStack>
            </Content>

            <Footer origin={origin} policies={policies} isSlot={isSlot}>
              <Button
                type="submit"
                colorScheme="colorful"
                isLoading={isLoading}
              >
                Log in
              </Button>
              <RegistrationLink
                description="Need a controller?"
                onClick={() => onSignup(props.values.username)}
              >
                Sign up
              </RegistrationLink>
            </Footer>
          </FormikForm>
        )}
      </Formik>
    </Container>
  );
}
