import React from 'react'
import { PromptCardList } from './Feed';

const SubSection = ({subTitle, searchedPost, handleClick}) => {
  return (
    <div>
        <span>{subTitle}</span>
      <PromptCardList data={searchedPost} handleClick={handleClick} />
    </div>
  );
}

export default SubSection