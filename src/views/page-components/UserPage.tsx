import { useRouter } from "next/router";

export default function UserPage(): JSX.Element {
  const route = useRouter();
  console.log(route);

  return <p>Hello</p>;
}
