document.addEventListener('DOMContentLoaded', () => {
  console.log('%c DOM Content Loaded and Parsed!', 'color: magenta')

  let imageId = 2471 //Enter the id from the fetched image here
  const imageURL = `https://randopic.herokuapp.com/images/${imageId}`
  const likeURL = `https://randopic.herokuapp.com/likes/`
  const commentsURL = `https://randopic.herokuapp.com/comments/`

  const imageCard = document.getElementById('image_card')
  getImageInfo(imageId, imageCard)

  addLikesToImage(imageCard)

})


//get the image and its information

const getImageInfo = (imageId, imageCard) => {
  fetch(`https://randopic.herokuapp.com/images/${imageId}`)
  .then((response) => {
    return response.json()
  })
  .then((image) => {
    commentList = ""
    image.comments.forEach((comment) => {
      commentList += `<li>${comment.content}&nbsp;&nbsp;<button id="delete-btn" type="button">Delete Comment</button></li>`
    })
    imageCard.innerHTML += makeImageHTML(image, commentList)
  })
  .then(() => {
    const commentForm = document.getElementById('comment_form')
    addCommentToImage(commentForm)
  })
}

const addCommentToImage = (commentForm) => {
  commentForm.addEventListener('submit', (event) => {
    event.preventDefault();
    let newComment = `<li>"${event.target.comment.value}"&nbsp;&nbsp;<button id="delete-btn" type="button">Delete Comment</button></li>`
    let serverComment = event.target.comment.value
    let commentListHTML = document.getElementById('comments')
    commentListHTML.innerHTML += newComment
    let imageId = parseInt(event.target.dataset.id)
    addCommentToServer(imageId, serverComment)
    event.target.comment.value = ""

  })
}

const addCommentToServer = (imageId, serverComment) => {
  fetch('https://randopic.herokuapp.com/comments', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      image_id: imageId,
      content: serverComment
    })
  })
}


makeImageHTML = (image, commentList) => {
  return  `<img src="${image.url}" id="image" data-id=${image.id}/>
  <h4 id="name">"${image.name}"</h4>
  <span>Likes:
    <span id="likes">${image.like_count}</span>
  </span>
  <button data-id=${image.id} id="like_button">Like</button>
  <form data-id=${image.id} id="comment_form">
  <input id="comment_input" type="text" name="comment" placeholder="Add Comment"/>
  <input type="submit" value="Submit"/>
  </form>
  <ul id="comments">
       ${commentList}
  </ul>`
}


addLikesToImage = (imageCard) => {
  imageCard.addEventListener('click', (event) => {
    if(event.target.id === "like_button"){
      debugger
      let likeCount = parseInt(event.target.parentElement.querySelector('span').innerText.split(" ")[1])
      likeCount++;
      event.target.parentElement.querySelector('span').innerText = `Likes: ${likeCount}`
      let imageId = event.target.dataset.id
      addImageIdToServer(imageId)
    }
  else if(event.target.id === "delete-btn"){
    alert("This feature does not work yet! Come back later.");
  }
  })
}



addImageIdToServer = (imageId) => {
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
