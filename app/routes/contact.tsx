import { parse } from "@conform-to/zod";
import {
  Body,
  Column,
  Container,
  Head,
  Html,
  Preview,
  Row,
  Section,
  Text,
} from "@react-email/components";
import { json, type ActionFunctionArgs } from "@remix-run/node";
import { useFetcher } from "@remix-run/react";
import { z } from "zod";
import { sendEmail } from "~/utils/email.server";
import { useDelayedIsPending } from "~/utils/misc";

export const schema = z.object({
  name: z.string({ required_error: "Name is required" }),
  email: z
    .string({ required_error: "Email is required" })
    .email("Email is invalid"),
  message: z.string().max(250, "Description must be less than 250 characters"),
});

export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData();
  const submission = parse(formData, { schema });

  if (!submission.value || submission.intent !== "submit") {
    return json({ status: "idle", submission } as const);
  }

  try {
    const response = await sendEmail({
      subject: `New Contact: ${submission.value.name}`,
      to: "hello@robertmartin.dev",
      react: <ContactSubmissionEmail {...submission.value} />,
    });
    if (response.status === "success") {
      return json(
        {
          status: "success",
          submission: { ...submission, payload: null },
        } as const,
        { status: 200 }
      );
      // TODO: send confirmation email to user?
    } else {
      submission.error[""] = [response.error.message];
      return json({ status: "error", submission } as const, { status: 500 });
    }
  } catch (error) {
    if (error instanceof Error) {
      submission.error[""] = [error.message];
      return json({ status: "error", submission } as const, { status: 500 });
    } else {
      submission.error[""] = ["An unknown error occurred"];
      return json({ status: "error", submission } as const, { status: 500 });
    }
  }
}

export function useContactFormFetcher() {
  const fetcher = useFetcher<typeof action>();
  const isPending = useDelayedIsPending({
    formAction: "/contact",
    formMethod: "POST",
  });

  return { fetcher, isPending };
}

function ContactSubmissionEmail({
  name,
  message,
  email,
}: z.infer<typeof schema>) {
  return (
    <Html>
      <Head />
      <Preview>New contact: {name}</Preview>
      <Body>
        <Container>
          <Section>
            <Row>
              <Column>
                <Text>
                  <b>Email: </b>
                  {email}
                </Text>
                <Text>
                  <b>Description: </b>
                  {message}
                </Text>
              </Column>
            </Row>
          </Section>
        </Container>
      </Body>
    </Html>
  );
}
