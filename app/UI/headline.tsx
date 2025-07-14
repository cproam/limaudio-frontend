import Link from "next/link";
import { CSSProperties } from "react";

type HeadlineProps = {
  text: string;
  stylecss?: CSSProperties;
  link?: string;
  headstyle?: CSSProperties;
  left?: boolean;
};
export default function Headline({
  text,
  stylecss,
  link,
  headstyle,
  left,
}: HeadlineProps) {
  return (
    <>
      {link ? (
        <Link href={link} style={{ color: "var(--color-black1C)" }}>
          <div
            className={`text-h3-bold ${left ? "headline-left" : ""}`}
            style={{ ...stylecss, ...headstyle }}
          >
            {text}
          </div>
        </Link>
      ) : (
        <div
          className={`text-h3-bold ${left ? "headline-left" : ""}`}
          style={{ ...stylecss, ...headstyle }}
        >
          {text}
        </div>
      )}
    </>
  );
}
