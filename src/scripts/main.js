/**
 * Main logic module for what should happen on initial page load for Giffygram
 */

//Get a reference to the location on the DOM where the app will display
// let postElement = document.querySelector(".postList");
// let navElement = document.querySelector("nav");
// let entryElement = document.querySelector(".entryForm")

// Can you explain what is being imported here?
import { getPosts } from "./data/DataManager.js"
import { PostList } from "./feed/PostList.js"
import { NavBar } from "../nav/NavBar.js"
import { Footer } from "../nav/Footer.js"

const applicationElement = document.querySelector(".giffygram");

const showPostList = () => {
  const postElement = document.querySelector(".postList");
	getPosts().then((allPosts) => {
		postElement.innerHTML = PostList(allPosts);
	})
}

showPostList();


// const startGiffyGram = () => {
// 	showPostList();
// }

// startGiffyGram();

/*
    This function performs one, specific task.

    1. Can you explain what that task is?
    2. Are you defining the function here or invoking it?
*/
// const startGiffyGram = () => {
//   const postElement = document.querySelector(".postList");
// postElement.innerHTML = "Hello Cohort 47"
// }
// Are you defining the function here or invoking it?
// startGiffyGram();


const showNavBar = () => {
  //Get a reference to the location on the DOM where the nav will display
  const navElement = document.querySelector("nav");
navElement.innerHTML = NavBar();
}

showNavBar();

applicationElement.addEventListener("click", event => {
	if (event.target.id === "logout"){
		console.log("You clicked on logout")
	}
})

const showFooter = () => {
  //Get a reference to the location on the DOM where the nav will display
  const footerElement = document.querySelector("Footer");
footerElement.innerHTML = Footer();
}

showFooter();


applicationElement.addEventListener("change", event => {
  if (event.target.id === "yearSelection") {
    const yearAsNumber = parseInt(event.target.value)

    console.log(`User wants to see posts since ${yearAsNumber}`)
  }
})