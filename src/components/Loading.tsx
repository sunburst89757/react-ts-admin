import { Spin } from "antd";
import { ReactNode } from "react";
type Iprops = {
  children: ReactNode;
  tip: String;
  loading: boolean;
};
export function Loading({ children, tip, loading }: Iprops) {
  if (loading) {
    return <Spin tip={tip}>{children}</Spin>;
  }
  return <div>{children}</div>;
}
