import Link from 'next/link';
import React from 'react';

export default function RichCallToAction(props: {
  headline: {
    content: string;
    fontSize: number;
    color: string;
  };
  paragraph: {
    content: string;
    fontSize: number;
    color: string;
  };
  buttonText: string;
  linkText: string;
  linkHref: string;
}) {
  const { headline, paragraph, buttonText, linkText, linkHref } = props;

  return (
    <div className="flex flex-col items-center py-3">
      <h2
        className="font-medium text-3xl text-center"
        style={{ fontSize: `${headline.fontSize}px`, color: headline.color }}
      >
        {headline.content}
      </h2>
      <p
        className="text-center mt-2 text-gray-300"
        style={{ fontSize: `${headline.fontSize}px`, color: headline.color }}
      >
        {paragraph.content}
      </p>
      <button className="bg-blue-500 py-2 px-5 rounded-xl font-medium mt-5">{buttonText}</button>
      <Link href={linkHref} className="mt-2">
        {linkText}
      </Link>
    </div>
  );
}
