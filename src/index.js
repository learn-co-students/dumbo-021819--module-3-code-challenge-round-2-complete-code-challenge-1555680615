document.addEventListener('DOMContentLoaded', () => {
  console.log('%c DOM Content Loaded and Parsed!', 'color: magenta')

  let imageId = 2470 //Enter the id from the fetched image here

  const imageURL = `https://randopic.herokuapp.com/images/${imageId}`

  const likeURL = `https://randopic.herokuapp.com/likes/`

  const commentsURL = `https://randopic.herokuapp.com/comments/`


  const imageCardHtml = (image) => { 
    return ` <img src="${image.url}" id="image" data-id="${image.id}"/>
        <h4 id="name">${image.name}</h4>
        <span>Likes:
          <span id="likes" data-likes="${image.like_count}">${image.like_count}</span>
        </span>
        <button id="like_button" data-id="${image.id}">Like</button>
        <form id="comment_form">
          <input id="comment_input" type="text" name="comment" placeholder="Add Comment"/>
          <input type="submit" value="Submit"/>
        </form>
        <ul id="comments">

        </ul>`
  }

  const imageCardDivTag = document.querySelector('#image_card')

  fetch(`https://randopic.herokuapp.com/images/2470`)
    .then((response) => {
      return response.json()
    }).then((image) => {
      imageCardDivTag.innerHTML = imageCardHtml(image)
    })

  const postRequest = (id) => {
    return fetch(`https://randopic.herokuapp.com/likes`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({image_id: id})
    }).then((response) => {
      return response.json()
    })
  }

  imageCardDivTag.addEventListener('click', (event) => {
    if (event.target.id === 'like_button') {
      //Later try to find id by event.target
      let currentLikes = parseInt(document.getElementById('likes').innerText)
      let newLikes = event.target.parentElement.querySelector('span#likes').dataset.likes
      currentLikes++;
      postRequest(2470)
      event.target.parentElement.querySelector('#likes').innerText = currentLikes

    }
  })

  const commentPostRequest = (image, content) => {
    return fetch('https://randopic.herokuapp.com/comments', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        image_id: image,
        content: content
      })
    }).then((response) => {
      return response.json()
    })
  }

  const formTag = document.querySelector('form')
  console.log(formTag);
  formTag.addEventListener('submit', (event) => {
    event.preventDefault()
    debugger
  })
})
