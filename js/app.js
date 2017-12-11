document.addEventListener('DOMContentLoaded', function(){

	document.getElementById('main-form').addEventListener('submit', searchWiki);

	function searchWiki (e){
		e.preventDefault();

		let searchBox = document.getElementById('search-box').value;
		let searchHead = document.getElementById('search-term');

		if(!searchBox.length) {
			return;
		}

		console.log(searchBox);

		let url = 'https://en.wikipedia.org/w/api.php?action=opensearch&origin=*&format=json&search='+searchBox;
		let xhr = new XMLHttpRequest();
		xhr.open('GET', url, true);
		console.log(url);
		xhr.setRequestHeader( 'Content-Type', 'application/json; charset=UTF-8');
		xhr.setRequestHeader( 'Api-User-Agent', 'My Wiki Search App for freeCodeCamp' );

		console.log(xhr);
		xhr.onload = function(){
		  if(this.status == 200){
			let answers = JSON.parse(this.responseText);

			console.log(answers);

			var output = '';
			for(let i in answers[1]){
				output +=
				`
				<div class="wiki-ans">
					<h3 class="art-title">${answers[1][i]}</h3>
					<p class="short-art">${answers[2][i]}</p>
					<a href="${answers[3][i]}" class="art-link" target="_blank">${answers[3][i]}</a>
				</div>
				`;
			}

			searchHead.innerText = `Typed in search phrase: ${searchBox}`;
			document.getElementById('wiki-wrap').innerHTML = output;
		  }
		}

		xhr.onerror = function(){
		  console.log('Request Error...');
		}

		xhr.send();

		document.forms["main-form"].reset();
	};
});
