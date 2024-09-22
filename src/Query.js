/*const githubQuery ={
  query:`
  {
    viewer {
      name
    }
    search(query: "user:planetoftheweb sort:updated-desc", type: REPOSITORY, first: 20) {
      nodes {
        ... on Repository {
          name
          description
          id
          url
          viewerSubscription
          
        }
      }
    }
  }
`,
};+*/

/*const githubQuery = (pageCount, queryString) => {
  return {
    query: `
    {
      viewer {
        name
      }
      search(query: "${queryString}user:planetoftheweb sort:updated-desc", type: REPOSITORY, first: ${pageCount}) {
        repositoryCount
        nodes {
          ... on Repository {
            name
            description
            id
            url
            viewerSubscription
            licenseInfo {
              spdxId
            }
          }
        }
      }
    }

     `,
  };
};*/

const githubQuery = (
  pageCount,
  queryString,
  paginationKeyword,
  paginationString
) => {
  return {
    query: `
    {
      viewer {
        name
      }
        search(query: "${queryString} user:planetoftheweb sort:updated-desc", type: REPOSITORY, ${paginationKeyword}: ${pageCount}, ${paginationString}) {
        repositoryCount
        edges {
          cursor
          node {
            ... on Repository {
              name
              description
              id
              url
              viewerSubscription
              licenseInfo {
                spdxId
              }
            }
          }
        }
        pageInfo {
          startCursor
          endCursor
          hasNextPage
          hasPreviousPage
        }
      }
    }
  `,
  };
};

export default githubQuery;

/** {
  viewer {
    name
    repositories(first: 3) {
      nodes {
        name
        description
        id
        url
      }
    }
  }
}
  ` */


