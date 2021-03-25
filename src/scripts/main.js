import {
	getUsers, getPosts, usePostCollection, getLoggedInUser,
	createPost, deletePost, updatePost, getSinglePost,
	logoutUser, setLoggedInUser, loginUser, registerUser,
	postLike, getUsersPosts
} from "./data/DataManager.js";
import { PostList } from "./feed/PostList.js";
import { NavBar } from "../nav/NavBar.js";
import { Footer } from "../nav/Footer.js";
import { PostEntry } from "./feed/PostEntry.js";
import { PostEdit } from "./feed/PostEdit.js";
import { RegisterForm } from "./auth/RegisterForm.js";
import { LoginForm } from "./auth/LoginForm.js";
import { Post } from "./feed/Post.js";

const applicationElement = document.querySelector(".giffygram");
const footerElement = document.querySelector("footer");


//filtering the year in footer
applicationElement.addEventListener("change", event => {
	if (event.target.id === "yearSelection") {
		const yearAsNumber = parseInt(event.target.value)
		console.log(`User wants to see posts since ${yearAsNumber}`)
		//invoke a filter function passing the year as an argument
		showFilteredPosts(yearAsNumber);
	}
})

// Edit button only appearing for the person who posted
// For the getLoggedInUser, you want to pull out the id from the container to make sure you can target directly.
export const showEditButton = (Post) => {
	const LoggedInUser = getLoggedInUser()
	if (LoggedInUser.id === Post.userId) {
		return (`<button id="edit__${Post.id}">Edit</button>`)
	}
}

//Only show delete button for active user's posts
export const showDeleteButton = (Post) => {
	const LoggedInUser = getLoggedInUser()
	if (LoggedInUser.id === Post.userId) {
		return (`<button id="delete__${Post.id}">Delete</button>`)
	}
}


//posting new posts from form and importing the data manager
applicationElement.addEventListener("click", event => {
	event.preventDefault();
	if (event.target.id === "newPost__submit") {
		//collect the input values into an object to post to the DB
		const title = document.querySelector("input[name='postTitle']").value
		const url = document.querySelector("input[name='postURL']").value
		const description = document.querySelector("textarea[name='postDescription']").value
		//we have not created a user yet - for now, we will hard code `1`.
		//we can add the current time as well
		const postObject = {
			title: title,
			imageURL: url,
			description: description,
			userId: getLoggedInUser().id,
			timestamp: Date.now()
		}
		showPostEntry();
		// be sure to import from the DataManager
		createPost(postObject)
			.then(response => {
				console.log("what is the new post response", response)

				showPostList();
			})
	}
})

//Delete post button
applicationElement.addEventListener("click", event => {
	event.preventDefault();
	if (event.target.id.startsWith("delete")) {
		const postId = event.target.id.split("__")[1];
		deletePost(postId)
			.then(response => {
				showPostList();
			})
	}
})

//Filtering post by year
const showFilteredPosts = (year) => {
	//get a copy of the post collection
	const epoch = Date.parse(`01/01/${year}`);
	//filter the data
	const filteredData = usePostCollection().filter(singlePost => {
		if (singlePost.timestamp >= epoch) {
			return singlePost
		}
	})
	const postElement = document.querySelector(".postList");
	postElement.innerHTML = PostList(filteredData);
}

//Populating post list
const showPostList = () => {
	const postElement = document.querySelector(".postList");
	getPosts().then((allPosts) => {
		postElement.innerHTML = PostList(allPosts.reverse());
	})
}

//Nav bar function
const showNavBar = () => {
	//Get a reference to the location on the DOM where the nav will display
	const navElement = document.querySelector("nav");
	navElement.innerHTML = NavBar();
}

//Show footer sort
const showFooter = () => {
	//Get a reference to the location on the DOM where the footer will display
	const footerElement = document.querySelector("footer");
	footerElement.innerHTML = Footer();
}

//Show post once form is submitted
const showPostEntry = () => {
	//Get a reference to the location on the DOM where the nav will display
	const entryElement = document.querySelector(".entryForm");
	entryElement.innerHTML = PostEntry();
}

//Edit button
applicationElement.addEventListener("click", event => {
	event.preventDefault();
	if (event.target.id.startsWith("edit")) {
		const postId = event.target.id.split("__")[1];
		console.log(postId)
		getSinglePost(postId)
			.then(response => {
				showEdit(response);
			})
	}
	else if (event.target.id === "newPost__cancel")
		showPostEntry();
})

//Show edit post in form
const showEdit = (postObj) => {
	const entryElement = document.querySelector(".entryForm");
	entryElement.innerHTML = PostEdit(postObj);
}

//Submit updated post
applicationElement.addEventListener("click", event => {
	event.preventDefault();
	if (event.target.id.startsWith("updatePost")) {
		const postId = event.target.id.split("__")[1];
		//collect all the details into an object
		const title = document.querySelector("input[name='postTitle']").value
		const url = document.querySelector("input[name='postURL']").value
		const description = document.querySelector("textarea[name='postDescription']").value
		const timestamp = document.querySelector("input[name='postTime']").value

		const postObject = {
			title: title,
			imageURL: url,
			description: description,
			userId: getLoggedInUser().id,
			timestamp: parseInt(timestamp),
			id: parseInt(postId)
		}

		showPostEntry();

		updatePost(postObject)
			.then(response => {
				showPostList();
			})
	}
})

//Adding logout 
applicationElement.addEventListener("click", event => {
	if (event.target.id === "logout") {
		logoutUser();
		console.log(getLoggedInUser());
	}
})

//Checking for users to see if they need to login, or serve the feed
const checkForUser = () => {
	if (sessionStorage.getItem("user")) {
		setLoggedInUser(JSON.parse(sessionStorage.getItem("user")));
		startGiffyGram();
	} else {
		showLoginRegister();
	}
}

//Showing login and Register form to users
const showLoginRegister = () => {
	showNavBar();
	const entryElement = document.querySelector(".entryForm");
	//template strings can be used here too
	entryElement.innerHTML = `${LoginForm()} <hr/> <hr/> ${RegisterForm()}`;
	//make sure the post list is cleared out too
	const postElement = document.querySelector(".postList");
	postElement.innerHTML = "";
}

//Login form function, or ask user to register
applicationElement.addEventListener("click", event => {
	event.preventDefault();
	if (event.target.id === "login__submit") {
		//collect all the details into an object
		const userObject = {
			name: document.querySelector("input[name='name']").value,
			email: document.querySelector("input[name='email']").value
		}
		loginUser(userObject)
			.then(dbUserObj => {
				if (dbUserObj) {
					sessionStorage.setItem("user", JSON.stringify(dbUserObj));
					startGiffyGram();
				} else {
					//got a false value - no user
					const entryElement = document.querySelector(".entryForm");
					entryElement.innerHTML = `<p class="center">That user does not exist. Please try again or register for your free account.</p> ${LoginForm()} <hr/> <hr/> ${RegisterForm()}`;
				}
			})
	}
})

//Getting register form to function
applicationElement.addEventListener("click", event => {
	event.preventDefault();
	if (event.target.id === "register__submit") {
		//collect all the details into an object
		const userObject = {
			name: document.querySelector("input[name='registerName']").value,
			email: document.querySelector("input[name='registerEmail']").value
		}
		registerUser(userObject)
			.then(dbUserObj => {
				sessionStorage.setItem("user", JSON.stringify(dbUserObj));
				startGiffyGram();
			})
	}
})

//Logout button function
applicationElement.addEventListener("click", event => {
	if (event.target.id === "logout") {
		logoutUser();
		console.log(getLoggedInUser());
		sessionStorage.clear();
		checkForUser();
	}
})

//Adding like button to post
applicationElement.addEventListener("click", event => {
	event.preventDefault();
	if (event.target.id.startsWith("like")) {
	  const likeObject = {
		 postId: event.target.id.split("__")[1],
		 userId: getLoggedInUser().id
	  }
	  postLike(likeObject)
		.then(response => {
		  showPostList();
		})
	}
  })

  // Users function to reference dom where they will display 
const showUsersPosts = () => {
	const postElement = document.querySelector(".postList");
	getUsersPosts().then((allPosts) => {
	  postElement.innerHTML = PostList(allPosts)
	})
  }
  
  // Filter posts by Users 
  applicationElement.addEventListener("click", event => {
	event.preventDefault();
	if (event.target.id.startsWith("filter")) {
	  getUsersPosts()
		.then(response => {
		  showUsersPosts(response);
		})
	}
  })


  // See all posts event listener 
  applicationElement.addEventListener("click", event => {
	event.preventDefault();
	if (event.target.id.startsWith("allPosts")) {
	  getPosts()
		.then(response => {
		  showPostList(response);
		})
	}
  })



//Invoking functions
const startGiffyGram = () => {
	showNavBar();
	showPostEntry()
	showPostList();
	showFooter();
}
checkForUser();