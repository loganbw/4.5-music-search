let $ = require('jquery');
let handlebars = require('handlebars');
let inputValue = document.getElementById("searchButton");
//console.log(musicUrl);
inputValue.addEventListener("click", function() {
  clearSearchResults();
  doSearch();
});


function clearSearchResults() {
  $('.results').html('');
}

function doSearch() {

  let musicValue = document.getElementById('searching').value;
  let musicUrl = 'https://itunes.apple.com/search';
  fetch(musicUrl + '?term=' + musicValue + '&country=US&media=music&limit=15').then(function(res) {
    return res.json();
  }).then(showSearchResults);

}


function showSearchResults(ajaxResults) {
  let musicResults = ajaxResults.results;
  console.log(ajaxResults);
  displayMusic(musicResults);
}

function displayMusic(musicResults) {
  let source = $('#music-template').html();
  let template = handlebars.compile(source);

  musicResults.forEach(function(music) {
    let searchResultHtml = $(template(music));


    //console.log(music.previewUrl);
    searchResultHtml.find('.image').data('music', music)
    //  console.log($(searchResultHtml).find('.image'));
    searchResultHtml.find('.image').click(playMusic)

    $('.results').append(searchResultHtml);

    //  let imageSource = document.querySelectorAll('.image')
    //  imageSource.forEach(function(item, counter){
    //    imageSource[counter].addEventListener('click', playMusic);
    //  });

  });
}

function playMusic(e) {

  let image = $(e.target)
  let track = event.target.id;
  image.data('music')
  console.log(image.data('music').previewUrl);
  document.querySelector(".music-player").src = image.data('music').previewUrl;
  document.querySelector(".music-player").play();
  document.querySelector('.nowplaying').textContent = 'Now Playing: ' + track;

}
