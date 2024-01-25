export type ListOfErrors = Array<string | null | undefined> | null | undefined;

export function ErrorList({
  id,
  errors,
}: {
  errors?: ListOfErrors;
  id?: string;
}) {
  const errorsToRender = errors?.filter(Boolean);
  if (!errorsToRender?.length) return null;
  console.log(errorsToRender);
  return (
    <ul id={id} className="flex flex-col gap-1 text-red-400">
      {errorsToRender.map((e) => (
        <li key={e} className="text-foreground-danger text-xs">
          {e}
        </li>
      ))}
    </ul>
  );
}
