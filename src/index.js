document.addEventListener('DOMContentLoaded', () => {
  console.log('%c DOM Content Loaded and Parsed!', 'color: magenta')

  let imageId = 2472 //Enter the id from the fetched image here

  const imageURL = "https://randopic.herokuapp.com/images/2472"

  const likeURL = `https://randopic.herokuapp.com/likes/`

  const commentsURL = `https://randopic.herokuapp.com/comments/`


  renderPage(imageURL);

  likeButtonListener(imageId);

  commentForm(imageId);

})

const renderPage = (imageURL) => {
  fetch(imageURL).then((response) => {
    return response.json()
  }).then((object) => {
    let image = object.url;
    let name = object.name;
    let likes = object.like_count;
    // debugger;
    let commentsArr = object.comments

    createImageCard(image, name, likes, commentsArr)
  })
}

const createImageCard = (image, name, likes, commentsArr) => {

  let cardDiv = document.getElementById("image_card")

  cardDiv.querySelector('img').src = image;

  cardDiv.querySelector('h4').innerHTML = name;

  cardDiv.querySelector('span').querySelector('span').innerHTML = likes;

  commentsArr.forEach((comment) => {
    newComment(comment)
  })
  /////comments is array
}

const newComment = (commentObj) => {
  /////this is a ul, add li's to this
  document.getElementById('comments').innerHTML +=
   `<li>${commentObj.content}</li>`
}




const likeButtonListener = (imageId) => {
  let button = document.getElementById('like_button')

  button.addEventListener('click', (event) => {
    // debugger;
    let likeCount = parseInt(event.target.parentElement.querySelector('span').querySelector('span').innerText)
    likeCount++
    event.target.parentElement.querySelector('span').querySelector('span').innerText = likeCount

    likeButtonFetch(imageId)
  })
}

const likeButtonFetch = (imageId) => {
  fetch('https://randopic.herokuapp.com/likes', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      image_id: imageId
    })
  })
}


//////add an event listener to the form, submit event
//////grab the values from the input fields
/////use those values to create a new LI (newComment method)
////placeholder value should be empty

const commentForm = (imageId) => {
  let formTag = document.getElementById('comment_form')
  formTag.addEventListener('submit', (event) => {
    event.preventDefault();

    let newCommentText = event.target.querySelector('#comment_input').value


    ////could refactor the li comment function to reuse here:

    document.getElementById('comments').innerHTML +=
     `<li>${newCommentText}</li>`

     document.forms['comment_form'].reset()

     // debugger;

     renderComment(imageId, newCommentText);

  })
}

const renderComment = (imageId, newCommentText) => {
  fetch("https://randopic.herokuapp.com/comments", {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      image_id: imageId,
      content: newCommentText
    })
  })
}



/////MY API
// {
//   "id": 2472,
//   "url": "http://blog.flatironschool.com/wp-content/uploads/2016/01/20141110-Flatiron-School-29-352x200.jpg",
//   "name": "Not Flatiron",
//   "like_count": 0,
//   "comments": [
//     {
//       "id": 47009,
//       "content": "first comment!",
//       "image_id": 2472,
//       "created_at": "2019-04-19T13:41:37.754Z",
//       "updated_at": "2019-04-19T13:41:37.754Z"
//     }
//   ]
// }
