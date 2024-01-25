import { conform, useForm } from "@conform-to/react";
import { parse } from "@conform-to/zod";
import { type z } from "zod";
import { ErrorList } from "~/components/forms";

import { schema, useContactFormFetcher } from "~/routes/contact";

export function ContactForm() {
  const { fetcher, isPending } = useContactFormFetcher();

  const [form, fields] = useForm<z.infer<typeof schema>>({
    lastSubmission: fetcher.data?.submission,
    onValidate({ formData }) {
      return parse(formData, { schema });
    },
    shouldRevalidate: "onBlur",
  });

  return (
    <fetcher.Form
      {...form.props}
      method="POST"
      action="/contact"
      className="space-y-6 w-full sm:w-1/2"
    >
      <div className="flex flex-col gap-1">
        <label
          htmlFor="name"
          className="block text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl font-medium text-zinc-600"
        >
          Name
        </label>
        <input
          id="name"
          placeholder="Your name"
          className="mt-1 block w-full p-2 border border-zinc-700 rounded-md bg-zinc-800"
          {...conform.input(fields.name)}
        />
        {fields.name.errors?.length ? (
          <ErrorList id={`${fields.name}-error`} errors={fields.name.errors} />
        ) : null}
      </div>
      <div className="flex flex-col gap-1">
        <label
          htmlFor="email"
          className="block text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl font-medium text-zinc-600"
        >
          Email
        </label>
        <input
          id="email"
          placeholder="name@email.com"
          className="mt-1 block w-full p-2 border border-zinc-700 rounded-md bg-zinc-800"
          {...conform.input(fields.email)}
        />
        {fields.email.errors?.length ? (
          <ErrorList
            id={`${fields.email}-error`}
            errors={fields.email.errors}
          />
        ) : null}
      </div>

      <div className="flex flex-col gap-1 md:col-start-3 md:col-end-5 md:row-start-2 md:row-end-3">
        <label
          htmlFor="message"
          className="block text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl font-medium text-zinc-600"
        >
          Message
        </label>
        <textarea
          id="message"
          rows={4}
          className="mt-1 block w-full p-2 border border-zinc-700 rounded-md bg-zinc-800"
          placeholder="Your message"
          {...conform.textarea(fields.message)}
        />
        {fields.message.errors?.length ? (
          <ErrorList
            id={`${fields.message}-error`}
            errors={fields.message.errors}
          />
        ) : null}
      </div>
      <div>
        <button
          disabled={isPending || fetcher.data?.status === "success"}
          type="submit"
          className={`w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl font-semibold text-zinc-950 bg-emerald-300 hover:bg-emerald-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-400 ${
            fetcher.data?.status === "success"
              ? "bg-zinc-600 hover:bg-zinc-600"
              : ""
          }`}
        >
          {isPending
            ? "Sending"
            : fetcher.data?.status === "success"
            ? "We got it!"
            : "Get in Touch"}
        </button>
      </div>
    </fetcher.Form>
  );
}
