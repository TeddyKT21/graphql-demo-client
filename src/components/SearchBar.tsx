import { useState } from "react";

function hasKeyWords(
  keys: string[],
  wordsArray: string[],
  p: Product
): boolean {
  for (let i = 0; i < keys.length; i++) {
    let fieldHasKeyWord = false;
    for (let j = 0; j < wordsArray.length; j++) {
      if (p[keys[i]].toString().toLocaleLowerCase().includes(wordsArray[j])) {
        fieldHasKeyWord = true;
        return true;
      }
    }
  }
  return false;
}

export const SearchBar = ({
  onSearch,
  data,
}: {
  onSearch: Function;
  data: Product[] | undefined;
}) => {
  const [keyWords, setKeyWords] = useState("");
  function filterData() {
    if (!keyWords || !data || data.length === 0) onSearch(data);
    else {
      const keys = Object.keys(data[0]).filter((k) => k !== "_id" && k!=="image");
      let wordsArray = keyWords.trim().toLocaleLowerCase().split(" ");
      const filteredData = data.filter((p) => hasKeyWords(keys, wordsArray, p));
      onSearch(filteredData);
    }
  }
  return (
    <div className="searchBar">
      <input type="text" onChange={(e) => setKeyWords(e.target.value)}></input>
      <button onClick={filterData}>
        <i className="material-symbols-rounded">search</i>
      </button>
    </div>
  );
};
