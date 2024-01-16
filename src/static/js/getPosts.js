window.addEventListener("load", () => {
  async function bootstrap () {
    const res = await fetch('/posts', {
      method: 'get'
    })

    const posts = await res.json()

    const postTags = posts.map(post => {
      return `
      <div class="item">
      <span>tille</span>
      <p>${post.content}</p>
      <div class="extra-info">
        <p>작성일: ${post.createdAt}</p>
        <p>수정일: ${post.updatedAt}</p>
        <p>작성자: ${post.authorName}</p>
      </div>
        <div class="aTageBox">
          <a href="./update.html?post_id=${post._id}">수정</a>
          <form action="/posts/${post._id}?_method=DELETE" method='post'>
            <button id="select_deleteBt">삭제</button>
          <form>
        </div>
      </div>
      `
    })

    document.querySelector('.contents').prepend(postTags.reverse())
  }
})