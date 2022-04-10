import React, { useState }  from 'react';
import './home.css';
import MediaService from '../services/media.service';

function addUrls(setResults) {	
	const urlsArrElem = document.getElementById('urls');

	if(urlsArrElem && urlsArrElem.value) {
		const urlsArr = urlsArrElem.value;
    const urls = urlsArr.split(',');

    //fetch from api
    if(urls.length > 0) {
      MediaService.findAssets({urls}).then(res => {
        if(res.data && Object.keys(res.data).length > 0) {
          let temp = [];
          Object.keys(res.data).forEach(k => {
            let arr = res.data[k];
            console.log(res.data[k])
            if(arr && arr.length > 0) {
              arr.forEach(u => {
                temp.push({
                  media: u.url,
                  type: u.type,
                  url: k
                })
              })
            }
          })
          console.log(temp)
          setResults(temp);
        }
      })
    }
	} else {
    //show input error
	}
}

function createTable(results) {
  return (
    <table className="table">
      <thead>
        <tr>
          <th scope="col">URL</th>
          <th scope="col">Media</th>
          <th scope="col">Type</th>
        </tr>
      </thead>
      <tbody>
        {results.map((r, i) => {
          <tr key={i}>
            <td>{r.url}</td>
            <td>{r.media}</td>
            <td>{r.type}</td>
          </tr>
        }
        )}
      </tbody>
    </table>
  )
}

function Home() {
  const [results, setResults] = useState([]);

	return (
		<div className="px-100">
			<label htmlFor="urls">Enter URLs(separated by comma):
				<div>
					<textarea id="urls" rows="7" cols="100" className="mr-30 mt-12"/>
				</div>
			</label>
			<button type="button" className="small-btn mt-12" onClick={() => {addUrls(setResults)}}>Add</button>

      <div className="mt-12" id="results">
        {results.length > 0 ? createTable(results) : ''}
      </div>
		</div>
	);
}

export default Home;
