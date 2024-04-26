import Feed from '@components/Feed';
import Image from 'next/image'
import { useState } from 'react';

export default function Home() {

  return (
    <section className="w-full flex justify-center flex-col">
      <h1 className="head_text text-center">
        Discover & Share
        <br className="max-md:hidden" />
        <span className="orange_gradient">AI-Powered Prompts</span>
      </h1>
      <p className="desc text-center mx-auto">
        Prompt Hub is an open-source AI prompting tool for modern world to
        discover, create and share ceative prompts
      </p>

      <Feed />
    </section>
  );
}
