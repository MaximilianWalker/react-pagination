import React, { useState } from 'react';
import logo from './logo.svg';
import _ from 'lodash'
import './index.css';

export default ({
  data,
  pageDataSize,
  onChange,
  displayedPageRange,
  parentComponent,
  pageComponent,
  icons
}) => {

  const [page, setPage] = useState()

  // const [pageData, setPageData] = useState()

  function getNumberOfPages() {
    return Math.ceil(data.length / pageDataSize);
  }

  function getPageList(pageRange) {

    let range = displayedPageRange > pageRange ? displayedPageRange : pageRange

    let halfRange = range / 2;
    let start, end = 0;

    if (halfRange % 1 !== 0) {
      start = page - Math.floor(halfRange);
      end = page + Math.floor(halfRange);
    } else {
      start = page - (halfRange - 1);
      end = page + halfRange;
    }

    if (start < 1) {
      end += Math.abs(start) + 1;
      start = 1;
    }

    if (end > pageRange) {
      start -= end - pageRange;
      end = pageRange;
    }

    return _.range(start, end);
  }

  function handleUpdatePageResults() {
    let start = (this.state.page - 1) * this.pageSize;
    let end = start + this.pageSize;
    result = data.slice(start, end);
    onChange(result)
  }

  function handleChangePage(value) {
    let page = -1
    let nPages = this.getNumberOfPages()
    if (value === "last") {
      page = nPages
    } else if (value === "first") {
      page = 1
    } else if (value === "next") {
      if (this.state.page < nPages) {
        page = this.state.page + 1
      }
    } else if (value === "previous") {
      if (this.state.page > 1) {
        page = this.state.page - 1
      }
    } else {
      page = value
    }
    if (page != -1) {
      await setPage(page)
    }
    handleUpdatePageResults()
  }

  let Parent = parentComponent

  let Page = pageComponent

  let { First, Previous, Next, Last } = icons

  return (
    <Parent>
      <Page onClick={() => handleChangePage("first")}> <First /> </Page>
      <Page onClick={() => handleChangePage("previous")}> <Previous /> </Page>
      {
        getPageList(getNumberOfPages()).map(n => {
          return (
            <Page key={n} onClick={() => handleChangePage(n)} active={page === n} >
              {n}
            </Page>
          );
        })
      }
      <Page onClick={() => handleChangePage("next")}> <Next /> </Page>
      <Page onClick={() => handleChangePage("last")}> <Last /> </Page>
    </Parent>
  );
}