import React, { Component } from 'react';

import AddLink from './AddLink';
import PrivateHeader from './PrivateHeader';
import LinksList from './LinksList';
import LinksListFilters from './LinksListFilters';
import PageContent from './PageContent';

export default () => {
  return (
    <div>
      <PrivateHeader title="Your great links" />
      <PageContent>
        <LinksListFilters />
        <AddLink />
        <LinksList />
      </PageContent>
    </div>
  );
}
