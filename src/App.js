import logo from './logo.svg';
import './App.css';
import RepoInfo from "./RepoInfo";
import { useCallback, useEffect, useState } from 'react';
import github from './db'; 
import query from './Query';
import SearchBox from "./SearchBox";
import NavButtons from "./NavButtons";

function App() {
  let [userName,setUserName]=useState("");
  let [repoList,setRepoList]=useState(null);
  let [pageCount, setPageCount] = useState(10);
  //let [queryString, setQueryString] = useState("tutorials");
  let [queryString, setQueryString] = useState("");
  let [totalCount, setTotalCount] = useState(null);

  let [startCursor, setStartCursor] = useState(null);
  let [endCursor, setEndCursor] = useState(null);
  let [hasPreviousPage, setHasPreviousPage] = useState(false);
  let [hasNextPage, setHasNextPage] = useState(true);
  let [paginationKeyword, setPaginationKeyword] = useState("first");
  let [paginationString, setPaginationString] = useState("");


  const fetchData=useCallback(()=>{
   // const queryText = JSON.stringify(query(pageCount, queryString));
   const queryText = JSON.stringify(
    query(pageCount, queryString, paginationKeyword, paginationString)
  );
   fetch(github.baseURL,{
      method:"post",
      headers: github.headers,
     // body: JSON.stringify(query),
     body: queryText,
    })
    .then((response)=>response.json())
    .then((data)=> {
      const viewer=data.data.viewer;
     // const repos = data.data.search.nodes;
     const repos = data.data.search.edges;
      const total = data.data.search.repositoryCount;
      const start = data.data.search.pageInfo?.startCursor;
        const end = data.data.search.pageInfo?.endCursor;
        const next = data.data.search.pageInfo?.hasNextPage;
        const prev = data.data.search.pageInfo?.hasPreviousPage;

      setUserName(viewer.name);
     // setRepoList(viewer.repositories.nodes);
     setRepoList(repos);
     setTotalCount(total);
      console.log(data);
      setStartCursor(start);
        setEndCursor(end);
        setHasNextPage(next);
        setHasPreviousPage(prev);
    })
    .catch((err)=>{
      console.log(err);
    });

  //},[pageCount, queryString]);
}, [pageCount, queryString, paginationString, paginationKeyword]);

  useEffect(()=>{
    fetchData();
    
  },[fetchData]);

  return (
    <div className="App">
      <h1 className="text-primary">
     
        <i className="bi bi-diagram-2-fill"></i>
         Repos
        </h1>
        <p>hey there {userName}</p>

      {/*  <p>
        <b>Search for:</b> {queryString} | <b>Items per page:</b> {pageCount} |{" "}
        <b>Total results:</b> {totalCount}
      </p>*/}
       <SearchBox
        totalCount={totalCount}
        pageCount={pageCount}
        queryString={queryString}
        onTotalChange={(myNumber) => {
          setPageCount(myNumber);
        }}
        onQueryChange={(myString) => {
          setQueryString(myString);
        }}
      />
<NavButtons
        start={startCursor}
        end={endCursor}
        next={hasNextPage}
        previous={hasPreviousPage}
        onPage={(myKeyword, myString) => {
          setPaginationKeyword(myKeyword);
          setPaginationString(myString);
        }}
      />

     {repoList && (
      <ul className='list-group'>
{
repoList.map((repo)=>(
 // <li className='list-group' key={repo.id.toString()}>
 //   <a className='h5' href={repo.url}>
  //    {repo.name}
 //   </a>
 //   <p className='small'>{repo.description}</p>
 // </li>
 //<RepoInfo key={repo.id} repo={repo} />
 <RepoInfo key={repo.node.id} repo={repo.node} />
))


}


      </ul>
     )}
     <NavButtons
        start={startCursor}
        end={endCursor}
        next={hasNextPage}
        previous={hasPreviousPage}
        onPage={(myKeyword, myString) => {
          setPaginationKeyword(myKeyword);
          setPaginationString(myString);
        }}
      />
    </div>
  );
}

export default App;

