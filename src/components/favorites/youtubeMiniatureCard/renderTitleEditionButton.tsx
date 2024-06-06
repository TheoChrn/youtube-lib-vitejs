import { CheckCircle, LoaderIcon, Pencil } from "lucide-react";

const RenderTitleEditionButton = ({
  isPending,
  isEditing,
}: {
  isPending: boolean;
  isEditing: boolean;
}) => {
  if (isPending) return <LoaderIcon className="animate-spin" />;

  if (isEditing) return <CheckCircle />;

  return <Pencil />;
};

export default RenderTitleEditionButton;
