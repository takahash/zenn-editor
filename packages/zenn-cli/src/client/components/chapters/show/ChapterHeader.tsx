import React, { useMemo } from 'react';
import { styled } from '@mui/system';
import { Book, Chapter } from '../../../../common/types';
import { getChapterErrors } from '../../../lib/validator';
import { ContentContainer } from '../../ContentContainer';
import { PropertyRow } from '../../PropertyRow';
import { ValidationErrors } from '../../ValidationErrors';
import { LinkBook } from '../../Routes';
import ArrowBackIosOutlinedIcon from '@mui/icons-material/ArrowBackIosOutlined';

type Props = { chapter: Chapter; book: Book };

export const ChapterHeader: React.VFC<Props> = ({ chapter, book }) => {
  const validationErrors = useMemo(() => getChapterErrors(chapter), [chapter]);

  return (
    <StyledChapterHeader>
      <div className="chapter-header__book">
        <LinkBook slug={book.slug} className="chapter-header__book-link">
          <ArrowBackIosOutlinedIcon className="book-header__book-back" />
          <span className="chapter-header__book-title">{book.title}</span>
        </LinkBook>
      </div>
      <div className="chapter-header__main">
        <ContentContainer>
          <h1 className="chapter-header__title">
            {chapter.title || 'titleを指定してください'}
          </h1>
          <div className="chapter-header__properties">
            <PropertyRow title="slug">{chapter.slug}</PropertyRow>
            <PropertyRow title="free">
              {book.price === 0 ? (
                '本の価格が¥0であるためチャプターは無料公開されます'
              ) : (
                <>
                  {chapter.free
                    ? 'true（無料公開）'
                    : 'false（購入者のみ閲覧可）'}
                </>
              )}
            </PropertyRow>
          </div>
          {!!validationErrors.length && (
            <div className="chapter-header__validation-errors">
              <ValidationErrors validationErrors={validationErrors} />
            </div>
          )}
        </ContentContainer>
      </div>
    </StyledChapterHeader>
  );
};

const StyledChapterHeader = styled('header')`
  background: var(--c-gray-bg);
  .chapter-header__book {
    background: rgba(158, 186, 203, 0.3);
    padding: 0.6rem 1rem;
  }
  .chapter-header__book-link {
    display: flex;
    align-items: center;
    color: var(--c-gray);
    &:hover {
      color: var(--c-body);
    }
  }
  .book-header__book-back {
    width: 14px;
    height: 14px;
  }

  .chapter-header__book-title {
    margin-left: 5px;
    flex: 1;
    font-size: 13.5px;
    font-weight: 700;
  }
  .chapter-header__main {
    padding: 2.2rem 0 2.8rem;
  }
  .chapter-header__title {
    font-size: 1.8rem;
  }
  .chapter-header__properties {
    margin-top: 1rem;
  }
  .chapter-header__validation-errors {
    margin-top: 1.4rem;
  }
`;
