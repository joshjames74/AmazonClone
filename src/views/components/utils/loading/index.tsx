import { SpinnerIcon } from "@chakra-ui/icons";

const RenderSpinner = (): JSX.Element => {
  return <SpinnerIcon />;
};

export default function RenderLoading(
  loading: boolean,
  child: JSX.Element
): JSX.Element {
  return loading ? RenderSpinner() : child;
}
