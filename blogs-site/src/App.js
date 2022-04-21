import './App.css';
import {useState, useEffect} from "react"
import Header from "./components/Header";
import Footer from "./components/Footer";
import BlogList from "./components/BlogList";
import Blog from "./components/Blog"
import blogServices from "./services/blogs";
import loginServices from "./services/login";
import registerServices from "./services/register";
import LoginForm from "./components/LoginForm";
import AddBlogForm from "./components/AddBlogForm";
import RegisterForm from "./components/RegisterForm";
import { Routes, Route} from "react-router-dom";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);
  const [newTitle, setNewTitle] = useState("");
  const [newContent, setNewContent] = useState("");
  const [newUsername, setNewUsername] = useState("");
  const [newName, setNewName] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const handleAddBlog = e => {
    e.preventDefault();

    const blogObject = {
      title: newTitle,
      author: user.username,
      content: newContent,
      likes: 0,
      user: user._id
    };

    blogServices
      .create(blogObject)
      .then(returnedBlog => {
        setBlogs(blogs.concat(returnedBlog))
        setNewTitle("")
        setNewContent("")
      })
  };

  const handleTitleChange = title => {
    setNewTitle(title);
  };

  const handleContentChange = content => {
    setNewContent(content);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    
    try {
      const user = await loginServices.login({
        username, password,
      })

      window.localStorage.setItem(
        "loggedBlogappUser", JSON.stringify(user)
      )
      blogServices.setToken(user.token)
      setUser(user);
      setUsername("");
      setPassword("");
    } catch (exception) {
      console.log("ERROR!!!!!!");
    }
  }

const handleUsername = username => {
  setUsername(username);
}

const handlePassword = password => {
  setPassword(password);
}

const handleLogout = () => {
  window.localStorage.removeItem("loggedBlogappUser")
  window.location.href = "http://localhost:3000/"
}

const handleNewUsername = username => {
  setNewUsername(username);
};

const handleNewName = name => {
  setNewName(name);
};

const handleNewPassword = password => {
  setNewPassword(password);
};

const addUser = e => {
  e.preventDefault();
  const userObject = {
    username: newUsername,
    name: newName,
    password: newPassword,
  };

  registerServices
    .create(userObject)
    setNewUsername("")
    setNewName("")
    setNewPassword("")
}


  
const getBlogs = () => {
  blogServices
    .getAll()
    .then(blogs => {
      console.log(blogs);
      setBlogs(blogs);
    });
  };

  const addLike = id => {
    const blog = blogs.find(blog => blog.id === id)
    const like = blog.likes += 1
    const changedBlog = {
      likes: like,
    } 
    blogServices
      .update(id, changedBlog)
      .then(updatedBlog => {
        setBlogs(blogs.map(blog => blog.id === changedBlog.id ? updatedBlog : blog))
      })
  }

  useEffect(() => {
    getBlogs();
  }, []);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedBlogappUser")
    if(loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      blogServices.setToken(user.token)
    }
  }, []);

  return (
    <div className="page-container">
      <Header user={user} handleLogout={handleLogout}/>
      <Routes>
        <Route path="/" element={<BlogList blogs={blogs}/>}/>
        <Route path=":blogId" element={<Blog blogs={blogs} user={user} addLike={addLike}/>}/>
        <Route path="login-form" element={<LoginForm user={user} username={username} password={password} handleLogin={handleLogin} handlePassword={handlePassword} handleUsername={handleUsername}/>}/>
        <Route path="register" element={<RegisterForm addUser={addUser} handleNewUsername={handleNewUsername} handleNewName={handleNewName} handleNewPassword={handleNewPassword} newUsername={newUsername} newName={newName} newPassword={newPassword}/>}/>
        <Route path="add-blog" element={<AddBlogForm handleAddBlog={handleAddBlog} newTitle={newTitle} newContent={newContent} handleTitleChange={handleTitleChange} handleContentChange={handleContentChange}/>}/>
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
