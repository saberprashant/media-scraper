import React, { useState }  from 'react';
import './home.css';
import MediaService from '../services/media.service';

function addUrls(setData) {	
	const urlsArrElem = document.getElementById('urls');

	if(urlsArrElem && urlsArrElem.value) {
		const urlsArr = urlsArrElem.value;
    const urls = urlsArr.split(',');

    //fetch from api
    if(urls.length > 0) {
      MediaService.findAssets({urls}).then(res => {
        res = res.data;
        if(res.data && Object.keys(res.data).length > 0) {
          let temp = [];
          console.log(Object.keys(res.data))
          Object.keys(res.data).forEach(k => {
            let arr = res.data[k];
            console.log(typeof(res.data[k]))
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
          setData(temp);
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
          <th scope="col">Fetched URL</th>
          <th scope="col">Media</th>
          <th scope="col">Type</th>
        </tr>
      </thead>
      <tbody>
        {results.map((r, i) => {
          <tr key={i}>
            <td>{r.url}</td>
            <td>
              {r.type === 'img' ? <img src={r.media} alt={r.media}/> : 'Video'}
            </td>
            <td>
              {r.type === 'img' ? 'Image' : 'Video'}
            </td>
          </tr>
        }
        )}
      </tbody>
    </table>
  )
}

function Home() {
  const [results, setResults] = useState([]);

  const setData = (data) => {
    setResults(data);
  }

	return (
		<div className="px-100">
			<label htmlFor="urls">Enter URLs(separated by comma):
				<div>
					<textarea id="urls" rows="7" cols="100" className="mr-30 mt-12"/>
				</div>
			</label>
			<button type="button" className="small-btn mt-12" onClick={() => {addUrls(setData)}}>Add</button>

      <div className="mt-12" id="results">
        {results.length > 0 ? createTable(results) : ''}
      </div>
		</div>
	);
}

export default Home;
