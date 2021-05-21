const URL = "https://api.github.com/graphql";

//token used with regex

const mytoken   =   '=d=1=0=a=a=a=7=3=3=4=2=7=6=1=a=1=6=a=1=5=b=f=8=a=4=4=8=6=e=9=c=d=8=a=1=d=7=0=4=0='

fetch(URL, {
  method: "POST",
  headers: {
    "Authorization": `Bearer ${mytoken.replace(/=/g, "")}`,
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    query: `{
      viewer {
          login
          avatarUrl
          bio
          websiteUrl
          name
          followers {
            totalCount
          }
          following {
            totalCount
          }
          repositories (orderBy: {field: UPDATED_AT, direction: DESC}, first: 20) {
              totalCount
              nodes {
                  name
                  description
                  updatedAt
                  url
                  languages(orderBy:{field: SIZE, direction: DESC}, first: 1) {
                    nodes {
                     color
                     name
                    }
                  }
              }
          }
      }
  }`,
  }),
})
  .then((res) => res.json())
  .then((res) => {
    const {
      name,
      avatarUrl,
      bio,
      websiteUrl,
      followers,
      following,
      login,
      repositories,
    } = res.data.viewer;

    const containerOne = document.querySelector(".container-one");

    containerOne
    .querySelector("#img img")
    .setAttribute("src", avatarUrl);
    containerOne.querySelector("#name").textContent = name;
    containerOne.querySelector("#login").textContent = login;
    containerOne.querySelector("#bio").textContent = bio;
    containerOne.querySelector("#following").textContent = following.totalCount;
    containerOne.querySelector("#follower").textContent = followers.totalCount;
    containerOne
    .querySelector("#blog")
    .setAttribute("href", "//" + websiteUrl);

    document.querySelectorAll(".avatar-img").forEach((avatar) => {
      avatar.setAttribute("src", avatarUrl);
    });

    document.querySelectorAll(".mobile-avatar-img").forEach((avatar) => {
      avatar.setAttribute("src", avatarUrl);
    });

    const main = repositories.nodes
      .map((data) => {
        return  (
        `<div class="main-wrapper">
          <div class="repo-info">
            <div class="repo-info-one" >
              <a href="${data.url}" target="_blank" class="repo-name">${
              data.name
              }</a>
              <p class="repo-description">${data.description || ""}</p>
              <div class="color-language">
              <p class="color-ball" style="background-color: ${data.languages && data.languages.nodes && data.languages.nodes[0] && data.languages.nodes[0].color};"></p>
              ${data.languages && data.languages.nodes && data.languages.nodes[0] && data.languages.nodes[0].name || ""}
              </div>
              <span class="update-last">Updated on ${new Date(
              data.updatedAt
              ).toLocaleString("default", {
              month: "long",
              day: "numeric",
              year:  'numeric'
              })}</span>
            </div>
            <div class="star-repo"><i class="far fa-star"></i> Star</div>
          </div>
        </div>`
        )
      })
    .join("");

  document.querySelector(".container-two").innerHTML =
  document.querySelector(".container-two ").innerHTML + main;
});

/*navigation responsiveness*/

let mainNav = document.getElementById('js-menu');
let navBarToggle = document.getElementById('js-navbar-toggle');

navBarToggle.addEventListener('click', function () {
    
  mainNav.classList.toggle('active');
});