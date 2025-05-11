import { Definition } from "../types";

interface DefinitionBoxProps {
  definition: Definition;
}

export function DefinitionBox({ definition }: DefinitionBoxProps) {
  if (!definition) return null;

  return (
    <div className="w-full max-w-2xl rounded-lg border-2 border-transparent bg-card p-4 text-card-foreground shadow-sm">
      <h3 className="mb-2 text-lg font-medium text-primary">Definition</h3>
      <p className="text-muted-foreground">{definition.toString()}</p>
    </div>
  );
}
